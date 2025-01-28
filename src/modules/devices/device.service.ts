// Nest.js
import { HttpException, HttpStatus, Injectable, Scope, Inject } from '@nestjs/common';

// MongoDB
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

// Device data models
import { Device, RequestEvent } from './device.schema';
import { DeviceDto, DeviceUpdateDto } from './device.dto';

// Misc
const _ = require('lodash');

// App Global Config
const config = require('config');

@Injectable()
export class DeviceService {
  // Injecting Mongoose's Device Model in the constructor for interactions with the Devices collection in the MongoDB database
  constructor(
    // @InjectConnection() private connection: Connection, // When needed for connection config checks
    @InjectModel('Device') private deviceModel: Model<Device>,
    @InjectModel('Event') private requestEventModel: Model<RequestEvent>
  ) {}

  /*    GET SERVICES    */
  // Retrieves whole document on one specific device based on supplied deviceId
  async findOne(request: any, deviceId: string): Promise<Device> {
    let errorMessages = [
      `Document with deviceId '${deviceId}' was not found in database.`
    ]
    let device = await this.deviceModel.findOne({ deviceId: deviceId }).lean().exec();

    if(!device || !('deviceId' in device)) {
      await this.requestEventModel.create({
        calculatedPath: "/" + request.method + " " + request.path,
        path: request.path,
        params: request.params,
        query: request.query,
        statusCode: HttpStatus.BAD_REQUEST,
        status: "DEVICE_NOT_FOUND",
        message: errorMessages[0],
        success: false,
        timestamp: new Date()
      });
      throw new HttpException(errorMessages[0], HttpStatus.BAD_REQUEST);
    }

    return device;
  }

  // Retrieves list of summarized device documents
  // When a homeId is supplied, the query narrows the search down to the supplied id, otherwise all documents are retrieved
  async findAll(request: any, options: any = {}, homeId?: string): Promise<Device[]> {
    let errorMessages = [] // Not currently needed
    let devices,
        query = homeId ? { 'geodata.homeId': homeId } : {},
        projection = [ // Arbitrary selection, not sure exactly what should be filtered into the summary data
          'deviceId', 'type',
          'status.code', 'status.message',
          'device.model',
          'geodata.homeId',
          'metadata'
        ];

    if(homeId) {
      devices = await this.deviceModel.find(query, projection, options).exec();
    } else {
      devices = await this.deviceModel.find(query, projection, options);
    }

    return devices;
  }

  /*    PUT/PATCH SERVICES    */
  // Updates an existing device document with the supplied information
  async update(request: any, deviceId: string, updateDevice: DeviceUpdateDto): Promise<any> {
    let errorMessages = [
      `Document with deviceId '${deviceId}' was not found in database.`,
      `Database Error: Too many documents with deviceId '${deviceId}' were matched in the database for this update request. Cannot resolve device.`,
      `Database Error: Document with deviceId '${deviceId}' was not updated in the database.`
    ]
    let device = await this.deviceModel.findOne({ deviceId: deviceId }).lean().exec();
    const documentCount = await this.deviceModel.countDocuments({ deviceId });
    let newDevice;

    if (!device || !('deviceId' in device)) {
      await this.requestEventModel.create({
        calculatedPath: "/" + request.method + " " + request.path,
        path: request.path,
        params: request.params,
        query: request.query,
        statusCode: HttpStatus.BAD_REQUEST,
        status: "DEVICE_NOT_FOUND",
        message: errorMessages[0],
        success: false,
        timestamp: new Date()
      });
      throw new HttpException(errorMessages[0], HttpStatus.BAD_REQUEST);
    } else {
      // Merging current doc and changes into new device Document
      // TODO, implement _.mergeWith with customizer for sensors and indicators array merging
      newDevice = _.merge({}, _.cloneDeep(device), updateDevice)
      delete newDevice._id;
    }

    if(documentCount > 1) {
      await this.requestEventModel.create({
        calculatedPath: "/" + request.method + " " + request.path,
        path: request.path,
        params: request.params,
        query: request.query,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        status: "DEVICE_ID_DOCUMENT_DUPLICATE",
        message: errorMessages[1],
        success: false,
        timestamp: new Date()
      });
      throw new HttpException(errorMessages[1], HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const res = await this.deviceModel.findByIdAndUpdate(device._id, newDevice);

    let updatedDevice = await this.deviceModel.findOne({ deviceId: deviceId }).lean().exec();
    
    if(!res) {
      await this.requestEventModel.create({
        calculatedPath: "/" + request.method + " " + request.path,
        path: request.path,
        params: request.params,
        query: request.query,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        status: "DEVICE_UPDATE_DB_FAILURE",
        message: errorMessages[2],
        success: false,
        timestamp: new Date()
      });
      throw new HttpException(errorMessages[2], HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return {
       success: true,
       deviceId: deviceId
    };
  }

  /*    POST SERVICES    */
  // Registers a device in the database, creates an associated document
  // Fails if deviceId is already registered or not provided
  async create(request: any, deviceData: DeviceDto): Promise<Device> {
    let errorMessages = [
      'Mandatory deviceId is missing from device registration request.',
      `Document with deviceId '${deviceData?.deviceId}' is already present in the database. Please review the device data or use the appropriate API call.`
    ]
    if(!deviceData.deviceId) {
      await this.requestEventModel.create({
        calculatedPath: "/" + request.method + " " + request.path,
        path: request.path,
        params: request.params,
        query: request.query,
        statusCode: HttpStatus.BAD_REQUEST,
        status: "DEVICE_ID_NOT_SUPPLIED",
        message: errorMessages[0],
        success: false,
        timestamp: new Date()
      });
      throw new HttpException(errorMessages[0], HttpStatus.BAD_REQUEST);
    }

    // Checks if provided deviceId is already present in the database, throws error if so
    const isPresent = await this.deviceModel.countDocuments({ deviceId: deviceData.deviceId });
    if(isPresent) {
      await this.requestEventModel.create({
        calculatedPath: "/" + request.method + " " + request.path,
        path: request.path,
        params: request.params,
        query: request.query,
        statusCode: HttpStatus.BAD_REQUEST,
        status: "DEVICE_ID_NOT_SUPPLIED",
        message: errorMessages[1],
        success: false,
        timestamp: new Date()
      });
      throw new HttpException(errorMessages[1], HttpStatus.BAD_REQUEST);
    }

    // Inserts a new device document in the database to register the device
    const newDevice = new this.deviceModel(deviceData);
    let result = await newDevice.save();
    return result;
  }

  /*    DELETE SERVICES    */
  // Removes a specific device from the database, fails if deviceId not found
  async delete(request: any, deviceId: string | string[]): Promise<any> {
    let errorMessages = [
      `Document with deviceId '${deviceId}' was not found in database.`
    ]
    const device = await this.deviceModel.findOne({ deviceId: deviceId }).exec();

    if (!device) {
      await this.requestEventModel.create({
        calculatedPath: "/" + request.method + " " + request.path,
        path: request.path,
        params: request.params,
        query: request.query,
        statusCode: HttpStatus.BAD_REQUEST,
        status: "DEVICE_NOT_FOUND",
        message: errorMessages[0],
        success: false,
        timestamp: new Date()
      });
      throw new HttpException(errorMessages[0], HttpStatus.BAD_REQUEST);
    }

    let results = await this.deviceModel.deleteOne({ deviceId: deviceId });
    return {
      success: results.deletedCount === 1,
      message: `Device '${deviceId} succefully removed'`,
      deviceId
    };
  }
}
