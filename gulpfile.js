// WORK IN PROGRESS, USE GRUNT INSTEAD

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  watch = require('gulp-watch'),
  minifyCSS = require('gulp-minify-css'),
  runSequence = require('run-sequence');

var appSrc = [
  'app-modules/lodash/*.module.js',
  'app-modules/momentjs/*.module.js',
  'app-modules/stringjs/*.module.js',
  'app-modules/mongodb/*.module.js',
  'app-modules/infrastructure/*.module.js',
  'app-modules/auth/*.module.js',
  'app-modules/bootstrap-widgets/*.module.js',
  'app-modules/**/*.js',
  'app-modules/**/**/*.js',
  'app/features/**/*.module.js',
  'app/features/**/*.js',
  'app/app.module.js',
  'app/*.js',
  'app/**/*.module.js',
  'app/**/*.js',
  'app/**/**/*.js',
  'app/**/**/**/*.js'];

var vendorScriptsSrc = [
  'bower/jquery/dist/jquery.min.js',
  'bower/lodash/dist/lodash.min.js',
  'bower/momentjs/min/moment.min.js',
  'bower/stringjs/lib/string.min.js',
  'bower/bootstrap/dist/js/bootstrap.min.js',
  'bower/angular/angular.js',
  'bower/angular-i18n/angular-locale_en-gb.js',
  'bower/angular-animate/angular-animate.min.js',
  'bower/angular-cookies/angular-cookies.min.js',
  'bower/angular-resource/angular-resource.min.js',
  'bower/angular-ui-utils/ui-utils.min.js',
  'bower/angular-ui-router/release/angular-ui-router.min.js',
  'bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'bower/greensock/src/minified/TweenMax.min.js',
  'bower/ng-Fx/dist/ngFx.min.js',
  'bower/angular-loading-bar/build/loading-bar.min.js',
  'bower/angular-hotkeys/build/hotkeys.min.js',
  'bower/angular-local-storage/dist/angular-local-storage.min.js',
  'bower/select2/select2.min.js',
  'bower/angular-ui-select2/src/select2.js',
  'bower/angular-block-ui/dist/angular-block-ui.min.js',
  'bower/angular-toastr/dist/angular-toastr.min.js'
];

var vendorCssSrc = [
  'bower/animate.css/animate.min.css',
  'bower/angular-hotkeys/build/hotkeys.min.css',
  'bower/angular-loading-bar/build/loading-bar.min.css',
  'bower/bootstrap/less/bootstrap.css',
  'bower/font-awesome/less/font-awesome.css',
  'bower/select2/select2.css',
  'bower/select2-bootstrap3-css/select2-bootstrap.css',
  'bower/angular-ui-select2/docs/styles.css',
  'bower/angular-block-ui/dist/angular-block-ui.min.css',
  'bower/angular-toastr/dist/angular-toastr.min.css'
];


gulp.task('app-scripts', function () {
  gulp.src(appSrc)
    .pipe(concat('app.js', {newline: ';'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('vendor-scripts', function () {
  gulp.src(vendorScriptsSrc)
    .pipe(concat('vendor.js', {newline: ';'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.tasks('vendor-css', function () {
  return gulp.src(vendorCssSrc)
    .pipe(concat('vendor.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/styles/vendor'));
});

gulp.task('css-min', function () {
  return gulp.src(cssSrc)
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('styles', function (callback) {
  runSequence(
    'less-build', 'css-min',
    callback);
});

gulp.task('default', [], function () {
  gulp.watch(vendorCssSrc, ['styles']);
  gulp.watch(appSrc, ['app-scripts']);
  gulp.watch(vendorScriptsSrc, ['vendor-scripts']);
});




