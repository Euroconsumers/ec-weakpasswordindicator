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

gulp.task('dependencies', () => {
    return gulp.src(paths.dependencies.src)
        .pipe(gulp.dest(paths.dependencies.dst))
        .pipe(gulpIf(ENV_DEV, gulp.dest(paths.dependencies.local)))
})

module.exports = gulp.task('static', ['html', 'dependencies'])