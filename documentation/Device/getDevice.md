# Get Device

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/device/id/:id`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

## Error Responses

**Code** : `400 BAD REQUEST`

Happens when a non existing deviceId is requested

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