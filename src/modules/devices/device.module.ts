// NestJS
import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

// MongoDB
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema, RequestEventSchema } from './device.schema';

// Device Behaviour Simulation Routine
import { DeviceSimulator } from '../../device-simulator';

// Config
const config = require('config');

console.log("Device Service: ", DeviceService)

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }, { name: 'Event', schema: RequestEventSchema }])
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}

if(config?.deviceSimulator?.active) {
  DeviceSimulator();
}