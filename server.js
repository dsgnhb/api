const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const config = require("./config.json");
const design = require("./functions/topdesign.js")
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors({ origin: 'https://dsgnhb.de' }));
const port = process.env.PORT || 8080;

const router = require('./routes.js');

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://dsgnhb.de');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);
  // Pass to next layer of middleware
  next();
});

app.get('/', function (req, res) {
  res.send('Meddl!');
})
app.get('/posts/month',design.findAllMonth); // Get all Posts sorted by Month

// Getting API Tokens
const tokens = config.apiKeys
for (var i = 0; i < tokens.length; i++) {
    app.use('/'+tokens[i], router);
}

app.listen(port);
console.log('Magic happens on port ' + port);