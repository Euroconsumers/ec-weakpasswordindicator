const
    gulp            = require('gulp'),
    //liveServer      = require('gulp-live-server'),
    mocha           = require('gulp-mocha'),
    sequence        = require('gulp-sequence'),

    { paths }       = require('../config'),
    package         = require('../../package.json'),
    { ENV_DEV }     = require('../envs')


const mochaLocalConfig = {
    reporter: 'mochawesome',
        reporterOptions: {
            reportDir: paths.test.output,
            reportFilename: package.name,
            autoOpen: true
        }
}

module.exports = gulp.task('test', () => {
    return gulp.src(paths.test.src)
        .pipe(mocha(ENV_DEV && mochaLocalConfig))
        .once('error', () => {
			process.exit(1);
		})
		.once('end', () => {
			process.exit();
		})
});
