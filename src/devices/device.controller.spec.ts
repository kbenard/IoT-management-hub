import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { Query } from 'mongoose';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';

import { DeviceModule } from './device.module';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { Device } from './device.schema';

const config = require('config');
const device1 = require('../../sample/device/device1.json');
const SECONDS = 1000;

const uri = `mongodb+srv://${config.mongoDB.user}:${config.mongoDB.password}@${config.mongoDB.clusterUrl}/${config.mongoDB.database}?retryWrites=true&w=majority`;
console.log("URI: ", uri)

describe('DeviceController', () => {
  let deviceController: DeviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        DeviceModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    deviceController = app.get<DeviceController>(DeviceController);
  });

  // Tests on use cases relating to the Device controller operation retrieving an IoT Device's full details from the database
  describe('getDevice', () => {
    it('should return "device1"', async () => {
      let device: Device  = await deviceController.getDevice(device1.deviceId)
      expect(device.deviceId).toBe(device1.deviceId);
    }, 10 * SECONDS);

    it("should error - deviceId 'deviceShouldNotExist' was not found in database", async () => {
      let device: Device,
          error;

      try { 
        device = await deviceController.getDevice("deviceShouldNotExist")
      } catch (e) {
        error = e;
      }
      console.log("Error: ", error)
      expect(error?.status).toBe(400);
      expect(error?.response).toBe("Document with deviceId 'deviceShouldNotExist' was not found in database");
    }, 10 * SECONDS);
  });

  // Tests on use cases relating to the Device controller operation retrieving a details summary from a list of devices from the database
  describe('listDevices', () => {
    it('should return 3', async () => {
      let devices: Device[] = await deviceController.listDevices()
      expect(devices.filter(d => ['device1', 'device2', 'device3'].includes(d.deviceId)).length).toBe(3);
    }, 10 * SECONDS);

    it('should return 2', async () => {
      let devices: Device[] = await deviceController.listDevices("home1")
      expect(devices.filter(d => ['device1', 'device2', 'device3'].includes(d.deviceId)).length).toBe(2);
    }, 10 * SECONDS);

    it('should return 0', async () => {
      let devices: Device[] = await deviceController.listDevices("homeShouldNotExist")
      expect(devices.length).toBe(0);
    }, 10 * SECONDS);
  });

  // Tests on use cases relating to the Device controller operation updating an IoT's details/config in the database
  describe('updateDevice', () => {
    it('should return "updateDevice - xxxx"', () => {
      expect(appController.updateDevice("xxxx")).toBe('updateDevice - xxxx');
    });
  });

  // Tests on use cases relating to the Device controller operation registering a new IoT Device in the database
  describe('registerDevice', () => {
    it('should return "registerDevice - xxxx"', () => {
      expect(appController.registerDevice("xxxx")).toBe('registerDevice - xxxx');
    });
  });

  // Tests on use cases relating to the Device controller operation removing a specific IoT Device from the database
  describe('removeDevice', () => {
    it('should return "removeDevice - xxxx"', () => {
      expect(appController.removeDevice("xxxx")).toBe('removeDevice - xxxx');
    });
  });
});
