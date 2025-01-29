### Device API

Endpoints for viewing and manipulating the Devices managed by the IoT Management Hub.
The project runs on port 3000 by default and can be accessed on the following endpoint locally `http://localhost:3000/`.

* [Get Device](getDevice.md) : `GET /device/id/:id`
* [List Devices](listDevices.md) : `GET /device/list{/homeId/:homeId}`
* [Update Device State or Config](updateDevice.md) : `PUT /device/id/:id`
* [Register Device](registerDevice.md) : `POST /device/id/:id`
* [Delete Device](deleteDevice.md) : `DELETE /device/id/:id`

Examples of CURL requests to the locally running application can be found in the following script [file](../../scripts/api-query-examples.sh).
