var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver'),
  sass = require('gulp-sass'),
  uncss = require('gulp-uncss'),
  concat = require('gulp-concat'),
  csso = require('gulp-csso');

gulp.task('js', function() {
  gulp.src('builds/development/js/**/*')
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
});

gulp.task('sass', function () {
    gulp.src('builds/development/sass/*.scss')
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('builds/development/css/'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/js/**/*', ['js']);
  gulp.watch('builds/development/sass/*.scss', ['sass']);
  gulp.watch(['builds/development/*.html',
    'builds/development/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/development/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'sass', 'webserver']);
