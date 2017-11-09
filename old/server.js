const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config.json')
const app = express()
const path = require('path')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors({
  credentials: true,
  origin: true
}))

app.use('/doc', express.static(path.join(__dirname, './public/apidoc')))

app.use(morgan('short'))

app.use((req, res, next) => {
  const publicEndpoints = ['/', '/topdesign/posts/month', '/levels', '/donate', '/topdesign/posts/currentmonth']
  if (!config.apiKeys.includes(req.header('token')) && publicEndpoints.indexOf(req.path) === -1) {
    res.status(403).json({error: 'Missing correct access Token'})
    return
  }
  next()
})
const port = process.env.PORT || 8080

const router = require('./routes.js')
app.use(router)

app.listen(port)
console.log('Magic happens on port ' + port)

// development error handler
// will print stacktrace
if (config.env === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    return res.json({
      error: {
        'message': err.message
      }
    })
  })
}
