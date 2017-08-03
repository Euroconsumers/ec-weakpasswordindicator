const
    gulp            = require('gulp'),
    gulpSequence    = require('gulp-sequence')


gulp.task('pre-build', ['clean', 'server', 'watch'])

gulp.task('build', gulpSequence('pre-build', ['static', 'scripts', 'styles', 'examples']))
