# fatbellies

FatBellies Restaurant REST API, backed by SQLite using sequelize, cached by Redis

## Pre-requisites

* NodeJS
* SQLite
* Redis

## Installation

* clone repo
* `npm install`
* `cp .env.example .env` and change value accordingly

## Running

* Main server `nodemon server.js`
* Pubsub service `nodemon pubsub.js`

## Testing

`npm run test`