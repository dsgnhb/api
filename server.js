const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const config = require("./config.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const router = require('./routes.js');


app.get('/', function (req, res) {
  res.send('Meddl!');
})

// Getting API Tokens
const tokens = config.apiKeys
for (var i = 0; i < tokens.length; i++) {
    app.use('/'+tokens[i], router);
}

app.listen(port);
console.log('Magic happens on port ' + port);