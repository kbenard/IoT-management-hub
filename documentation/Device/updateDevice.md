# Update Device

Updates the Device state and config in the Database with the supplied body object. Subject to data validation rules. Returns a success confirmation object.

**URL** : `/device/id/:id`

**Method** : `PUT`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

Response body for a successful updateDevice call.

```json
{
  "success": true,
  "deviceId": "device1"
}
```

## Error Responses

**Code** : `400 BAD REQUEST`

Happens when the operation is requested for a non existing deviceId.

**Content examples**

```json
{
  "statusCode": 400,
  "message": "Document with deviceId 'device1' was not found in database."
}
```

**Code** : `500 INTERNAL SERVER ERROR`

Happens when the update query was not acknowledged by the database, or in the unlikely case that the requested deviceId matches more than one document.

**Content examples**

Database acknowledgment error.

```json
{
  "statusCode": 500,
  "message": "Database Error: Update success for document with deviceId 'device1' was not acknowledged by the database."
}
```

More than one documents found for requested deviceId.

```json
{
  "statusCode": 500,
  "message": "Database Error: Too many documents with deviceId 'device1' were matched in the database for this update request. Cannot resolve device."
}
```