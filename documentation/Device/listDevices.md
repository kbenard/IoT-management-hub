# Get Device

Retrieves a summarized list of all stored devices.
Search can be narrowed down to devices belonging to a single homeId when using the optional `{/homeId/:homeId}` extra path.

Query parameters can also be used to paginate the search:
- `limit`: maximum number of records sent back in the request response
- `skip`: controls the offset for records that have already been received in previous calls

**URL** : `/device/list{/homeId/:homeId}?limit=1&skip=1`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

This is a response sample when the request is successful

```bash
curl -XGET "http://localhost:3000/device/list?limit=1&skip=1"
```

```json
[
  {
    "status": {
      "code": "WARNING_MOULD",
      "message": "Action Required: High Mould Levels Detected"
    },
    "device": {
      "model": "Ei1025"
    },
    "geodata": {
      "homeId": "home2"
    },
    "metadata": {
      "sensors": [
        {
          "id": "condensation",
          "metric": "Humidity Levels",
          "unit": "percentage",
          "value": 65,
          "_id": "6797879f5bd989623a7bbbcd"
        },
        {
          "id": "damp",
          "metric": "Moisture Levels",
          "unit": "percentage",
          "value": 24,
          "_id": "6797879f5bd989623a7bbbce"
        },
        {
          "id": "temperature",
          "metric": "Temperature",
          "unit": "celsius",
          "value": 23,
          "_id": "6797879f5bd989623a7bbbcf"
        },
        {
          "id": "CO2",
          "metric": "Co2 Concentration Levels",
          "unit": "ppm",
          "value": 400,
          "_id": "6797879f5bd989623a7bbbd0"
        }
      ],
      "indicators": []
    },
    "_id": "6797879f5bd989623a7bbbcc",
    "deviceId": "device2",
    "type": "EnvironmentalSensor"
  }
]
```

## Error Responses

**Code** : `400 BAD REQUEST`

Happens when either invalid skip or limit options are passed, or when requested pagination limit is superior to the 500 documents limit per call.

**Content examples**

This is a response sample when the requested skip parameter is not a number.

```json
{
  "statusCode": 400,
  "message": "The Skip query parameter should be a number."
}
```

This is a response sample when the requested limit parameter is not a number.

```json
{
  "statusCode": 400,
  "message": "The Limit query parameter should be a number."
}
```

This is a response sample when the requested limit parameter is superior to 500.

```json
{
  "statusCode": 400,
  "message": "The Limit query parameter value upper limit is 500."
}
```