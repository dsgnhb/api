'use strict';

// Include dependencies
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';

// Modular Route definitions
import * as router from './routes/base';


// Error handler service
import { development as DevelopmentErrorHandler, production as ProductionErrorHandler } from './services/errorHandler';
import C = require('./config-rewrapper');

// Main app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('short'));

app.use(cors({
    credentials: true,
    origin: true
}));


app.use((req, res, next) => {
    const publicEndpoints: Array<string> = ['/', '/topdesign/posts/month', '/levels', '/donate', '/topdesign/posts/currentmonth'];
    if (!C.apiKeys.includes(req.header('token')) && publicEndpoints.indexOf(req.path) === -1) {
        res.status(403).json({error: 'Missing correct access Token'});
        return;
    }
    next();
});

// Register routes (as middleware layer through express.Router())
app.use(router);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function) => {
    let err = new Error('Not Found');
    res.status(404);
    console.log('catching 404 error');
    return next(err);
});

// error handlers

// development error handler - will print stacktrace
// production error handler - no stacktraces leaked to user
if (C.development) {
  app.use(DevelopmentErrorHandler);
} else {
  app.use(ProductionErrorHandler);
}

export default app;
