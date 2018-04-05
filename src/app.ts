'use strict';

// Include dependencies
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as exphbs from 'express-handlebars';
import * as path from 'path';
import * as Raven from 'raven';

// Error handler service
import { development as DevelopmentErrorHandler/*, production as ProductionErrorHandler */} from './services/errorHandler';
// import C = require('./config-rewrapper');
import { errors } from 'celebrate';

import topdesign_router from './routes/topdesign';
import post_router from './routes/posts';
import levels_router from './routes/levels';
import donate_router from './routes/donate';
import root_router from './routes/root';
import apply_router from './routes/apply';

// Main app
const app = express();

// Raven
// Must configure Raven before doing anything else with it
Raven.config('https://4109cca0bd744863822adf30f796f13b@sentry.io/1078094').install();

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());

// The error handler must be before any other error middleware
app.use(Raven.errorHandler());


// celebrate Errors
app.use(errors());

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// JSON-Body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// morgan Logging
app.use(morgan('short'));

// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// cors Access
app.use(cors({
    credentials: true,
    origin: ['https://dsgnhb.de', 'https://designhub.fun']
}));

// Routes
app.use('/docs', express.static(path.join(__dirname, './docs.html')));

app.use('/', root_router);
app.use('/donate', donate_router);
app.use('/levels', levels_router);
app.use('/topdesign/posts', post_router);
app.use('/topdesign', topdesign_router);
app.use('/apply', apply_router);

// Dear Future me: This may help or may not.


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
// if (C.development) {
app.use(DevelopmentErrorHandler);
// } else {
//  app.use(ProductionErrorHandler);
// }
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
