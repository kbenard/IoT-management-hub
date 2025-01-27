// Nest.js
import { Test, TestingModule } from '@nestjs/testing';

// MongoDB
const mongoose = require('mongoose');
import { MongooseModule } from '@nestjs/mongoose';

// App
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

// Device
import { DeviceModule } from './device.module';
import { DeviceController } from './device.controller';
import { Device, DeviceSchema } from './device.schema';

const config = require('config');
const mongoDBUri = `mongodb+srv://${config.mongoDB.user}:${config.mongoDB.password}@${config.mongoDB.clusterUrl}/${config.mongoDB.database}?retryWrites=true&w=majority`;
const SECONDS = 1000;

const device1 = require('../../sample/device/device1.json');

describe('DeviceController', () => {
  let deviceController: DeviceController;
  let deviceToRegister = 'deviceToRegister';
  let app: TestingModule;

  // Initialising test AppModule before tests start
  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoDBUri),
        DeviceModule
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    deviceController = app.get<DeviceController>(DeviceController);
  }, 10 * SECONDS);

  // Tests on use cases relating to the Device controller operation retrieving an IoT Device's full details from the database
  describe('getDevice', () => {
    // Testing a successful getDevice() call
    it('should return "device1"', async () => {
      let device: Device  = await deviceController.getDevice(device1.deviceId)
      expect(device.deviceId).toBe(device1.deviceId);
    }, 10 * SECONDS);

    // Forcing an error on getDevice() with a non existing deviceId
    it("should error - deviceId 'deviceShouldNotExist' was not found in database.", async () => {
      let device: Device,
          error;

      try { 
        device = await deviceController.getDevice("deviceShouldNotExist")
      } catch (e) {
        error = e;
      }
      console.log("Error: ", error)
      expect(error?.status).toBe(400);
      expect(error?.response).toBe("Document with deviceId 'deviceShouldNotExist' was not found in database.");
    }, 10 * SECONDS);
  });

  // Tests on use cases relating to the Device controller operation retrieving a details summary from a list of devices from the database
  describe('listDevices', () => {
    // Testing listDevices() with no homeId narrowing, list of devices should contain deviceIds device1, device2 & device3
    it('should return 3', async () => {
      let devices: Device[] = await deviceController.listDevices()
      expect(devices.filter(d => ['device1', 'device2', 'device3'].includes(d.deviceId)).length).toBe(3);
    }, 10 * SECONDS);

    // Testing listDevices() with homeId home1 narrowing, list of devices should contain only device1 & device3
    it('should return 2', async () => {
      let devices: Device[] = await deviceController.listDevices("home1")
      expect(devices.filter(d => ['device1', 'device2', 'device3'].includes(d.deviceId)).length).toBe(2);
    }, 10 * SECONDS);

    // Testing listDevices() with a non existing homeId, should not return any devices
    it('should return 0', async () => {
      let devices: Device[] = await deviceController.listDevices("homeShouldNotExist")
      expect(devices.length).toBe(0);
    }, 10 * SECONDS);
  });

  // Tests on use cases relating to the Device controller operation updating an IoT's details/config in the database
  describe('updateDevice', () => {
    const now = Date.now(),
          newDevice = { status: { lastUpdateReceived: now } },
          deviceDuplicateId = "deviceDuplicate";

    // Testing a successful updateDevice() call on device1
    it('device1 should update with new lastUpdateReceived value', async () => {
      const result = await deviceController.updateDevice(device1.deviceId, newDevice);

      expect(result?.success).toBe(true);
      expect(result?.deviceId).toBe(device1.deviceId);

      const updatedDevice = await deviceController.getDevice(device1.deviceId);
      expect(updatedDevice?.status?.lastUpdateReceived).toBe(now);
    }, 10 * SECONDS);

    // Forcing an error on updateDevice() with a non existing deviceId
    it("should error - deviceId 'deviceShouldNotExist' was not found in database.", async () => {
      let error;

      try { 
        const result = await deviceController.updateDevice("deviceShouldNotExist", newDevice);
      } catch (e) {
        error = e;
      }
      
      expect(error?.status).toBe(400);
      expect(error?.response).toBe("Document with deviceId 'deviceShouldNotExist' was not found in database.");
    }, 10 * SECONDS);

    // Forcing an error on updateDevice() with a forced schema validation error 
    it(`should error - Database Error: Update success for document with deviceId '${device1.deviceId}' was not acknowledged by the database.`, async () => {
      let error;

      try { 
        await deviceController.updateDevice(device1.deviceId, {});
        // Flagged as non valid in VS Code now that PartialType DTOs are in place for device update
        // await deviceController.updateDevice(device1.deviceId, { notInSchema: true });
        // await deviceController.updateDevice(device1.deviceId, { status: { notInSchema: true } });
        // await deviceController.updateDevice(device1.deviceId, { device: { notInSchema: true } });
        // await deviceController.updateDevice(device1.deviceId, { geodata: { notInSchema: true } });
        // await deviceController.updateDevice(device1.deviceId, { metadata: { notInSchema: true } });
      } catch (e) {
        error = e;
      }
      
      expect(error?.status).toBe(500);
      expect(error?.response).toBe(`Database Error: Update success for document with deviceId '${device1.deviceId}' was not acknowledged by the database.`);
    }, 10 * SECONDS);

    // Forcing an error on updateDevice() with a duplicate deviceId occurence (forced manually outside of API boundaries)
    it(`should error - Database Error: Too many documents with deviceId '${deviceDuplicateId}' were matched in the database for this update request. Cannot resolve device.`, async () => {
      let error;
      
      // Using a separate unrestricted connection to force a duplicate deviceId document insertion, with purpose of triggering error
      await mongoose.connect(mongoDBUri);

      const DeviceModel = mongoose.model('Device', DeviceSchema);
      const duplicateDevice1 = new DeviceModel({ ...device1, deviceId: deviceDuplicateId, type: "DuplicateDevice1" });
      const duplicateDevice2 = new DeviceModel({ ...device1, deviceId: deviceDuplicateId, type: "DuplicateDevice2" });

      let documentCount = await DeviceModel.countDocuments({ deviceId: deviceDuplicateId });

      if(documentCount < 1) {
        await duplicateDevice1.save();
      }

      if(documentCount < 2) {
        await duplicateDevice2.save();
      }

      try { 
        const result = await deviceController.updateDevice(deviceDuplicateId, newDevice);
      } catch (e) {
        error = e;
      }

      // Removing duplicate documents after test
      await DeviceModel.deleteMany({ deviceId: deviceDuplicateId });

      documentCount = await DeviceModel.countDocuments({ deviceId: deviceDuplicateId });

      // Closing connection
      await mongoose.connection.close();

      expect(documentCount).toBe(0);
      expect(error?.status).toBe(500);
      expect(error?.response).toBe(`Database Error: Too many documents with deviceId '${deviceDuplicateId}' were matched in the database for this update request. Cannot resolve device.`);
    }, 20 * SECONDS);
  });

  // Tests on use cases relating to the Device controller operation registering a new IoT Device in the database

  describe('registerDevice', () => {
    // Testing a successful registerDevice() call
    it(`should register device '${deviceToRegister}'`, async () => {
      let newDeviceData = { ...device1, deviceId: deviceToRegister },
          newDevice: Device;

      // Using a separate connection to ensure test document is not present yet
      await mongoose.connect(mongoDBUri);
      const DeviceModel = mongoose.model('Device', DeviceSchema);
      let documentCount = await DeviceModel.countDocuments({ deviceId: deviceToRegister });
      if(documentCount > 0) {
        await DeviceModel.deleteMany({ deviceId: deviceToRegister });
      }

      // Closing connection
      await mongoose.connection.close();

      newDevice = await deviceController.registerDevice(deviceToRegister, newDeviceData);
      expect(newDevice?.deviceId).toBe(deviceToRegister);
    }, 10 * SECONDS);

    // Forcing an error on registerDevice() by attempting to insert a duplicate deviceId, attempting exactly the same deviceId as last it() test
    it(`should error - Document with deviceId '${deviceToRegister}' is already present in the database. Please review the device data or use the appropriate API call.`, async () => {
      let newDeviceData = { ...device1, deviceId: deviceToRegister },
          newDevice: Device,
          error;
          
      try {
        newDevice = await deviceController.registerDevice(deviceToRegister, newDeviceData);
      } catch(e) {
        error = e
      }

      expect(error?.status).toBe(400);
      expect(error?.response).toBe(`Document with deviceId '${deviceToRegister}' is already present in the database. Please review the device data or use the appropriate API call.`);
    }, 10 * SECONDS);
  });

  // Tests on use cases relating to the Device controller operation removing a specific IoT Device from the database
  describe('removeDevice', () => {
    // Testing a successful registerDevice() call
    it(`should remove device '${deviceToRegister}'`, async () => {
      let result = await deviceController.removeDevice(deviceToRegister);
      expect(result.success).toBe(true);
      expect(result.message).toBe(`Device '${deviceToRegister} succefully removed'`);
      expect(result.deviceId).toBe(deviceToRegister);
    }, 10 * SECONDS);

    // Forcing an error on registerDevice() by attempting to insert a duplicate deviceId, attempting exactly the same deviceId as last it() test
    it(`should error - Document with deviceId '${deviceToRegister}' was not found in database.`, async () => {
      let result,
          error;
          
      try {
        result = await deviceController.removeDevice(deviceToRegister);
      } catch(e) {
        error = e
      }

      expect(error?.status).toBe(400);
      expect(error?.response).toBe(`Document with deviceId '${deviceToRegister}' was not found in database.`);
    }, 10 * SECONDS);
  });

  // Post test clean up, ensuring all open processes are terminated to allow Jest to exit peacefully
  afterAll(done => {
    mongoose.connection.close();
    app.close();
    done();
  })
});
