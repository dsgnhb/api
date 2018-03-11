const request = require('request-promise-native');

module.exports = async (application_details) => {
  let options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    url: `${process.env.DISCORD_WEBHOOK}/slack`,
    body: {
      username: 'Bewerbungs Bot',
      attachments: [{
        color: '#00ff00',
          author_name: application_details[2].value,
          fields: application_details,
        thumb_url: 'http://example.com/path/to/thumb.png',
        footer: 'dsgnhb API',
        footer_icon: 'https://github.com/dsgnhb/www/blob/master/src/files/img/logos/light.png?raw=true'
      }]
    },
    json: true
  };


  await request(options);
};
