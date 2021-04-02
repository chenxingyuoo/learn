/**
 * Created by mac on 16/7/15.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var jade = require('gulp-jade');


// 编译less
gulp.task('less', function() {
    gulp.src('public/less/*.less')   // public/less/ 文件夹下的所有 less文件
        .pipe(less())  //less 编译 css
        .pipe(gulp.dest('public/css'));  //存放到 public/css 文件夹
});


// js 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('public/js/**/*.js')    //'public/js 文件夹下的所有js 。
        .pipe(concat('app.js'))        // 合并 取名叫 app.js
        .pipe(gulp.dest('public/build/js'))  //存放到  'public/build/js' 文件夹下
        .pipe(rename('app.min.js'))    //压缩 取名叫 app.min.js
        .pipe(uglify())                //执行压缩
        .pipe(gulp.dest('public/build/js'));   //存放到  'public/build/js' 文件夹下
});


// css 合并 ， 压缩文件
gulp.task('minifycss', function() {
     gulp.src('public/css/*.css')      //压缩的文件
         .pipe(concat('style.css'))   //css文件合并为 style.css
         .pipe(minifycss())            //将 style.css 执行压缩
         .pipe(gulp.dest('public/build/css')); //输出文件夹
});


// Static server
gulp.task('browser-sync', function() {
    var files = [
        '**/*.jade',
        '**/*.html',
        '**/*.less',
        '**/*.css',
        '**/*.js'
    ];
    browserSync.init(files,{
        server: {
            baseDir: "./",
            /*index : './views/page'*/
        },
        /*server : './views/page',*/
        port: 3005,  //设置端口号
    });
});


/*gulp.task('jade', function () {
    return gulp.src(['views/!**!/!*.jade', 'views/page/!*.jade', 'views/includes/!*.jade'])
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('views/'));
});*/

// 默认任务  。 命令行执行  gulp  就默认执行这个 default 任务 。 gulp  == gulp.default(指向执行任务名称)
// gulp.less  就执行 less 这个任务

gulp.task('default', function(){


    gulp.run('browser-sync' , 'less', 'scripts', 'minifycss'/*, 'jade'*/);

    // 监听 public/less文件下的less文件变化 ， 再进行less任务编译 和 css 合并压缩任务
    gulp.watch('public/less/*.less', ['less', 'minifycss']);

    // 监听 public/js/page 文件下的js变化 ， 再进行 合并压缩
    gulp.watch('public/js/**/*.js', ['scripts']);

    gulp.watch('public/js/**/*.js', ['scripts']);

   /* gulp.watch('views/!**!/!*.jade', ['jade']);*/

    // 监听 public/css文件下的css文件变化 ， 再进行minifycss任务进行css压缩
    /*gulp.watch('public/css/!*.css', ['minifycss']);*/
});

