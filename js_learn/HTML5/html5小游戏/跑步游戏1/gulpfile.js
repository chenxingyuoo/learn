/**
 * Created by chenxingyu on 2017/2/7.
 */
const gulp = require('gulp');
const named = require('vinyl-named');
const webpack = require('webpack');
let webpackConfig = require("./webpack.config");

//监听js处理
gulp.task('webpackDev',function(){
    //执行webpack任务
    webpack(webpackConfig, function(err, stats) {
        console.log(stats.toString());
    });
});



//打包js
gulp.task('webpackBuild',function(){
    //添加压缩js代码
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
    //执行webpack任务
    webpack(webpackConfig, function(err, stats) {
        console.log(stats.toString());
    });
});

//拷贝图片
gulp.task('copyImg', function (){
    return gulp.src("./src/img/**/*")
        .pipe(gulp.dest("./dist/img"));
});

gulp.task('watch', function() {
    gulp.watch("./src/js/**/*",['webpackDev']);
});

gulp.task('build', ['webpackBuild'], function() {});

gulp.task('default', ['watch', 'webpackDev']);