'use strict';

// Include dependencies
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as exphbs from 'express-handlebars';


// Error handler service
import { development as DevelopmentErrorHandler, production as ProductionErrorHandler } from './services/errorHandler';
import C = require('./config-rewrapper');
// import {errors} from 'celebrate';
import topdesign_router from './routes/topdesign';
import post_router from './routes/posts';
import levels_router from './routes/levels';
import donate_router from './routes/donate';
import root_router from './routes/root';
import * as path from 'path';

// Main app
const app = express();
/*
process.env.APIKEYS.split(',').forEach(e => {
    C._keydb.get('keys').push({key: e}).write();
});*/


app.set('views', __dirname + '/../src/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('short'));

app.use(cors({
    credentials: true,
    origin: true
}));

app.use('/docs', express.static(path.join(__dirname, './docs.html')));


app.use('/', root_router);
app.use('/donate', donate_router);
app.use('/levels', levels_router);
app.use('/topdesign/posts', post_router);
app.use('/topdesign', topdesign_router);

// Dear Future me: This may help or may not.

// app.use(errors());

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function) => {
    let err = new Error('Not Found');
    res.status(404);
    console.log('catching 404 error');
    return next(err);
});

app.use('*', (err, req, res, next) => {
    if (err.isJoi) {
        let error = {};
        error[err.details.name] = err.details.message;
        res.status(500).json(JSON.stringify(error));
    }

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
/*
if (process.env.CI) {
    console.log('Config loaded:');
    console.log(C);
}

if (process.env.CI && process.env.CINOTEST) {
    process.exit(0);
}
*/
export default app;
