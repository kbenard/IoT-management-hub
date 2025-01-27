# getDevice
## Success
curl -XGET http://localhost:3000/device/id/device1

## Error 400 - deviceId not found
curl -XGET http://localhost:3000/device/id/deviceShouldNotExist

# listDevices
# Success - List all devices
curl -XGET http://localhost:3000/device/list

# Success - List all devices for homeId home1
curl -XGET http://localhost:3000/device/list/homeId/home1

# updateDevice
# Success - Update device1 - status.lastUpdateReceived
lastUpdateReceived="{ \"status\": { \"lastUpdateReceived\": $(date +%s) } }""" && echo "${lastUpdateReceived}" && \
    curl --request PUT -H "Content-Type: application/json" --data "${lastUpdateReceived}" http://localhost:3000/device/id/device1
curl -XGET http://localhost:3000/device/id/device1 # To confirm change

# Error 500 - Should be blocked by DTO Validation Pipe, need to investigate. At least still blocked by Schema definition
curl -XPUT -H "Content-Type: application/json"  --data '{ "notInSchema": true }' http://localhost:3000/device/id/device1

# Error 400 - Invalid Type - status.code must be a string
curl -XPUT -H "Content-Type: application/json"  --data '{ "status": { "code": 123 } }' http://localhost:3000/device/id/device1

# registerDevice
# Success - Create device deviceToCreateThenDelete - FROM REPO ROOT FOLDER
newDeviceName="deviceToCreateThenDelete" && cp -u "./sample/device/device1.json" "./sample/device/${newDeviceName}.json" && \
    sed -i -e "s/device1/${newDeviceName}/g" "./sample/device/${newDeviceName}.json" && \
    curl -XPOST -H "Content-Type: application/json" --data "@./sample/device/${newDeviceName}.json" "http://localhost:3000/device/id/${newDeviceName}" && /
    rm "./sample/device/deviceToCreateThenDelete.json"

# Error 400 - Document already exists
curl -XPOST -H "Content-Type: application/json" --data "@./sample/device/device1.json" "http://localhost:3000/device/id/device1"

# deleteDevice
# Success - Remove device deviceToCreateThenDelete
newDeviceName="deviceToCreateThenDelete" && cp -u "./sample/device/device1.json" "./sample/device/${newDeviceName}.json" && \
    sed -i -e "s/device1/${newDeviceName}/g" "./sample/device/${newDeviceName}.json" && \
    curl -XPOST -H "Content-Type: application/json" --data "@./sample/device/${newDeviceName}.json" "http://localhost:3000/device/id/${newDeviceName}" && /
    rm "./sample/device/deviceToCreateThenDelete.json" && \
    curl -XDELETE -H "Content-Type: application/json" "http://localhost:3000/device/id/${newDeviceName}"

# Error 400 - Device can't be deleted as not found
curl -XDELETE -H "Content-Type: application/json" "http://localhost:3000/device/id/deviceShouldNotExist"