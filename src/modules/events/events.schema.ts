import * as mongoose from 'mongoose';

export const statusEventSchema = new mongoose.Schema({ 
    device: String,
    homeId: String,
    status: String,
    sensors: {},
    timestamp: Date
})

export interface StatusEvent extends mongoose.Document {
  _id: string;
  device: string;
  homeId: string;
  status: string;
  sensors: {};
  timestamp: number;
}

export const requestEventSchema = new mongoose.Schema({ 
    path: String,
    statusCode: Number,
    errorCode: String,
    success: Boolean,
    timestamp: Date
})

export interface RequestEvent extends mongoose.Document {
  _id: string;
  path: string;
  statusCode: string;
  errorCode: string;
  success: boolean;
  timestamp: number;
}