// jshint asi: true
var gulp          = require('gulp')                         // the main guy
var clone         = require('gulp-clone')                   // used to fork a stream
var order         = require('gulp-order')                   // reorder files in stream
var watch         = require('gulp-watch')                   // run tasks on file change
var uglify        = require('gulp-uglify')                  // minify js
var rename        = require('gulp-rename')                  // rename file
var concat        = require('gulp-concat')                  // merge files together
var notify        = require('gulp-notify')                  // OS-level notifications
var stylus        = require('gulp-stylus')                  // turn stylus code into css
var addsrc        = require('gulp-add-src')                 // mid-stream gulp.src()
var plumber       = require('gulp-plumber')                 // handle errors without crashing
var sourcemap     = require('gulp-sourcemaps')              // write sourcemaps
var minifycss     = require('gulp-minify-css')              // minify css code
var annotate      = require('gulp-ng-annotate')             // safely minify angular
var beautify      = require('gulp-cssbeautify')             // make files human readable
var autoprefix    = require('gulp-autoprefixer')            // prefix any css with low support
var tplcache      = require('gulp-angular-templatecache')   // cache angular template files
var combinemq     = require('gulp-combine-media-queries')   // move all media queries to the end

var paths = {
	stylus: {
		watch: ['admin/assets/styl/*.styl', 'admin/assets/styl/**/*.styl'],
		main: 'admin/assets/styl/style.styl'
	},
	angular: {
		files: ['admin/app/*.js', 'admin/app/**/*.js'],
		watch: ['admin/app/*.js', 'admin/app/**/*.js', 'admin/app/**/*.html'],
		views: 'admin/app/**/*.html'
	},
	libs: [
		'components/jquery/dist/jquery.min.js',
		'components/angular/angular.min.js',
		'components/angular-route/angular-route.min.js',
		'components/angular-resource/angular-resource.min.js',
		'components/angular-sanitize/angular-sanitize.min.js',
		'components/lodash/lodash.min.js',
		'components/marked/lib/marked.min.js',
		'components/angular-marked/dist/angular-marked.min.js',
		'components/angular-timeago/dist/angular-timeago.min.js'
	],
	output: 'admin/assets/dist/'
}

var settings = {
	plumber: {
		errorHandler: notify.onError("Error: <%= error.message %>")
	},
	tpl: {
		module: 'app.views'
	}
}

gulp.task('angular', function() {
	var stream = gulp.src(paths.angular.views)              // grab all the html views
		.pipe(plumber(settings.plumber))                    // stop any errors from breaking a watch
		.pipe(tplcache('views.js', settings.tpl))           // make a template cache from them
		.pipe(addsrc(paths.angular.files))                  // add the rest of the angular app
		.pipe(order(['app.js']))                            // make sure app.js is first
		.pipe(annotate())                                   // make angular callbacks minifyable
		.pipe(uglify())                                     // minify the code
		.pipe(concat('app.min.js'))                         // merge them all into the same file
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
		
	return stream
})

gulp.task('libs', function() {
	var stream = gulp.src(paths.libs)                       // grab all the libs
		.pipe(concat('libs.min.js'))                        // merge them all into the same file
		.pipe(uglify())                                     // minify the code
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	return stream
})

gulp.task('stylus', function(){
	// prepare css code
	var stream = gulp.src(paths.stylus.main)                // grab our stylus file
		.pipe(plumber(settings.plumber))                    // notify us if any errors appear
		.pipe(sourcemap.init())                             // get ready to write a sourcemap
		.pipe(stylus())                                     // turn the stylus into css
	//	.pipe(combinemq())                                  // put all the media queries at the bottom
		.pipe(sourcemap.write())                            // write the sourcemap
		.pipe(autoprefix('last 2 versions'))                // autoprefix the css code
	
	// make style.css
	stream.pipe(clone())                                    // make a copy of the stream up to autoprefix
		.pipe(beautify())                                   // make css really readable
		.pipe(rename('style.css'))                          // make the filename style.css
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	// make style.min.css
	stream.pipe(clone())                                    // make a copy of the stream up to autoprefix
		.pipe(minifycss())                                  // minify it (removes the sourcemap)
		.pipe(sourcemap.write())                            // write the sourcemap
		.pipe(rename('style.min.css'))                      // make the filename style.min.css
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	return stream
})

gulp.task('watch', ['angular', 'stylus'], function() {
	watch(paths.angular.watch, function() {
		gulp.start('angular')
	})
	
	watch(paths.stylus.watch, function() {
		gulp.start('stylus')
	})
})

gulp.task('default', ['libs', 'angular', 'stylus'])