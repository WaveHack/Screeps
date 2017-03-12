'use strict';

const clean = require('gulp-clean')
    , dotFlatten = require('gulp-dot-flatten')
    , gulp = require('gulp')
    , gutil = require('gulp-util')
    , screeps = require('gulp-screeps')
    , ts = require('gulp-typescript')
    , tslint = require('gulp-tslint');

const tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')});
const config = require('./config.json');

gulp.task('lint', () => {
    return gulp.src('./src/**/*.ts')
        .pipe(tslint({formatter: 'prose'}))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('clean', () => {
    return gulp.src(['./build', './dist'], {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean'], () => {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest('./build'));
});

gulp.task('dist', ['build'], () => {
    return gulp.src('./build/**/*.js')
        .pipe(dotFlatten({
            stringFilter: (str) => str.toLowerCase()
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('upload', ['dist'], () => {
    return gulp.src('./dist/*.js')
        .pipe(screeps(config));
});

gulp.task('watch', () => {
    gutil.log(gutil.colors.green('Watcher started'));
    // todo
});

gulp.task('test', ['lint']);
gulp.task('default', ['watch']);
