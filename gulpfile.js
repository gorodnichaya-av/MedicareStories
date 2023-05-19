const gulp = require("gulp");
const plumber = require('gulp-plumber');
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const del = require('del');
const browserSync = require("browser-sync").create();

sass.compiler = require('node-sass')

function style() {
  return gulp.src('./scss/**/**.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
    .pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(cleanCSS({ level: 2 }))
    //.pipe(concat('style.css'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream())
}

function script() {
  return pipeline(
    gulp.src('./js/**/**.js'),
    //uglify({ toplevel: true }),
    uglify(),
    gulp.dest('./dist/js')
  );
}

function clean() {
  return del(["dist/*"]);
}

function buildHtml() {
  return gulp.src('./*.html')
    .pipe(plumber())
    .pipe(gulp.dest('./dist'))
}

function buildCss() {
  return gulp.src('./css/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/css'))
}

function buildJs() {
  return gulp.src('./js/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/js'))
}

function buildImg() {
  return gulp.src('./images/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/images'))
}

function buildFonts() {
  return gulp.src('./fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/fonts'))
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./scss/**/**.scss', style)
  gulp.watch('./*.html').on('change', browserSync.reload)
  gulp.watch('./js/**/*.js').on('change', browserSync.reload)
}

exports.style = style
exports.script = script
exports.clean = clean
exports.watch = watch
exports.build = gulp.series(buildHtml, buildCss, buildJs, buildImg, buildFonts)