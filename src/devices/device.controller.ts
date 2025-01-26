import { Controller, Param, Get, Put, Patch, Post, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';

// This controller handles incoming requests related to IoT device operations within the iot-management-hub service
// Every request path need to be prefixed with /device
// Each operations in this controller follow the relevant HTTP methods, adhering to standard RESTful principles.

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  /*    GET OPERATIONS    */
  @Get('id/:deviceId')
  async getDevice(@Param('deviceId') deviceId: string) {
    console.log(`device - getDevice - ${deviceId}`);
    let device;
    
    try {
      device = await this.deviceService.findOne(deviceId);
      return device
    } catch (e) {

      return e
    }
  }

  @Get('list{/homeId/:homeId}')
  async listDevices(@Param('homeId') homeId?: string) {
    console.log(`device - listDevices - ${homeId}`);
    let devices = await this.deviceService.findAll(homeId)
    return devices;
  }

  /*    PUT OPERATIONS    */
  @Put('id/:deviceId')
  @Patch('id/:deviceId')
  updateDevice(@Param('deviceId') deviceId: string): string {
    console.log(`device - updateDevice - ${deviceId}`);
    return this.deviceService.update(deviceId);
  }
  
  /*    POST OPERATIONS    */
  @Post('id/:deviceId')
  registerDevice(@Param('deviceId') deviceId: string): string {
    console.log(`device - registerDevice - ${deviceId}`);
    return this.deviceService.create(deviceId);
  }

  /*    DELETE OPERATIONS    */
  @Delete('id/:deviceId')
  removeDevice(@Param('deviceId') deviceId: string): string {
    console.log(`device - deleteDevice - ${deviceId}`);
    return this.deviceService.delete(deviceId);
  }
}
