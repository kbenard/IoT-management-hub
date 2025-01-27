// Schemas
import { DeviceSchema } from "./modules/devices/device.schema";

// // Config
const config = require('config');

// MongoDB
const mongoose = require('mongoose');
const mongoDBUri = `mongodb+srv://${config.mongoDB.user}:${config.mongoDB.password}@${config.mongoDB.clusterUrl}/${config.mongoDB.database}?retryWrites=true&w=majority`;

// Constants
const SECONDS = 1000;

// This function is meant to periodically simulate devices status updates towards the backend
// Inserts some variance for monitoring graph purposes
export async function DeviceSimulator() {
    console.log("DeviceSimulator - Init");
    await mongoose.connect(mongoDBUri);
    const DeviceModel = mongoose.model('Device', DeviceSchema);
    const StatusModel = mongoose.model('Status', new mongoose.Schema({ 
        device: String,
        homeId: String,
        status: String,
        sensors: {},
        timestamp: Date
    }));

    // In case I need to reset the collection content
    // await StatusModel.deleteMany({});

    const intervalID = setInterval(async function () {
        let devices = (await DeviceModel.find({}));

        // Every device has a 30% chance to get a NO_NETWORK error for data variation
        // Every metric value will be submitted with a +/- 10% variance to the database
        let statusUpdates = devices.map(d => { 
            let random = Math.random();
            if(random < 0.3) {
                d.status.code = "NO_NETWORK";
            }

            let sensors = (d.metadata?.sensors || []).reduce((mem, sensor) => {
                let varDirection = Math.random() < 0.5 ? -1 : 1;
                let varPercentage = (Math.random() * (sensor.value < 0.05 ? 0.3 : 0.1));
                mem[sensor.metric] = { unit: sensor.unit, value: Math.round((sensor.value + (sensor.value * (varDirection * varPercentage)))*100)/100, oldValue: sensor.value, varDirection, varPercentage };
                return mem
            }, {});

            return {
                device: d.deviceId,
                homeId: d.geodata?.homeId,
                status: d.status?.code || "N/A",
                sensors: sensors,
                timestamp: new Date()
            }
        });

        let readings = await StatusModel.insertMany(statusUpdates);
        // console.log("Interval - Devices: ", JSON.stringify(readings, null, 2));
    }, 60 * SECONDS);
}