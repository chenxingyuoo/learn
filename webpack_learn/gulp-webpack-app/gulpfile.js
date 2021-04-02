/**
 * Created by chenxingyu on 2017/2/13.
 */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const named = require('vinyl-named');
const webpack = require('webpack');
const sass = require('gulp-sass');
const cssmin = require('gulp-minify-css');
const concat = require('gulp-concat');
const utils = require('./build/utils');

var sassConcatObj = utils.getEntry('./src/assets/sass/**/*.scss');

//sass处理
function sassHandler(concatArray , concatName){
    return gulp.src(concatArray)
        .pipe(concat(concatName))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
}

//sass任务
function sassTask(obj, flag){
    for (var key in obj) {
        var concatArray = [];
        var concatName;
        var commonStr = 'common';

        if (key !== commonStr) {

            for (var key1 in obj[commonStr]) {
                concatArray.push(obj[commonStr][key1]);
            }

            for (var key2 in obj[key]) {
                concatArray.push(obj[key][key2]);
            }

            concatName = key + '.scss';

            //编译并且输出css
            if (flag === 'dev') {
                sassHandler(concatArray, concatName);
            }
            //编译并且压缩输出css
            else {
                sassHandler(concatArray, concatName)
                .pipe(cssmin())
                .pipe(gulp.dest('./dist/css'))
            }
        }
    }
}


var webpackDevConfig = require("./build/webpack.dev.conf");
var webpackProdConfig = require("./build/webpack.prod.conf");

//监听js处理
gulp.task('webpackDev',function(){
    //执行webpack任务
    webpack(webpackDevConfig, function(err, stats) {
        console.info(stats.toString());
    });
});

//打包js
gulp.task('webpackProd',function(){
    //执行webpack任务
    webpack(webpackProdConfig, function(err, stats) {
        console.info(stats.toString());
    });
});

//sassDev任务
gulp.task('sassDev', function (cb) {
    sassTask(sassConcatObj, 'dev');
});

//sassBuild任务
gulp.task('sassBuild', function () {
    sassTask(sassConcatObj, 'build');
});


//拷贝图片
gulp.task('copyImg',function (){
    return gulp
        .src('./src/assets/img/**/*')
        .pipe(gulp.dest('./dist/img'));
});

//拷贝字体
gulp.task('copyFonts',function (){
    return gulp
        .src('./src/assets/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts'));
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
    gulp.watch("./dist/css/*.css").on('change', reload);
    gulp.watch("./dist/js/*.js").on('change', reload);
    gulp.watch("./views/*.html").on('change', reload);

});

//监听任务
gulp.task('watch', ['browser-sync', 'webpackDev', 'copy' ], function() {
    // gulp.watch("./src/**/*",['webpackDev']);
    // gulp.watch('./src/assets/sass/**/*.scss', ['sassDev']);
});

//打包任务
gulp.task('build', ['webpackProd' , 'copy']);

//开发任务
gulp.task('default', ['browser-sync', 'webpackDev', 'copy' ]);