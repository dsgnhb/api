const request = require('request-promise-native');

async function updator() {

  let options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    url: `https://api.dsgnhb.de/update`,
    body: {
      token: process.env.PRODUCTION_APIKEY.split(',')[0],
    },
    json: true
  };

  let req = await request(options);
  console.log(req);
}


updator().then().catch(e => console.error(e));
