import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { IoTDeviceService } from './iotDevice.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [IoTDeviceService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "getDevice"', () => {
      expect(appController.registerDevice()).toBe('registerDevice');
    });

    it('should return "getDevice"', () => {
      expect(appController.getDevice()).toBe('getDevice');
    });

    it('should return "listDevices"', () => {
      expect(appController.listDevices()).toBe('listDevices');
    });

    it('should return "updateDevice"', () => {
      expect(appController.updateDevice()).toBe('updateDevice');
    });

    it('should return "removeDevice"', () => {
      expect(appController.removeDevice()).toBe('removeDevice');
    });
  });
});
