const
    gulp        = require('gulp'),
    gulpIf      = require('gulp-if'),

    { paths }   = require('../config'),
    { ENV_DEV } = require('../envs')

gulp.task('html', () => {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dst))
        .pipe(gulpIf(ENV_DEV, gulp.dest(paths.html.local)))
})

gulp.task('vendor', () => {
    return gulp.src(paths.vendor.src)
        .pipe(gulp.dest(paths.vendor.dst))
})

module.exports = gulp.task('static', ENV_DEV ? ['html', 'vendor'] : ['html'])