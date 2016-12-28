var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', [build, serve]);
gulp.task('build', [buildHTML, buildCSS, buildJS]);
gulp.task('serve', [startServer, watchFiles]);
gulp.task('buildHTML', [clearDist, copyPublic, compileHandlebars, compileSitemap]);
gulp.task('buildCSS', [clearDist, copyPublic, compileHandlebars, compileSitemap]);
gulp.task('buildJS', [concat]);

gulp.task('build-html', function() {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
});

gulp.task('sass', function() {
  return gulp.src('src/scss/imports.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('dist/assets/css/'))
});
