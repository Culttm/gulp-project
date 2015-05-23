var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    gulpCopy = require('gulp-copy');

gulp.task('js', function() {
  gulp.src('builds/development/js/**/*')
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
});

gulp.task('sass', function () {
    gulp.src('builds/development/sass/**/*')
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('builds/development/css/'));
});

gulp.task('watch', function() {
  gulp.watch('builds/development/js/**/*', ['js']);
  gulp.watch('builds/development/sass/**/*', ['sass']);
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

gulp.task('copyfonts', function() {
   gulp.src('./node_modules/bootstrap/fonts/**/*.{ttf,woff,woff2,eot,svg}')
   .pipe(gulp.dest('./builds/development/fonts'));
});

gulp.task('copyjquery', function() {
   gulp.src('./node_modules/jquery/dist/jquery.js')
   .pipe(gulp.dest('./builds/development/js/lib/jquery/'));
});

gulp.task('copybootstrap', function() {
   gulp.src('.//node_modules/bootstrap/dist/js/bootstrap.js')
   .pipe(gulp.dest('./builds/development/js/lib/bootstrap/'));
});


gulp.task('default', ['copyfonts', 'copyjquery', 'copybootstrap', 'watch', 'html', 'js', 'sass', 'webserver']);
