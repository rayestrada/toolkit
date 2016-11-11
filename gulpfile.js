'use strict';

// modules
var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var del = require('del');
var gulpif = require('gulp-if');
var webpack = require('webpack');

var assemble = require('fabricator-assemble');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var csso = require('gulp-csso');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');

var imagemin = require('gulp-imagemin');


// configuration
var config = {
  dev: gutil.env.dev,
  src: {
    scripts: {
      fabricator: './src/styleguide/fabricator/scripts/fabricator.js',
      trestle: [
        './src/js/init.js',
        './src/js/drupal.js'
      ]
    },
    styles: {
      fabricator: './src/styleguide/fabricator/styles/fabricator.scss',
      trestle: './src/sass/styles.scss'
    },
    images: 'src/images/**/*'
  },
  dest: 'dist'
};

// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);

// clean
gulp.task('clean', function () {
  return del([config.dest]);
});

// styles
gulp.task('styles:fabricator', function () {
  gulp.src(config.src.styles.fabricator)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest + '/fabricator/css'))
    .pipe(gulpif(config.dev, reload({stream: true})));
});

// Compile sass
gulp.task('styles:trestle', function () {
  gulp.src(config.src.styles.trestle)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules/breakpoint-sass/stylesheets']
    }).on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest + '/css'))
    .pipe(gulpif(config.dev, reload({stream: true})));
});

gulp.task('styles', ['styles:fabricator', 'styles:trestle']);

// scripts
gulp.task('scripts', function (done) {
  webpackCompiler.run(function (error, result) {
    if (error) {
      gutil.log(gutil.colors.red(error));
    }
    result = result.toJson();
    if (result.errors.length) {
      result.errors.forEach(function (error) {
        gutil.log(gutil.colors.red(error));
      });
    }
    done();
  });
});

// images
gulp.task('images', function () {
  return gulp.src(config.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest + '/images'));
});

// assemble
gulp.task('assemble', function (done) {
  assemble({
    logErrors: config.dev,
    layouts: ['src/styleguide/views/layouts/*'],
    layoutIncludes: ['src/styleguide/views/layouts/includes/*'],
    views: ['src/styleguide/views/**/*', '!src/styleguide/views/+(layouts)/**'],
    materials: ['src/styleguide/materials/**/*'],
    data: ['src/styleguide/data/**/*.{json,yml}'],
    docs: ['src/styleguide/docs/**/*.md'],
    dest: config.dest
  });
  done();
});

// server
gulp.task('serve', function () {

  browserSync({
    server: {
      baseDir: config.dest
    },
    //notify: false,
    logPrefix: 'FABRICATOR'
  });

  /**
   * Because webpackCompiler.watch() isn't being used
   * manually remove the changed file path from the cache
   */
  function webpackCache(e) {
    var keys = Object.keys(webpackConfig.cache);
    var key, matchedKey;
    for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      key = keys[keyIndex];
      if (key.indexOf(e.path) !== -1) {
        matchedKey = key;
        break;
      }
    }
    if (matchedKey) {
      delete webpackConfig.cache[matchedKey];
    }
  }

  gulp.task('assemble:watch', ['assemble'], reload);
  gulp.watch('src/styleguide/**/*.{html,md,json,yml}', ['assemble:watch']);

  gulp.task('styles:fabricator:watch', ['styles:fabricator']);
  gulp.watch('src/styleguide/fabricator/styles/**/*.scss', ['styles:fabricator:watch']);

  gulp.task('styles:trestle:watch', ['styles:trestle']);
  gulp.watch('src/sass/**/*.scss', ['styles:trestle:watch']);

  gulp.task('scripts:watch', ['scripts'], reload);
  gulp.watch('src/styleguide/fabricator/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);
  gulp.watch('src/js/**/*.js', ['scripts:watch']).on('change', webpackCache);

  gulp.task('images:watch', ['images'], reload);
  gulp.watch(config.src.images, ['images:watch']);
});


// default build task
gulp.task('default', ['clean'], function () {

  // define build tasks
  var tasks = [
    'styles',
    'scripts',
    'images',
    'assemble'
  ];

  // run build
  runSequence(tasks, function () {
    if (config.dev) {
      gulp.start('serve');
    }
  });

});
