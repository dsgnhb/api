export = {
  apiKeys: process.env.APIKEYS.split(','),
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  },
  imgur: {
    clientID: process.env.IMGUR_CLIENT_ID,
    clientSecret: process.env.IMGUR_CLIENT_SECRET
  },
  env: process.env.ENVIRONMENT,
  development: process.env.ENVIRONMENT.includes('development')
}
