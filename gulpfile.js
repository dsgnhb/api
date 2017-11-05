'use strict'

const gulp = require('gulp')
// GULP PLUGINS
const apidoc = require('gulp-apidoc')
// /GULPPLUGINS

const path = require('path')

gulp.task('doc', () => {
  apidoc({
    config: path.join(__dirname, './'),
    src: path.join(__dirname, './controllers/'),
    dest: path.join(__dirname, './public/apidoc')
  }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})
