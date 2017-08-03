const
    babel           = require('gulp-babel'),
    babelify        = require('babelify'),
    browserify      = require('browserify'),
    browserSync     = require('browser-sync').create(),
    buffer          = require('vinyl-buffer'),
    gulp            = require('gulp'),
    gulpif          = require('gulp-if'),
    gutil           = require('gulp-util'),
    path            = require('path'),
    source          = require('vinyl-source-stream'),
    sourcemaps      = require('gulp-sourcemaps'),
    uglify          = require('gulp-uglify'),
    
    { paths, pkgname }       = require('../config'),
    { ENV_DEV } = require('../envs')


gulp.task('libs-scripts', () => {
    // Not using buffer and source stream, because don't need
    return gulp.src(paths.libs.src)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.libs.dst))
    .pipe(gulpif(ENV_DEV, gulp.dest(paths.libs.local)))
})


gulp.task('source-scripts', () => {
    return browserify({
        entries: path.join(paths.js.entry),
        debug:   true
    })
    .transform(babelify, {
        presets: ['es2015']
    })
    .bundle()
    .pipe(source(`${pkgname}.js`))
    .pipe(buffer())
    .pipe(gulpif(ENV_DEV, sourcemaps.init({ loadMaps: true})))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulpif(ENV_DEV, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.js.dst))
    .pipe(gulpif(ENV_DEV, gulp.dest(paths.js.local)))
    .pipe(gulpif(ENV_DEV, browserSync.reload({ stream: true })))
})

module.exports = gulp.task('scripts', ['libs-scripts', 'source-scripts'])
