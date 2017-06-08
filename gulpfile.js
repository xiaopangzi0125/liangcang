var gulp = require('gulp'),
	htmlmin = require('gulp-htmlmin'),
	less = require('gulp-less'),
	cssmin = require('gulp-clean-css'),
	jsmin = require('gulp-uglify'),
    // imgmin = require('gulp-imagemin'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload');

/*less->css,css->cssmin*/
gulp.task('less', function () {
    gulp.src('src/less/*.less')//less文件源路径
        .pipe(less())//运行less->css
        .pipe(gulp.dest('src/css'))
        .pipe(cssmin())//运行css->cssmin
        .pipe(gulp.dest('dist/css'))//生成压缩css路径
        .pipe(livereload());//浏览器刷新
});

/*项目中执行gulp watch实现监听，当html，js，css修改时在对应路径生成mini格式。
当css修改时实现浏览器时时刷新。*/


/*js->jsmin*/
gulp.task('jsmin', function (cb) {
  return gulp.src('src/js/*.js')//js文件源路径
    .pipe(jsmin())//js->jsmin
    .pipe(gulp.dest('dist/js'));//生成压缩文件路径
});
/*html->htmlmin*/
gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
/*添加监听*/
gulp.task('watch', function () {
    livereload.listen();
	// gulp.watch('src/html/*.html', ['htmlmin']);//当所有html文件夹中.html文件发生改变时，调用htmlmin任务
	// gulp.watch('src/js/*.js', ['jsmin']);//当所有js文件夹中.js文件发生改变时，调用jsmin任务
    // gulp.watch('src/less/*.less', ['less']); //当所有less文件夹中.less文件发生改变时，调用less任务
    gulp.watch('src/**/*.*', ['htmlmin', "jsmin", "less"]).on("change", function(event){
        console.log(event.path);
        livereload.changed(event.path);
    });
});
