const
    gulp        = require('gulp'),

    { paths }   = require('../config')

module.exports = gulp.task('watch', () => {
    gulp.watch([paths.js.src], ['scripts'])
    gulp.watch([paths.styles.src], ['styles'])
    gulp.watch([paths.html.src, paths.vendor.src], ['static'])
    gulp.watch([paths.examples.src], ['examples'])
})