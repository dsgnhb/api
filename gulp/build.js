'use strict';

//Dependencies
let gulp = require('gulp'),
  $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del', 'run-sequence', 'gulp-aglio']
  }),
  config = require('./config.json'),
  tsConfig = require('../tsconfig.json'),
  aglio = require('gulp-aglio');

/**
 * Create typescript project build reference for incremental compilation under watch tasks
 *
 * @link https://github.com/ivogabe/gulp-typescript
 */
const tsProject = $.typescript.createProject('tsconfig.json', {
  // Override package version of typescript to use latest compiler version
  typescript: require('typescript')
})

/**
 * Cleans the dist folder
 */
gulp.task('clean', false, () => $.del(['dist']));

/**
 * Precopies all non-ts files into the dist folder
 */
gulp.task('copyNonTs', false, () =>
  gulp.src(['!src/.env', 'src/**/*', '!src/**/*.ts'])
    .pipe(gulp.dest('dist'))
);

/**
 * Lints typescript code
 */
gulp.task('lint', 'Runs a typescript linter on the application code', () =>
  gulp.src(config.tsLinter.sources)
    .pipe($.tslint(config.tsLinter.options))
    .pipe($.tslint.report())
);

/**
 * Compiles typescript app into js
 */
gulp.task('compile', false, () => {

  const tsResult = gulp.src(tsConfig.files)
    .pipe(tsProject($.typescript.reporter.longReporter()))

  return tsResult.js
    .pipe(gulp.dest('dist'));
});

/**
 * Generates API Docs
 */
gulp.task('docs', function () {
  gulp.src('./src/spec/docs.md')
    .pipe(aglio({ template: 'slate' }))
    .pipe(gulp.dest('./dist'));
});

/**
 * Build the server app
 */
gulp.task('build', 'Builds the server app (compiles & copies)', (callback) =>
  $.runSequence('clean',
    ['compile'],
    'copyNonTs',
    'docs',
    callback)
);
