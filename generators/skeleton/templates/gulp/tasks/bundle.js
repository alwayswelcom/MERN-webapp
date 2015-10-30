const _ = require('lodash');
const gulp = require('gulp');
const gutil = require('gulp-util');
const config = require('../config');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const uglifyify = require('uglifyify');
const envify = require('envify/custom');
const plumber = require('gulp-plumber');

gulp.task('bundle', ['prepare-assets'], () => {
  const conf = _.cloneDeep(config.browserify);
  conf.transform.push([envify({_: 'purge', NODE_ENV: 'production'}), {global: true}]);
  conf.transform.push([uglifyify, {global: true}]);

  const b = browserify(conf);
  b.on('log', gutil.log);

  return b
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Bundling Error'))
    .pipe(plumber())
    .pipe(source(config.client.dist.bundle))
    .pipe(buffer())
    .pipe(gulp.dest(config.client.dist.path));
});