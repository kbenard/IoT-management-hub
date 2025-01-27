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

## Error Responses

**Code** : `400 BAD REQUEST`

Happens when either invalid skip or limit options are passed, or when requested pagination limit is superior to the 500 documents limit per call.

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