import { Controller, Param, Get, Put, Patch, Post, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';

// This controller handles incoming requests related to IoT device operations within the iot-management-hub service
// Every request path need to be prefixed with /device
// Each operations in this controller follow the relevant HTTP methods, adhering to standard RESTful principles.

@Controller('device')
export class DeviceController {
  constructor(private readonly iotDeviceService: DeviceService) {}

  /*    GET OPERATIONS    */
  @Get(':id')
  getDevice(@Param('id') id: string): string {
    return this.iotDeviceService.getDevice(id);
  }

  @Get('list/:homeId')
  listDevices(@Param('homeId') homeId?: string): string {
    console.log("")
    return this.iotDeviceService.listDevices(homeId);
  }

  /*    PUT OPERATIONS    */
  @Put(':id')
  @Patch(':id')
  updateDevice(@Param('id') id: string): string {
    return this.iotDeviceService.updateDevice(id);
  }
  
  /*    POST OPERATIONS    */
  @Post(':id')
  registerDevice(@Param('id') id: string): string {
    return this.iotDeviceService.registerDevice(id);
  }

  /*    DELETE OPERATIONS    */
  @Delete(':id')
  removeDevice(@Param('id') id: string): string {
    return this.iotDeviceService.removeDevice(id);
  }
}
