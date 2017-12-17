# API [![MegaOP](https://img.shields.io/badge/MEGA%20OP-%E2%9C%94-green.svg)](http://dsgnhb.de) [![Build Status](https://travis-ci.org/dsgnhb/api.svg?branch=dev)](https://travis-ci.org/dsgnhb/api)[![Greenkeeper badge](https://badges.greenkeeper.io/dsgnhb/api.svg)](https://greenkeeper.io/)

REST API written in node.js using express and mysql

This API is primarily intended for intern usage.

## API Docs
The generated ApiDocs are stored in the `dist/apidoc` folder after building, or accessible via the route `/documentation`

## Build system

Several gulp tasks are provided, which are described by running `gulp help`:

- typescript linting/compiling tasks (watch/watchAndServe/lint/tdd)
- server application + autorestart it when code changes (through [nodemon](https://www.npmjs.com/package/nodemon))

## Installation

- Node must be installed on the system
- Run `npm install` from the root folder to install all required dev/build dependencies

## Developing

- Use the `gulp watchAndServe` task 
during development to get hot code-reloading/test running when you modify your code

## Running production server:
### Do not forget renaming the file `.env.example` located in `src` folder to `.env` and insert your data correctly.
To make use of all your server resources, it is recommended to run the server in cluster mode (via the [PM2](https://www.npmjs.com/package/pm2) package)

Use the `gulp serveCluster` task. You can monitor the cluster and issue commands by running pm2 command (for this you might want to install pm2 globally, `npm install pm2 -g`)
