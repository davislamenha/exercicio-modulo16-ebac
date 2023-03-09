const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

function compilarSass() {
  return gulp
    .src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

function comprimirImg() {
  return gulp
    .src('./source/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'));
}

function compilarJs() {
  return gulp
    .src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

exports.default = function () {
  gulp.watch(
    './source/styles/*.scss',
    { ignoreInitial: false },
    gulp.series(compilarSass),
  );
  gulp.watch(
    './source/img/*',
    { ignoreInitial: false },
    gulp.series(comprimirImg),
  );
  gulp.watch(
    './source/scripts/*.js',
    { ignoreInitial: false },
    gulp.series(compilarJs),
  );
};
