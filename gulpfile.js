// Documentation
// https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
// https://github.com/gulpjs/gulp/blob/master/docs/API.md

'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del'); // rm -rf
var cleanCSS = require('gulp-clean-css');

var paths = {
  public: ['src/public/**/*'],
  templates: ['src/templates/**/*.hbs', 'src/templates/**/*.html'],
  scss: ['src/styles/**/*.scss'],
  js: ['src/js/**/*.js'],
};

// Watch all the files and run specific tasks if one changes
gulp.task('watch', function() {
  gulp.watch(paths.public, ['public']);
  gulp.watch(paths.hbs, ['hbs']);
  gulp.watch(paths.scss, ['scss']);
  gulp.watch(paths.js, ['js']);
});

// Delete the dist folder
gulp.task('delete-dist', function() {
  return del(['dist']);
});

// Copy over the files in the public folder "as they are" to the dist folder
gulp.task('copy-public', ['delete-dist'], function() {
  return gulp.src('src/public/**/*')
    .pipe(gulp.dest('dist/'));
});

// Compile all HTML to dist folder
gulp.task('compile-html', ['delete-dist'], function() {});

// Compile all CSS to dist folder
gulp.task('compile-css', ['delete-dist'], function() {
  return gulp.src('src/styles/imports.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 1% in AU', 'Explorer > 9', 'Firefox >= 17', 'Chrome >= 10', 'Safari >= 6', 'iOS >= 6'],
      cascade: false
    }))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('dist/assets/css'))
});

// Minify the CSS file
gulp.task('minify-css', ['compile-css'], function() {
  return gulp.src('dist/assets/css/styles.css')
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist/assets/css'));
});

// Compile all JS to dist folder
gulp.task('compile-js', ['delete-dist'], function() {});

// Define all available gulp tasks
gulp.task('build', ['delete-dist', 'copy-public', 'compile-html', 'compile-css', 'minify-css', 'compile-js']);
