// This script is meant to periodically simulate devices behaviour and status updates towards the backend
// The script also Inserts some variance for monitoring graph purposes
 
// Schemas
import { DeviceSchema } from "./modules/devices/device.schema";
import { statusEventSchema } from "./modules/events/events.schema";

// Config
const config = require('config');

// MongoDB
const mongoose = require('mongoose');
const mongoDBUri = `mongodb+srv://${config.mongoDB.user}:${config.mongoDB.password}@${config.mongoDB.clusterUrl}/${config.mongoDB.database}?retryWrites=true&w=majority`;

// Constants
const SECONDS = 1000;

export async function DeviceSimulator() {
    console.log("DeviceSimulator - Init");
    await mongoose.connect(mongoDBUri);
    const DeviceModel = mongoose.model('Device', DeviceSchema);
    const StatusEventModel = mongoose.model('Status', statusEventSchema);

    // In case I need to reset the collection content
    if(config?.deviceSimulator?.resetEventsAtRestart) {
        await StatusEventModel.deleteMany({});
    }

    const intervalID = setInterval(async function () {
        let devices = (await DeviceModel.find({}));

        let newDevices:any = JSON.parse(JSON.stringify(devices)).map(d => {
            let random = Math.random();
            if(random < 0.3) {
                d.status.code = "NO_NETWORK";
            }

            d.metadata.sensors = (d.metadata.sensors || []).map(sensor => {
                let varDirection = Math.random() < 0.5 ? -1 : 1;
                let varPercentage = (Math.random() * (sensor.value < 0.1 ? 0.3 : 0.1));
                let oldValue = sensor.value;
                sensor.value = Math.round((sensor.value + (sensor.value * (varDirection * varPercentage)))*100)/100;
                return sensor
            })

            return d
        })

        // Every device has a 30% chance to get a NO_NETWORK error for data variation
        // Every metric value will be submitted with a +/- 10% variance to the database
        let statusUpdates = newDevices.map(d => { 
            let sensors = (d.metadata?.sensors || []).reduce((mem, sensor) => {
                mem[sensor.metric] = { unit: sensor.unit, value: sensor.value };
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

        // console.log("Status Updates: ", JSON.stringify(statusUpdates[0], null, 2));
        let readings = await StatusEventModel.insertMany(statusUpdates);
        console.log(`Device Simulator - Interval - ${new Date()}`, readings.map(r => r.device).join(", "));
    }, (config?.deviceSimulator?.intervalDelayInSeconds || 60) * SECONDS);
}