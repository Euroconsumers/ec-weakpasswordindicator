const
    browserSync     = require('browser-sync').create(),
    gulp            = require('gulp'),
    path            = require('path'),

    { paths }       = require('../config')

module.exports = gulp.task('server', () => {
    browserSync.init(path.join(paths.localDir, '**', '*.*'), {
        server: {
            baseDir: paths.localDir,
            index: 'ec-weakpasswordindicator.html',
            serveStaticOptions: {
                extensions: ['html']
            },
            directory: true
        },
        port:   8080,
        notify: true
    });
});