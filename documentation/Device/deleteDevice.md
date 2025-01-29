# Delete Device

Deletes the requested deviceId document from the database. Returns a success confirmation object.

**URL** : `/device/id/:id`

**Method** : `DELETE`

**Auth required** : NO

**Permissions required** : None

**Example** : http://localhost:3000/device/id/device1

## Success Response

**Code** : `200 OK`

**Content examples**

Here is an example of returned response when the requested deviceId has been successfully removed from the database.

```json
{
  "success": true,
  "message": "Device 'deviceToCreateThenDelete succefully removed'",
  "deviceId": "deviceToCreateThenDelete"
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
