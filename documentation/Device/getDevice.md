# Get Device

Retrieves the full details of the requested deviceId. Returns the matched database document.

**URL** : `/device/id/:id`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**Example** : http://localhost:3000/device/id/device1

## Success Response

**Code** : `200 OK`

**Content examples**

Here is an example of returned response for deviceId device1. The whole database document is returned.

```json
{
  "_id": "679787955bd989623a7bbbc4",
  "deviceId": "device1",
  "type": "FireAlarm",
  "status": {
    "lastUpdateReceived": 1737988366595
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
        "_id": "679787955bd989623a7bbbc5"
      },
      {
        "id": "thermistor",
        "metric": "Temperature",
        "unit": "celsius",
        "value": 20,
        "_id": "679787955bd989623a7bbbc6"
      }
    ],
    "indicators": [
      {
        "id": "Power",
        "type": "light",
        "active": "true",
        "_id": "679787955bd989623a7bbbc7"
      },
      {
        "id": "Alarm",
        "type": "light",
        "active": "false",
        "_id": "679787955bd989623a7bbbc8"
      },
      {
        "id": "Fault",
        "type": "light",
        "active": "false",
        "_id": "679787955bd989623a7bbbc9"
      }
    ]
  },
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
