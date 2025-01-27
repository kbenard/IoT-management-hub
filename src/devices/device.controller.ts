import { Controller, Param, Body, Get, Put, Patch, Post, Delete } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.schema';
import { DeviceDto } from './device.dto';

// This controller handles incoming requests related to IoT device operations within the iot-management-hub service
// Every request path need to be prefixed with /device
// Each operations in this controller follow the relevant HTTP methods, adhering to standard RESTful principles.

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  /*    GET OPERATIONS    */
  @Get('id/:deviceId')
  // Retrieves all device information, based on deviceId
  async getDevice(@Param('deviceId') deviceId: string): Promise<Device> {
    console.log(`device - getDevice - ${deviceId}`);
    let device = await this.deviceService.findOne(deviceId);
    return device
  }

  // Retrieves a details summary from a list of devices
  // Can be narrowed down to device belonging to a specific homeId, if not, retrieve for all devices
  @Get('list{/homeId/:homeId}')
  async listDevices(@Param('homeId') homeId?: string) {
    console.log(`device - listDevices - ${homeId}`);
    let devices = await this.deviceService.findAll(homeId)
    return devices;
  }

  /*    PUT OPERATIONS    */
  @Put('id/:deviceId')
  @Patch('id/:deviceId')
  async updateDevice(@Param('deviceId') deviceId: string, @Body() updateDevice: any) {
    console.log(`device - updateDevice - ${deviceId}`);
    let result = await this.deviceService.update(deviceId, updateDevice)
    return result;
  }
  
  /*    POST OPERATIONS    */
  @Post('id/:deviceId')
  async registerDevice(@Param('deviceId') deviceId: string, @Body() device: DeviceDto) {
    console.log(`device - registerDevice - ${deviceId}`);
    let results = await this.deviceService.create(device);
    return results;
  }

  /*    DELETE OPERATIONS    */
  @Delete('id/:deviceId')
  async removeDevice(@Param('deviceId') deviceId: string) {
    console.log(`device - deleteDevice - ${deviceId}`);
    let results = await this.deviceService.delete(deviceId)
    return results;
  }
}
