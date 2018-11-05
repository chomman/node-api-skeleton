'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const shell = require('gulp-shell');

const outDir = './build';
/**
 * Remove build directory.
 */
gulp.task('clean', function () {
  return gulp.src(outDir, { read: false })
    .pipe(rimraf());
});

/**
 * Compile Typescript to javascript
 */
gulp.task('compile', shell.task([
  'npm run tsc',
]));

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', shell.task([
  'npm run tsc-watch',
]));

/**
 * Copy config files
 */
gulp.task('configs', (cb) => {
  return gulp.src("src/configs/*.json")
    .pipe(gulp.dest('./build/configs'));
});

/**
 * Build the project.
 */
gulp.task('build', ['compile', 'configs'], () => {
  console.log('Building the project ...');
});

gulp.task('default', ['build']);