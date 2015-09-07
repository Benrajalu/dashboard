var gulp = require('gulp');
//var watch = require('gulp-watch');
var compass = require('gulp-compass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var liveReload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

//scripts
gulp.task("scripts", function() {
	return gulp.src('js/**/*.js')
		.pipe(debug({title: 'scripts:'}))
		.pipe(plumber())
		.pipe(browserSync.stream());
});
gulp.task("frags", function() {
	return gulp.src('elements/**/*.js')
		.pipe(debug({title: 'frags:'}))
		.pipe(plumber())
		.pipe(browserSync.stream());
});

//styles
gulp.task("styles", function(cb) {
	return gulp.src('scss/**/*.scss')
		.pipe(debug({title: 'styles:'}))
		.pipe(plumber())
		.pipe(compass({
			config_file: './config.rb',
			css: 'css',
			sass: 'scss',
		})).on('error', cb)
		.pipe(browserSync.stream());
});

//images
gulp.task("images", function() {
	return gulp.src('img/**/*.{jpg,jpeg,png,gif}')
		.pipe(debug({title: 'image:'}))
		.pipe(plumber())
		.pipe(browserSync.stream());
});

// Server
gulp.task('serve', ['scripts', 'styles'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("js/**/*.js", ['scripts']);
    gulp.watch("elements/**/*.js", ['frags']);
    gulp.watch("scss/**/*.scss", ['styles']);
    gulp.watch("img/**/*.{jpg,jpeg,png,gif}", ['images']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});


gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages());
});

