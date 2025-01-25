import { Injectable } from '@nestjs/common';

const config = require('config');
console.log("Config: ", config);

@Injectable()
export class DeviceService {
  /*    GET SERVICES    */
  getDevice(deviceId: string): string {
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
