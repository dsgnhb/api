# API [![Build Status](https://travis-ci.org/dsgnhb/api.svg?branch=dev)](https://travis-ci.org/dsgnhb/api)


REST API written in node.js using express, mysql and standardjs.

This API is primarily intended for intern usage.

## API Docs
Find the API Docs in the release bundle, or in the `dist/apidoc` folder after building.

## Build system

Several gulp tasks are provided, which are described by running `gulp help`:

- typescript linting/compiling tasks (watch/watchAndServe/lint/tdd)
- server application + autorestart it when code changes (through [nodemon](https://www.npmjs.com/package/nodemon))
- run tests (jasmine/mocha + supertest included as examples)

## Installation

- Node must be installed on the system
- Run `npm install` from the root folder to install all required dev/build dependencies
- (Optionally) Install *Typings* `npm install typings -g` globally to update typescript definitions when desired

## Developing

- Use the `gulp watchAndServe` task 
during development to get hot code-reloading/test running when you modify your code

## Running production server:

To make use of all your server resources, it is recommended to run the server in cluster mode (via the [PM2](https://www.npmjs.com/package/pm2) package)

Use the `gulp serveCluster` task. You can monitor the cluster and issue commands by running pm2 command (for this you might want to install pm2 globally, `npm install pm2 -g`)
