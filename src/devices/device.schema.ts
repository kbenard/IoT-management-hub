import * as mongoose from 'mongoose';

type sensor = {
  metric: string;
  unit: string;
  value: number;
};

type light = {
  id: string;
  on: boolean;
};

export const DeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  type: { type: String, required: true },
  status: {},
  manufacturer: {},
  location: {},
  metadata: {}
});

export interface Device extends mongoose.Document {
  _id: string;
  deviceId: string;
  type: string;
  status: {
    code: string;
    lastUpdateReceived: number;
    message: string;
    power: {
      type: string;
      percentage: number;
    }
  };
  manufacturer: {
    referenceModel: string;
    manufacturerId: string;
    firmware: {
      name: string;
      version: string;
    };
  };
  location: {
    id: string;
    placement: string;
    IP: string;
  };
  metadata: {
    sensors: sensor[];
    lights: light[];
  };
}