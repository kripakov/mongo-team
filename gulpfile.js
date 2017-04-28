var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglifyjs = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename');
	
/* sass file convert to css file */

gulp.task('sass', function() { 
  return gulp.src('mongo/sass/**/*.sass') 
    .pipe(sass({
        includePaths: require('node-bourbon').includePaths,
        style: 'compressed',
        quiet: true
    })).on('error', sass.logError)
    .pipe(rename({suffix: '.min', prefix : '_'}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss())
    .pipe(gulp.dest('mongo/css'))
    .pipe(browserSync.stream()) 
  });

/* start project */

gulp.task('browser-sync',function(){
	browserSync({
		server:{
			baseDir:'mongo'
		},
		notify:false
	})
})

gulp.task('img', function(){
	return gulp.src('mongo/img/**/*')
	.pipe(cache(imagemin({
		interlaced:true,
		progressive:true,
		svgoPlugins:[{removeViewBox:false}],
		une:[pngquant()]
	})))
	.pipe(gulp.dest('mongo/img'))
})
/* gulp watch file to change file */

gulp.task('watch', ['browser-sync','sass'], function(){
	gulp.watch('mongo/sass/**/*.sass',['sass']);
	gulp.watch('mongo/*.html',browserSync.reload);
	gulp.watch('mongo/js/**/*.js',browserSync.reload);
})
/* rename css file*/

gulp.task('css-libs',function (){
	return gulp.src('mongo/css/main.css')
	.pipe(cssnano())
	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(gulp.dest('mongo/css'))
})

gulp.task('build',['img','sass','scripts'], function(){
	var buildCss = gulp.src(['mongo/css/main.css'])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src(['mongo/fonts/**/*'])
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src(['mongo/js/**/*'])
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src(['mongo/*.html'])
		.pipe(gulp.dest('dist'));
});