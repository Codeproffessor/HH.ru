'use strict';

// connections
var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

// paths
var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        vendor: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        vendor: 'src/js/vendor/vendor.js',
        style: 'src/scss/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/*.js',
        vendor: 'src/js/vendor/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

// configs
var config = {
    server: {
        baseDir: "./build"
    },
    //tunnel: true,
    host: 'localhost',
    port: 3000
};

//build

function html(){
    return gulp
        .src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
}

function vendor(){
    return gulp
        .src(path.src.vendor)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.vendor))
        .pipe(browserSync.stream());
}

function js(){
    return gulp
        .src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
}

function css(){
    return gulp
        .src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
}

function img(){
    return gulp
        .src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.stream());
}

function fonts(){
    return gulp
        .src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
}

gulp.task('build', gulp.parallel(html, vendor, js, css, fonts, img));


//watch
gulp.task('watch', function(){
    gulp.watch(path.watch.html,html);
    gulp.watch(path.watch.style, css);
    gulp.watch(path.watch.vendor, vendor);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, img);
    gulp.watch(path.watch.fonts, fonts);
});


gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));