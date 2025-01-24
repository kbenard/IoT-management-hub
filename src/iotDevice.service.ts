import { Injectable } from '@nestjs/common';

@Injectable()
export class IoTDeviceService {
  registerDevice(): string {
    return 'registerDevice';
  }

  getDevice(): string {
    return 'getDevice';
  }

  listDevices(): string {
    return 'listDevices';
  }

  updateDevice(): string {
    return 'updateDevice';
  }

  removeDevice(): string {
    return 'removeDevice';
  }
}
