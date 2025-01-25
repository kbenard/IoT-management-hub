import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceService {
  /*    GET SERVICES    */
  getDevice(id: string): string {
    return `getDevice - ${id}`;
  }

  listDevices(homeId?: string): string {
    return `listDevices - ${homeId || 'all'}`;
  }

  /*    PUT/PATCH SERVICES    */
  updateDevice(id: string): string {
    return `updateDevice - ${id}`;
  }

  /*    POST SERVICES    */
  registerDevice(id: string): string {
    return `registerDevice - ${id}`;
  }

  /*    DELETE SERVICES    */
  removeDevice(id: string): string {
    return `removeDevice - ${id}`;
  }
}
