'use strict';

/**
 * MODULES
 */
const gulp = require('gulp');
const log = require('fancy-log');
const del = require('del');
const gulpif = require('gulp-if');
const path = require('path');
const glob = require('glob');
const merge = require('merge-stream');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const assemble = require('fabricator-assemble');

const browserSync = require('browser-sync');
const reload = browserSync.reload;

const csso = require('gulp-csso');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const prefix = require('gulp-autoprefixer');

const imagemin = require('gulp-imagemin');

const svgSprite = require('gulp-svg-sprite');

const environment = process.env.NODE_ENV || 'development';

const nopack = process.argv.indexOf('--nopack') > -1;


/**
 * A function to glob entry points to achieve separate output files
 * @param globs
 * @returns {{}}
 */
const glob_entries = function (globs) {
  const entries = {};
  Object.keys(globs).forEach(function (key) {
    const globPath = globs[key];
    const files = glob.sync(globPath);

    for (let i = 0; i < files.length; i++) {
      const entry = files[i];
      entries[key + '/' + path.basename(entry, path.extname(entry))] = entry;
    }
  });
  return entries;
};

/**
 * CONFIGURATION
 */
// gulp
const config = {
  dev: environment !== 'production',
  src: {
    scripts: {
      'js': './src/js/*.js',
      'fabricator/js': './src/styleguide/fabricator/scripts/fabricator.js'
    },
    styles: {
      fabricator: './src/styleguide/fabricator/styles/fabricator.scss',
      chief: './src/sass/**/*.scss'
    },
    images: './src/images/**/*',
    svg: './src/svg/*.svg',
    fonts: './src/fonts/**/*'
  },
  dest: 'dist'
};

config.src.scripts_webpack = glob_entries(config.src.scripts);

// webpack
const webpackConfig = require('./webpack.config')(config);
const webpackStats = {
  entrypoints: false,
  assets: false,
  chunks: false,
  chunkModules: false,
  colors: true,
  hash: false,
  timings: false,
  version: false
};

/**
 * TASKS
 */
// clean
gulp.task('clean', function () {
  return del([config.dest]);
});

// styles
gulp.task('styles:fabricator', function () {
  return gulp.src(config.src.styles.fabricator)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      grid: false
    }))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest + '/fabricator/css'))
    .pipe(gulpif(config.dev, reload({stream: true})));
});

// Compile sass
gulp.task('styles:chief', function () {
  return gulp.src(config.src.styles.chief)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        'node_modules/breakpoint-sass/stylesheets',
        'node_modules/standardize-sass/stylesheet'
      ]
    }).on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      grid: false
    }))
    .pipe(gulpif(!config.dev, csso()))
    .pipe(gulpif(config.dev, sourcemaps.write()))
    .pipe(gulp.dest(config.dest + '/css'))
    .pipe(gulpif(config.dev, reload({stream: true})));
});

gulp.task('styles', gulp.parallel(['styles:fabricator', 'styles:chief']));

// scripts
gulp.task('scripts', function (done) {
  if (nopack) {
    const pipes = [];
    const dests = Object.keys(config.src.scripts);
    for (let i = 0; i < dests.length; i++) {
      const dest = dests[i];
      // We want to copy every file in the event that a specific file requires another
      // in the same directory. So we replace the single file with **/*.js in order to copy
      // ALL files AND directories
      const entry = config.src.scripts[dest].replace(/\/[^\/]*\.js$/g, '/**/*.js');
      const pipe = gulp.src(entry)
        .pipe(babel({ "presets": ["@babel/preset-env"] }))
        .pipe(gulpif(!config.dev, minify({
          ext: {
            min: '.js'
          },
          noSource: true
        })))
        .pipe(gulp.dest(config.dest + '/' + dest));
      pipes.push(pipe);
    }
    return merge(pipes);
  } else {
    gulp.src(Object.values(config.src.scripts))
      .pipe(webpackStream(
        webpackConfig,
        webpack,
        function (error, stats) {
          if (error) log.error(error);
          console.log(stats.toString(webpackStats));
          done();
        }
      ))
      .pipe(gulp.dest(config.dest));
  }
});

// images
gulp.task('images', function () {
  return gulp.src(config.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest + '/images'));
});

// generates an svg stack file
// for full configuration options see https://github.com/jkphl/svg-sprite/blob/master/docs/configuration.md
gulp.task('svg', function () {
  return gulp.src(config.src.svg)
    .pipe(svgSprite({
      dest: '.',
      shape: {
        dimension: {
          maxWidth: 32, // scale down to 32 if larger
          maxHeight: 32
        }
      },
      mode: {
        stack: {
          dest: 'svg',
          sprite: 'svg-stack'
        }
      }
    }))
    .pipe(gulp.dest(config.dest));
});

// fonts
gulp.task('fonts', function () {
  return gulp.src(config.src.fonts)
    .pipe(gulp.dest(config.dest + '/fonts'));
});

// assemble
gulp.task('assemble', function (done) {
  assemble({
    layout: 'default',
    layouts: ['src/styleguide/fabricator/templates/*'],
    layoutIncludes: ['src/styleguide/fabricator/templates/includes/*'],
    views: ['src/styleguide/fabricator/templates/layouts/*', 'src/styleguide/materials/pages/*'],
    materials: ['src/styleguide/materials/**/*', '!src/styleguide/materials/+(pages)/**'],
    data: ['src/styleguide/data/**/*.{json,yml}'],
    docs: ['src/styleguide/docs/**/*.md'],
    keys: {
      materials: 'materials',
      views: 'layouts',
      docs: 'docs'
    },
    logErrors: config.dev,
    dest: config.dest
  });
  done();
});

// server
gulp.task('watch', function (done) {
  if (config.dev) {

    const browserSyncOpts = {
      // Uncomment lines below to work from multiple browsers
      // browser: ['google chrome', 'firefox', 'safari'],

      logPrefix: 'CHIEF'
    };

    if (environment === 'standalone') {
      // Work directly with the styleguide prototyping engine
      browserSyncOpts.server = {
        baseDir: config.dest
      };
    } else {
      // Add your vhost as the proxy for local development
      // Avoid using .local address because it's super slow to load
      // Disable caching from your browser to see the display update
      // Uncomment line below to work on your site install
      // browserSyncOpts.proxy = 'toolkit.dev';
    }

    browserSync(browserSyncOpts);

    // watch commands
    gulp.watch('src/styleguide/**/*.{html,md,json,yml}', gulp.parallel('assemble')).on('change', reload);
    gulp.watch('src/styleguide/fabricator/styles/**/*.scss', gulp.parallel('styles:fabricator'));
    gulp.watch('src/sass/**/*.scss', gulp.parallel('styles:chief'));

    gulp.src(Object.values(config.src.scripts))
      .pipe(webpackStream(
        Object.assign({ watch: true }, webpackConfig),
        webpack,
        function (error, stats) {
          if (error) log.error(error);
          console.log(stats.toString(webpackStats));
          reload();
        }
      ))
      .pipe(gulp.dest(config.dest));

    gulp.watch(config.src.images, gulp.parallel('images')).on('change', reload);
    gulp.watch(config.src.fonts, gulp.parallel('fonts')).on('change', reload);

  }

  done();
});

// define build tasks
const tasks = [
  'svg',
  'styles',
  'scripts',
  'images',
  'fonts',
  'assemble',
  'watch'
];

// default build task
gulp.task('default', gulp.series('clean', gulp.series(tasks)));
