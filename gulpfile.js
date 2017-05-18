var gulp       = require('gulp');
var compiler   = require('google-closure-compiler-js').gulp();

/**
 * Build task for outputting production-ready files.
 */
gulp.task( 'build', function() {
	return gulp.src('./responsive-menus.js')
		.pipe(compiler({
			languageIn: 'ES5',
			compilationLevel: 'SIMPLE',
			warningLevel: 'DEFAULT',
			jsOutputFile: 'responsive-menus.min.js',
			createSourceMap: true,
		}))
		.pipe(gulp.dest('./dist/'));
});
