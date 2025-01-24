import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IoTDeviceService } from './iotDevice.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [IoTDeviceService],
})
export class AppModule {}
