/* jshint esversion: 6 */

/**
 * Penrose Gulpfile v0.0.0
 * Here are the tasks to deploy and develop Enigma's website project
 * If you don't know where to begin, check our readme @see {@file README.md}
 * @see {@link http://gulpjs.com/}
 */
const gulp = require('gulp'),
      gutil = require('gulp-util'),
      stylus = require('gulp-stylus'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      imagemin = require('gulp-imagemin'),
      clean = require('gulp-clean');

/**
 * ===============================
 * ===== Deploy default task =====
 * ===============================
 **/
gulp.task('default', ['cssnano', 'clone-img'], () =>
  gutil.log(`Deployment proccess ended! Everything you need was builted, enjoy!`)
);

/**
 * ===============================
 * ==== CSS build and minify =====
 * ===============================
 **/

  /**
   * Task: build-styl
   * Compile styl file to CSS
   * Works with gulp-stylus package
   * @see {@link https://www.npmjs.com/package/gulp-stylus}
   **/
  gulp.task('build-styl', () =>
    gulp.src('./src/styles/penrose.styl')
      .pipe(stylus())
      .pipe(gulp.dest('./dist/css'))
  );

  /**
   * Task: autoprefixer
   * Include cross-browser compatibility prefixers
   * Works with gulp-autoprefixer package
   * @see {@link https://www.npmjs.com/package/gulp-autoprefixer}
   **/
  gulp.task('autoprefixer', ['build-styl'], () =>
    gulp.src('./dist/css/penrose.css')
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'last 5 Safari versions', 'ie >= 8'],
        cascade: false
      }))
      .pipe(gulp.dest('./dist/css'))
  );

  /**
   * Task: cssnano
   * Compress stylesheet to max performance
   * Works with cssnano package
   * @see {@link http://cssnano.co/}
   * @see {@link https://www.npmjs.com/package/gulp-cssnano}
   **/
  gulp.task('cssnano', ['autoprefixer'], () =>
    gulp.src('./dist/css/penrose.css')
      .pipe(cssnano())
      .pipe(gulp.dest('./dist/css'))
  );

  /**
   * Task: watcher
   * Include cross-browser compatibility prefixers
   **/
  gulp.task('watcher', () =>
    gulp.watch('./src/styles/penrose.styl', ['cssnano'])
  );

/**
 * ===============================
 * == Image compression routine ==
 * ===============================
 **/

  /**
   * Task: erase-img
   * Clear images on dist folder
   * Works witg gulp-clean package
   * @see {@link https://www.npmjs.com/package/gulp-clean}
   **/
  gulp.task('erase-img', () =>
    gulp.src('./dist/img/**.*', {read: false})
      .pipe(clean())
  );

  /**
   * Task: clone-img
   * Compress and copy images files on src to dit folder
   * Works with gulp-imagemin package
   * @see {@link https://www.npmjs.com/package/gulp-imagemin}
   **/
  gulp.task('clone-img', ['erase-img'], () =>
    gulp.src('./src/img/**.*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/img/'))
  );
