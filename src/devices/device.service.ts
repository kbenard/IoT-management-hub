// Nest.js
import { Injectable } from '@nestjs/common';

// MongoDB
import { Model, Connection } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

// Device data models
import { Device } from './device.schema';
import { DeviceDto } from './device.dto';

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
  async findOne(deviceId: string): Promise<string> {
    console.log('device.service - getDevice', deviceId)
    let device = await this.deviceModel.findOne({ deviceId: deviceId }).exec();
    console.log("device: ", deviceId, JSON.stringify(device, null, 2))
    return "test";
  }

  // Retrieves list of summarized device documents
  // When a homeId is supplied, the query narrows the search down to the supplied id, otherwise all documents are retrieved
  // Implement pagination
  async findAll(homeId?: string): Promise<string> {
    console.log('device.service - findAll', homeId || "All")
    let devices
    let query = homeId ? { 'geodata.homeId': homeId } : {};
    if(homeId) {
      devices = await this.deviceModel.find(query).exec();
    } else {
      devices = await this.deviceModel.find(query );
    }
    console.log("Devices", homeId, query, devices);
    return `listDevices - ${homeId || 'all'}`;
  }

  /*    PUT/PATCH SERVICES    */
  // Updates an existing device document with the supplied information
  // Fails if document does not exists?
  // Merge or Replace?
  update(deviceId: string): string {
    console.log('device.service - updateDevice', deviceId)
    return `updateDevice - ${deviceId}`;
  }

  /*    POST SERVICES    */
  
  create(deviceId: string): string {
    return `registerDevice - ${deviceId}`;
  }

  /*    DELETE SERVICES    */
  delete(deviceId: string | string[]): string {
    return `removeDevice - ${deviceId}`;
  }
}
