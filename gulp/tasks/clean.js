const
        gulp        = require('gulp'),
        clean       = require('gulp-clean'),

        { paths } = require('../config')

module.exports = gulp.task('clean', () => {
    return gulp.src([paths.dstDir, paths.localDir], { read: false })
        .pipe(clean({ force: true }))
})