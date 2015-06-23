'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso');
    
var bc = './bower_components/';

gulp.task('js', function() {
  gulp.src('builds/development/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('builds/dist/app/'))
});

gulp.task('html', function() {
  gulp.src('builds/development/**/*.html')
    .pipe(gulp.dest('builds/dist/'))
});

gulp.task('sass', function () {
  gulp.src('builds/development/sass/**/*')
      .pipe(sass())
      .pipe(concat('style.min.css'))
      .pipe(csso())
      .pipe(gulp.dest('builds/dist/css/'));
});

gulp.task('img', function() {
  gulp.src('builds/development/img/**/*')
    .pipe(gulp.dest('builds/dist/img/'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/app/**/*.js', ['js']);
  gulp.watch('builds/development/sass/**/*.scss', ['sass']);
  gulp.watch('builds/development/**/*.html', ['html']);
  gulp.watch('builds/development/img/**/*', ['img']);
  gulp.watch('builds/development/fonts/**/*', ['fonts']);
});

gulp.task('libs', function() {
  gulp.src(bc+'jquery/dist/jquery.js')
      .pipe(gulp.dest('./builds/dist/libs/jquery/'));

  gulp.src(bc+'bootstrap/dist/js/')
      .pipe(gulp.dest('./builds/dist/libs/bootstrap/'));

});

gulp.task('fonts', function() {
  gulp.src('builds/development/fonts/**/*')
      .pipe(gulp.dest('./builds/dist/fonts/'));
  gulp.src(bc+'bootstrap/dist/fonts/')
      .pipe(gulp.dest('./builds/dist/fonts/'));
});

gulp.task('webserver', function() {
  gulp.src('builds/dist/')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('default', [
  'libs',
  'fonts',
  'html',
  'img',
  'js',
  'sass',
  'webserver',
  'watch'
]);
