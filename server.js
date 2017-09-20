const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const config = require("./config.json");
const design = require("./functions/topdesign.js")
const level = require("./functions/levels.js")
const donation = require('./functions/donate.js');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: true
}));
const port = process.env.PORT || 8080;

const router = require('./routes.js');
app.get('/', function (req, res) {
  res.send('Meddl!');
})
app.get('/posts/month',design.findAllMonth); // Get all Posts sorted by Month
app.get('/levels',level.findAll);
app.post('/donate/', donation.add); // Add Donation

// Getting API Tokens
const tokens = config.apiKeys
for (let i = 0; i < tokens.length; i++) {
    app.use('/'+tokens[i], router);
}

app.listen(port);
console.log('Magic happens on port ' + port);