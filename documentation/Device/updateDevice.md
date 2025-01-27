# Update Device

Updates the Device state and config in the Database with the supplied body object. Subject to data validation rules.

**URL** : `/device/id/:id`

**Method** : `PUT`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

## Error Responses

**Code** : `400 BAD REQUEST`

Happens when the operation is requested for a non existing deviceId.

**Code** : `500 INTERNAL SERVER ERROR`

Happens when the update query was not acknowledged by the database, or in the unlikely case that the requested deviceId matches more than one document.

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

For a user with ID 4321 on the local database but no details have been set yet.

```json
{
    "id": 4321,
    "first_name": "",
    "last_name": "",
    "email": ""
}
```

## Error Responses