'use strict';
import dotenv = require('dotenv');
import * as fs from 'fs';
import {checker} from './util/envLinter';

if (!fs.existsSync('src/.env') && fs.existsSync('src/.env.example')) {
    console.warn('You forgot renaming the file .env.example to .env. Exiting now.');
    process.exit(1);
}

dotenv.config({
    path: 'src/.env'
});
checker();

import app from './app';

const port = 8080;
app.set('port', port);

app.listen(app.get('port'), () => {
    console.log('API listening on port ' + port);
}).on('error', err => {
    console.log('Cannot start server, port most likely in use');
    console.log(err);
});
