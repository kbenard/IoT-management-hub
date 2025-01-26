import { Model, Connection } from 'mongoose';
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
  async findOne(deviceId: string): Promise<string> {
    console.log('device.service - getDevice', deviceId)
    // console.log("Connection:", this.connection)
    console.log("Test")
    let obj1 = await this.deviceModel.findOne({ deviceId: deviceId}).exec();
    console.log("Obj1", JSON.stringify(obj1, null, 2))
    return "test";
  }

  listDevices(homeId?: string): string {
    // let all = await this.deviceModel.find()
    // console.log("All", all)
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
