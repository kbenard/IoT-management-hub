import * as mongoose from 'mongoose';

// Sensor SubSchema - Modelises sensors present on devices (humidity, CO2, temperature, etc...), as well as their readings 
// See 'sample' folder in root for examples
const sensorSchema = new mongoose.Schema({
  id: { type: String },
  metric: { type: String },
  unit: { type: String },
  value: { type: Number }
});

type sensor = {
  id: string;
  metric: string;
  unit: string;
  value: number;
};

// Indicators SubSchema - Modelises indicators present on devices (light, sound, etc...), as well as their current status 
// See 'sample' folder in root for examples
const indicatorSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String },
  active: { type: String }
});

type indicator = {
  id: string;
  type: string;
  active: boolean;
};

// Device Schema - Modelises device data structure with its relevant data (device info, status, geodata, sensors, indicators, etc...)
// See 'sample' folder in root for examples
export const DeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  type: { type: String, required: true },
  status: {
    code: { type: String, required: true },
    lastUpdateReceived: { type: Number },
    message: { type: String, required: true },
    power: {
      network: { 
        required: { type: Boolean, required: true },
        connected: { type: Boolean, required: true }
      },
      battery: { 
        percentage: { type: Number, required: true }
      }
    }
  },
  device: {
    model: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    ean: { type: Number, required: true },
    firmware: {
        name: { type: String, required: true },
        version: { type: String, required: true }
    }
  },
  geodata: {
    homeId: { type: String, required: true },
    placement: { type: String, required: true },
    IP: { type: String, required: true }
  },
  metadata: {
    sensors: [sensorSchema],
    indicators: [indicatorSchema]
  }
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
      network: {
        required: boolean;
        connected: boolean;
      };
      battery: {
        percentage: number;
      };
    }
  };
  device: {
    model: string;
    name: string;
    manufacturer: string;
    ean: number;
    firmware: {
      name: string;
      version: string;
    };
  };
  geodata: {
    homeId: string;
    placement: string;
    IP: string;
  };
  metadata: {
    sensors: sensor[];
    indicators: indicator[];
  };
}