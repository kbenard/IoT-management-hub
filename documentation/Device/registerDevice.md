# Register Device

Registers a deviceId in the database with the structure supplied in the request body

**URL** : `/device/id/:id`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`



**Content examples**

For a User with ID 1234 on the local database where that User has saved an
email address and name information.

```json
{
    "id": 1234,
    "first_name": "Joe",
    "last_name": "Bloggs",
    "email": "joe25@example.com"
}
```

## Error Responses

**Code** : `400 BAD REQUEST`

Happens when the operation is requested for a non existing deviceId.