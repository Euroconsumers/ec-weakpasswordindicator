 const
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create(),
    gulp            = require('gulp'),
    gulpif          = require('gulp-if'),
    moduleImporter  = require('sass-module-importer'),
    plumber         = require('gulp-plumber'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),

    { paths }       = require('../config'),
    { ENV_DEV } = require('../envs')

module.exports = gulp.task('styles', () => {
    return gulp.src(paths.styles.entry)
    .pipe(plumber())
    .pipe(gulpif(ENV_DEV, sourcemaps.init()))
    .pipe(sass({
        importer:        moduleImporter(),
        errLogToConsole: true,
        precision:       2,
        outputStyle:     'compressed'
    }))
    .pipe(autoprefixer({
        browsers: ['last 45 versions'],
        cascade: false
    }))
    .pipe(gulpif(ENV_DEV, sourcemaps.write('./')))
    .pipe(gulp.dest(paths.styles.dst))
    .pipe(gulpif(ENV_DEV, gulp.dest(paths.styles.local)))
    .pipe(gulpif(ENV_DEV, browserSync.reload({ stream: true })));
});
