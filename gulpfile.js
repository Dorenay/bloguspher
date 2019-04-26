'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const livereload = require('gulp-livereload');
sass.compiler = require('node-sass');

const dir={
    sass: './src/sass/application.scss',
    css: './css',
    srcjs: './src/js/**/*.js',
    js: './js'
}
 
gulp.task('js', () =>
    gulp.src(dir.srcjs)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dir.js))
);
 
gulp.task('sass', function () {
    return gulp.src(dir.sass)
     .pipe(sourcemaps.init())
     .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
     .pipe(sourcemaps.write(''))
     .pipe(gulp.dest(dir.css));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series(['sass', 'js', 'watch']));