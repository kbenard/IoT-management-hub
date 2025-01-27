import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceModule } from './devices/device.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const config = require('config');
const uri = `mongodb+srv://${config.mongoDB.user}:${config.mongoDB.password}@${config.mongoDB.clusterUrl}/${config.mongoDB.database}?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    DeviceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
