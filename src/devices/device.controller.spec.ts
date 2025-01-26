import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';

describe('DeviceController', () => {
  let appController: DeviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [DeviceService],
    }).compile();

    appController = app.get<DeviceController>(DeviceController);
  });

  // Tests on use cases relating to the Device controller operation retrieving an IoT Device's full details from the database
  describe('getDevice', () => {
    it('should return "getDevice - xxxx"', () => {
      expect(appController.getDevice("xxxx")).toBe('getDevice - xxxx');
    });
  });

  // Tests on use cases relating to the Device controller operation retrieving a details summary from a list of devices from the database
  describe('listDevice', () => {
    it('should return "listDevices"', () => {
      expect(appController.listDevices()).toBe('listDevices - all');
    });
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
