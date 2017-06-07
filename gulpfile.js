var gulp = require('gulp'),
    minifyCss = require('gulp-clean-css'),
    minifyJs = require('gulp-uglify'),
    livereload = require("gulp-livereload");
 
gulp.task('minifyCss', function () {
    gulp.src('css/*.css') 
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css')); 
});
 

gulp.task('minifyJs', function () {
    gulp.src('js/*.js') 
        .pipe(minifyJs())
        .pipe(gulp.dest('dist/js')); 
});

gulp.task("reload",function(){
	livereload.listen();
	gulp.watch("**/*.*").on("change",function(event){
		livereload.changed(event.path)
	})
})
