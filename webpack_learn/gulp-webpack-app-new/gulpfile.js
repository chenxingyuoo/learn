/**
 * Created by chenxingyu on 2017/2/13.
 */
const gulp = require('gulp');
//同步执行任务
const gulpSequence = require('gulp-sequence');
const clean = require('gulp-clean'); 
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const named = require('vinyl-named');
const webpack = require('webpack');
const concat = require('gulp-concat');
const utils = require('./build/utils');


var webpackDevConfig = require("./build/webpack.dev.conf");
var webpackProdConfig = require("./build/webpack.prod.conf");

//监听js处理
gulp.task('webpackDev',function(){
    //执行webpack任务
    webpack(webpackDevConfig, function(err, stats) {
        console.log(stats.toString(),"color:green");
    });
});

//打包js
gulp.task('webpackProd',function(){
    //执行webpack任务
    webpack(webpackProdConfig, function(err, stats) {
        console.info(stats.toString(),"color:green");
    });
});

//拷贝媒体
gulp.task('copyMedia',function (){
    return gulp
        .src('./src/assets/media/**/*')
        .pipe(gulp.dest('./static/media'));
});

//拷贝图片
gulp.task('copyImg',function (){
    return gulp
        .src('./src/assets/img/**/*')
        .pipe(gulp.dest('./static/img'));
});

//拷贝字体
gulp.task('copyFonts',function (){
    return gulp
        .src('./src/assets/fonts/**/*')
        .pipe(gulp.dest('./static/fonts'));
});


//拷贝任务组合
gulp.task('copy',['copyImg', 'copyFonts']);


// 静态服务器
gulp.task('browser-sync',function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    //监听文件改变来重新刷新浏览器
    gulp.watch("./static/css/*.css").on('change', reload);
    gulp.watch("./static/js/*.js").on('change', reload);
    gulp.watch("./views/*.html").on('change', reload);

});

//清除任务
gulp.task('clean', function (){
    return gulp.src('./static')
        .pipe(clean({force: true}));
});

//build 处理程序
const buildHandle = (callback) => {
    //同步执行任务
    gulpSequence('clean', ['webpackProd','copy'])(callback);
};

//打包任务
gulp.task('build', buildHandle);
gulp.task('b', buildHandle);


const watch = ['browser-sync', 'webpackDev', 'copy' ];
//监听任务
gulp.task('watch', watch);
gulp.task('w', watch);

//默认任务
gulp.task('default', watch);
