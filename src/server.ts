'use strict';
import dotenv = require('dotenv');
import * as fs from 'fs';
import {checker} from './util/envLinter';

if (!fs.existsSync('src/.env') && fs.existsSync('src/.env.example')) {
    console.warn('You forgot renaming the file .env.example to .env. Exiting now.');
    process.exit(1);
}

if (process.env.CI) {
    dotenv.config({
        path: 'src/.env.test'
    });
} else {
    dotenv.config({
        path: 'src/.env'
    });
    checker();
}



import app from './app';

const port = process.env.CI ? 3000 : 8080;
app.set('port', port);

app.listen(app.get('port'), () => {
        console.log('API listening on port ' + port + ': http://127.0.0.1:' + port);
    }).on('error', err => {
        console.log('Cannot start server, port most likely in use');
        console.log(err);
    });
