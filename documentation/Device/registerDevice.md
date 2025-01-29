# Register Device

Registers a deviceId in the database with the structure supplied in the request body. Returns the created database document.

**URL** : `/device/id/:id`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Example URL** : http://localhost:3000/device/id/device1

## Success Response

**Code** : `200 OK`

**Content examples**

Here is an example of returned response when the requested deviceId has been successfully registered in the database.

```json
{
  "deviceId": "deviceToCreateThenDelete",
  "type": "FireAlarm",
  "status": {
    "code": "OK",
    "lastUpdateReceived": 1737828494,
    "message": "No problem detected",
    "power": {
      "network": {
        "required": true,
        "connected": true
      },
      "battery": {
        "percentage": 100
      }
    }
  },
  "device": {
    "model": "Ei3024",
    "name": "Ei3024 Multi-Sensor Fire Alarm",
    "manufacturer": "Aico",
    "ean": 5099383006537,
    "firmware": {
      "name": "AudioLINK+",
      "version": "2.1.15"
    }
  },
  "geodata": {
    "homeId": "home1",
    "placement": "Bedroom",
    "IP": "100.0.0.1"
  },
  "metadata": {
    "sensors": [
      {
        "id": "optical",
        "metric": "Optical Density Per Meter",
        "unit": "OD/m",
        "value": 0.05,
        "_id": "6797d1e5db30420628f76a0c"
      },
      {
        "id": "thermistor",
        "metric": "Temperature",
        "unit": "celsius",
        "value": 20,
        "_id": "6797d1e5db30420628f76a0d"
      }
    ],
    "indicators": [
      {
        "id": "Power",
        "type": "light",
        "active": "true",
        "_id": "6797d1e5db30420628f76a0e"
      },
      {
        "id": "Alarm",
        "type": "light",
        "active": "false",
        "_id": "6797d1e5db30420628f76a0f"
      },
      {
        "id": "Fault",
        "type": "light",
        "active": "false",
        "_id": "6797d1e5db30420628f76a10"
      }
    ]
  },
  "_id": "6797d1e5db30420628f76a0b",
  "__v": 0
}
```

## Error Responses

**Code** : `400 BAD REQUEST`

Happens when the operation is requested for a non existing deviceId.

**Content examples**

```json
{
  "statusCode": 400,
  "message": "Document with deviceId 'deviceShouldNotExist' was not found in database."
}
```
