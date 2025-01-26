import * as mongoose from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: false }
});

export interface Device extends mongoose.Document {
  _id: string;
  deviceId: string;
}