import { Controller, Get, Put, Post, Delete } from '@nestjs/common';
import { IoTDeviceService } from './iotDevice.service';

@Controller()
export class AppController {
  constructor(private readonly iotDeviceService: IoTDeviceService) {}

  @Put()
  registerDevice(): string {
    return this.iotDeviceService.registerDevice();
  }

  @Get()
  getDevice(): string {
    return this.iotDeviceService.getDevice();
  }

  @Get()
  listDevices(): string {
    return this.iotDeviceService.listDevices();
  }

  @Post()
  updateDevice(): string {
    return this.iotDeviceService.updateDevice();
  }

  @Delete()
  removeDevice(): string {
    return this.iotDeviceService.removeDevice();
  }
}
