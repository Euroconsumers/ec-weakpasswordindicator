const
    gulp            = require('gulp'),
    mocha           = require('gulp-mocha'),

    { paths }        = require('../config'),
    package         = require('../../package.json'),
    { ENV_DEV }     = require('../envs')

module.exports = gulp.task('test', () => {
    return gulp.src(paths.test.src)
        .pipe(mocha({
            reporter: 'mochawesome',
            reporterOptions: {
                reportDir: paths.test.output,
                reportFilename: package.name,
                autoOpen: true
            }
        }))
        .once('error', () => {
			process.exit(1);
		})
		.once('end', () => {
			process.exit();
		})

});

