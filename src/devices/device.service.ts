import { Model, Connection, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Device } from './device.schema';
import { DeviceDto } from './device.dto';

const config = require('config');

@Injectable()
export class DeviceService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('Device') private deviceModel: Model<Device>
  ) {}
  /*    GET SERVICES    */
  async findOne(deviceId: string): Promise<string | never> {
    console.log('device.service - getDevice', deviceId)
    // console.log("Connection:", this.connection)
    // let all = await this.deviceModel.find()
    // console.log("All", all)
    console.log("Test")
    let obj1 = await this.deviceModel.findOne({ deviceId: deviceId}).exec();
    console.log("Obj1", obj1)
    return `getDevice - ${deviceId}`;
  }

  listDevices(homeId?: string): string {
    return `listDevices - ${homeId || 'all'}`;
  }

  /*    PUT/PATCH SERVICES    */
  updateDevice(deviceId: string): string {
    return `updateDevice - ${deviceId}`;
  }

  /*    POST SERVICES    */
  registerDevice(deviceId: string): string {
    return `registerDevice - ${deviceId}`;
  }

  /*    DELETE SERVICES    */
  removeDevice(deviceId: string): string {
    return `removeDevice - ${deviceId}`;
  }
}
