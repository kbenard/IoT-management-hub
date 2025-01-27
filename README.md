## Description

A [NestJS](https://github.com/nestjs/nest) framework TypeScript RESTful API service for IoT Device Management. This project relies on MongoDB for device state management & InfluxDB for time series data related to device history.

## Summary of Approach & Challenges

This application relies on the following technologies:
- The NestJS framework to build the RESTful API backend service. It fully supports TypeScript, allows to easily integrate MongoDB through the [Mongoose](https://mongoosejs.com/) ODM for proper data modelisation and validation, and allows to quickly generate project templates with modules, controllers, service & unit testing scripts.
- MongoDB for device state data management. The Device state data being more structured and static, it seemed more appropriate to resort to a Key/Document database to store it in a fluid but structured object form. MongoDB's free cloud plan also allows me to simplify the project setup on other machines by having a remote common database.
- InfluxDB for device time series data management.

For this technical challenge, I tried to approach this challenge like a project, dividing it in the following short phases: technical & conceptual research, conception, planning, iterative implementation, testing, documentation & final preparations.
- Technical & Conceptual Research: I first went through an initial short phase of research to better grasp the technological requirements of a IoT Device Management backend application. This involved looking at the type of databases that would be more suited for time series data notable for event or historical data, the type of device information that would be relevant to store in a Device state and how to structure it. Other elements of research included which framework to base the RESTful API web app on, general IoT research, and Aico's product range/features/instruction & how it could be modelized.
- Conception: Once I had a clearer view, I decided to stay within the Node.js one to leverage my personal expertise, while taking the opportunity of the challenge to train on technologies I don't have as much experience yet. I went through a short design phase to outline the initial schema and data entities to represent, as well as the use cases & exceptions that each API routes should cover.
- Planning: Planning consisted mostly in breaking down the workload in prioritized milestones, aiming to progressively integrate each element of the web app. 
- Iterative Implementation: I endeavoured to follow the plan as much as possible, with a few elements being worked in parallel to the main steps like unit testing. 
  - I started with setting up the repository and the skeleton of the NestJS project, setting up the Device module and its associated scripts, as well as placeholders for all the API routes requested in the specs.
  - Afterwards, I set up the MongoDB Cloud database, and integrated it to the app, then worked on translating the initial data structure outline into relevant Schemas & Document definitions using the Mongoose ODM. Existing definitions required further adjusting later on as the challenge progressed.
  - The actual implementation of the API routes logic came then with proper data manipulation. It was finalized with work on the Device controller unit testing script.
  - Data validation implementation then came to ensure the data supplied to the web app is adhering to the wanted data model, notably with the updateService API route.
- Testing: Testing of every route and use case with unit testing script & Curl. Supplying of sample data structures & example bash commands covering most use cases.
- Documentation: Writing the contents of the README.md file with Summary of Approach & Challenges, Intructions. Writing of a short API documentation.
- Final Preparations: Making sure everything is ready to be delivered to the reviewer, database access is sorted, credentials are ready to be securely shared, testing the setup process on a separate user and testing everything works.

In terms of challenges that I encountered:
- Gaining a sufficient understanding of the ins and outs of an IoT Device management.
- Navigating technologies I was not familiar with & integrating those together in a coherent manner suitable to fulfil the challenge's requirements and specs in a timely manner.
- Properly establish a data model relevant for IoT Device Management. I also tried to conceive that structure while keeping in mind homeLINK's context and products. Metrics for sensors were researched lightly to better understand the type of measurements and units measured by such devices.
- Data validation proved a bit of a challenge, notably the construction of the Data Transfer Object definitions used to validate the Device document structures sent to the API routes. The first minor challenge was the breaking down of a structure of nested object into smaller DTOs using `@ValidateNested` from the `class-validator` dependency. The biggest challenge was constructing a more permissive DTO structure to handle device updates, allowing optional fields while respecting the original DTO any data supplied. Current implementation for the alternate DTO still has a few quirks to iron out.

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
  - Both the MongoDB & InfluxDB databases are cloud based and do not require any local setup. However, credentials to access both will need to be securely transmitted to the developer running the project and populated in a `config/dev.json` file to be created from `config/template.json` and then populated with the retrieved credentials.


## Configuration

## Documentation
- [Device API](documentation/Device/index.md)

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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
