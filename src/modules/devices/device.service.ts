// Nest.js
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// MongoDB
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

// Device data models
import { Device } from './device.schema';
import { DeviceDto, DeviceUpdateDto } from './device.dto';

// Misc
const _ = require('lodash');

// App Global Config
const config = require('config');

@Injectable()
export class DeviceService {
  // Injecting Mongoose's Device Model in the constructor for interactions with the Devices collection in the MongoDB database
  constructor(
    //@InjectConnection() private connection: Connection, // When needed for connection config checks
    @InjectModel('Device') private deviceModel: Model<Device>
  ) {}

  /*    GET SERVICES    */
  // Retrieves whole document on one specific device based on supplied deviceId
  async findOne(deviceId: string): Promise<Device> { // Need to fix return type
    let device = await this.deviceModel.findOne({ deviceId: deviceId }).lean().exec();

    if(!device || !('deviceId' in device)) {
      throw new HttpException(`Document with deviceId '${deviceId}' was not found in database.`, HttpStatus.BAD_REQUEST);
    }

    return device;
  }

  // Retrieves list of summarized device documents
  // When a homeId is supplied, the query narrows the search down to the supplied id, otherwise all documents are retrieved
  async findAll(options: any = {}, homeId?: string): Promise<Device[]> {
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
  async update(deviceId: string, updateDevice: DeviceUpdateDto): Promise<any> {
    let device = await this.deviceModel.findOne({ deviceId: deviceId }).lean().exec();
    const documentCount = await this.deviceModel.countDocuments({ deviceId });
    let newDevice;

    if (!device || !('deviceId' in device)) {
      throw new HttpException(`Document with deviceId '${deviceId}' was not found in database.`, HttpStatus.BAD_REQUEST);
    } else {
      // Merging current doc and changes into new device Document
      // TODO, implement _.mergeWith with customizer for sensors and indicators array merging
      newDevice = _.merge({}, _.cloneDeep(device), updateDevice)
      delete newDevice._id;
    }

    if(documentCount > 1) {
      throw new HttpException(`Database Error: Too many documents with deviceId '${deviceId}' were matched in the database for this update request. Cannot resolve device.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const res = await this.deviceModel.findByIdAndUpdate(device._id, newDevice);

    let updatedDevice = await this.deviceModel.findOne({ deviceId: deviceId }).lean().exec();
    
    if(!res) {
      throw new HttpException(`Database Error: Document with deviceId '${deviceId}' was not updated in the database.`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return {
       success: true,
       deviceId: deviceId
    };
  }

  /*    POST SERVICES    */
  // Registers a device in the database, creates an associated document
  // Fails if deviceId is already registered or not provided
  async create(deviceData: DeviceDto): Promise<Device> {
    if(!deviceData.deviceId) {
      throw new HttpException('Mandatory deviceId is missing from device registration request.', HttpStatus.BAD_REQUEST);
    }

    // Checks if provided deviceId is already present in the database, throws error if so
    const isPresent = await this.deviceModel.countDocuments({ deviceId: deviceData.deviceId });
    if(isPresent) {
      throw new HttpException(`Document with deviceId '${deviceData.deviceId}' is already present in the database. Please review the device data or use the appropriate API call.`, HttpStatus.BAD_REQUEST);
    }

    // Inserts a new device document in the database to register the device
    const newDevice = new this.deviceModel(deviceData);
    let result = await newDevice.save();
    return result;
  }

  /*    DELETE SERVICES    */
  // Removes a specific device from the database, fails if deviceId not found
  async delete(deviceId: string | string[]): Promise<any> {
    const device = await this.deviceModel.findOne({ deviceId: deviceId }).exec();

    if (!device) {
      throw new HttpException(`Document with deviceId '${deviceId}' was not found in database.`, HttpStatus.BAD_REQUEST);
    }

    let results = await this.deviceModel.deleteOne({ deviceId: deviceId });
    return {
      success: results.deletedCount === 1,
      message: `Device '${deviceId} succefully removed'`,
      deviceId
    };
  }
}
