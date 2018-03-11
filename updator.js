const request = require('request-promise-native');
const dotenv = require('dotenv');

async function updator() {
  dotenv.config({
    path: './src/.env.test'
  });

  let options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    url: `https://api.dsgnhb.de/update`,
    body: {
      token: process.env.APIKEYS.split(',')[0],
    },
    json: true
  };

  let req = await request(options);
  console.log(req);
}


updator().then().catch(e => console.error(e));
