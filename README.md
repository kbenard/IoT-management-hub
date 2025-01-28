## Description

A [NestJS](https://github.com/nestjs/nest) framework TypeScript RESTful API service for IoT Device Management. This project relies on MongoDB for device state and history management, as well as MongoDB Atlas monitoring.

This application relies on the following technologies:
- The NestJS framework to build the RESTful API backend service. It fully supports TypeScript, allows to easily integrate MongoDB through the [Mongoose](https://mongoosejs.com/) ODM for proper data modelisation and validation, and allows to quickly generate project templates with modules, controllers, service & unit testing scripts.
- MongoDB for device state and history data management, as its collections can also be optimised for time series data. The Device state data being more structured and static, it seemed more appropriate to resort to a Key/Document database to store it in a fluid but structured object form. MongoDB's free cloud plan also allows me to simplify the project setup on other machines by having a remote common database. As an added bonus, MongoDB Atlas also gives access to an integrated monitoring platform that I used to create a basic dashboard with a few graphs and feed it with the Device history.

## Approach

I tried to approach this technical challenge like a project, splitting it in the following short phases:
- **Technical & Conceptual Research:** I went through an initial short phase of research to better grasp the technological requirements of a IoT Device Management backend application. This involved looking at which type of database would be more suited for time series data, the type of device information that would be relevant to store in a Device state and how to structure it. Other elements of research included which framework to use as a RESTful API web app base, general IoT research, and Aico's product range/features/instruction for insights & how it could be modelised into a data model.
- **Conception:** After consideration, I decided to stay within the Node.js stack to leverage my personal expertise, while taking the opportunity of the challenge to train myself on new technologies. I went through a short design phase to outline the initial schema and data entities to represent, as well as the use cases & exceptions that each API routes should cover.
- **Planning:** Planning consisted mostly in breaking down the workload in prioritised milestones, aiming to progressively integrate each element into the project. 
- **Iterative Implementation:** I endeavoured to follow the plan as much as possible, with a few elements being worked in parallel to the main steps like unit testing. 
  - I started with setting up the repository and the skeleton of the NestJS project, setting up the Device module and its associated scripts, as well as placeholders for all the API routes requested in the specs.
  - Afterwards, I set up the MongoDB Cloud database, and integrated it to the app, then worked on translating the initial data structure outline into relevant Schemas & Document definitions using the Mongoose ODM. Existing definitions required further adjusting later on as the challenge progressed.
  - The actual implementation of the API routes logic came then with proper data manipulation. It was finalized with work on the Device controller unit testing script.
  - Data validation implementation then came to ensure the data supplied to the web app is adhering to the wanted data model, notably with the updateService API route.
- **Testing:** Testing of every route and use case with unit testing script & Curl. Supplying of sample data structures & example bash commands covering most use cases.
- **Documentation:** Writing the contents of the README.md file with Summary of Approach & Challenges, Intructions. Writing of a concise API documentation.
- **Final Preparations:** Making sure everything is ready to be delivered to the reviewer, database access is sorted, credentials are ready to be securely shared, testing the setup process on a separate user and testing everything works.
- **Extra:** `device-simulator` interval routine running in the background to simulate IoT device "live" data. Monitoring dashboard created on MongoDB Atlas to report on the "live" IoT data of the `device-simulator` loop.

## Challenges

In terms of challenges that I encountered:
- Navigating technologies I was not familiar with & integrating those together in a coherent manner suitable to fulfil the challenge's requirements and specs in a timely manner.
- Properly establish a data model relevant for IoT Device Management. I also tried to conceive that structure while keeping in mind homeLINK's context and products. Metrics for sensors were researched for an initial short period to better understand the type of units measured by such devices.
- Implementing a proper updateDevice merge logic. I realised late in dev that Mongoose merge update was not dealing well with partial update objects and data loss was occuring. I also encountered issues with the `updateOne()` function matching the document but not updating it for currently not known reasons, so I changed the logic to rely on `findByIdAndUpdate` instead. As of now, I am not fully confident on how merging arrays of objects (for sensors and indicators data) works in the updateDevice route, and am worried that changes in the order of the array entries could mess the merge process. If time permits I will replace the `_.merge()` call with `_.mergeWith` and a customizer function to deal with this edge case.
- Data validation proved a bit of a challenge, notably the construction of the Data Transfer Object definitions used to validate the Device document structures sent to the API routes. The first minor challenge was the breaking down of a structure of nested object into smaller DTOs using `@ValidateNested` from the `class-validator` dependency. The biggest challenge was constructing a more permissive DTO structure to handle device updates, allowing optional fields while respecting the original DTO any data supplied using the `PartialType` and `OmitType` mapped types supplied by [@nestjs/swagger](https://docs.nestjs.com/openapi/mapped-types). Current implementation for the alternate DTO still has a few quirks to iron out.

## Project setup

In order to run locally, this service requires for the following to be installed on the machine:
  - [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), using the relevant method of choice based on the used OS
  - [NestJS](https://docs.nestjs.com/first-steps) 
      ```bash
      $ npm i -g @nestjs/cli
      ```
  - Clone this public repository from your workspace directory: `git clone https://github.com/kbenard/IoT-management-hub.git`
  - Install Dependencies: 
    ```bash
    $ npm install
    ```
  - The MongoDB database is cloud based and does not require any local setup. However, credentials to access it will need to be securely transmitted to the developer running the project and populated in a `config/dev.json` file to be created from `config/template.json` and then populated with the retrieved credentials.


## Configuration

## Documentation
- [Device API](documentation/Device/index.md)

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
