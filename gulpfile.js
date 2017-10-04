'use strict'

const gulp = require('gulp')
const apidoc = require('gulp-apidoc')
const path = require('path')

gulp.task('doc', function () {
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
