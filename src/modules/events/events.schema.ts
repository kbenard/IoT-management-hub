import * as mongoose from 'mongoose';

export const statusEventSchema = new mongoose.Schema({ 
    device: String,
    homeId: String,
    status: String,
    sensors: {},
    timestamp: Date
})

export const requestEventSchema = new mongoose.Schema({ 
    path: String,
    statusCode: Number,
    errorCode: String,
    success: Boolean,
    timestamp: Date
})