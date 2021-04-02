/**
 * Created by Administrator on 2016/9/9.
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const browserify = require('browserify');  //让你使用类似于 node 的 require() 的方式来组织浏览器端的 Javascript 代码
const source = require('vinyl-source-stream');  //将Browserify的bundle()的输出转换为Gulp可用的vinyl（一种虚拟文件格式）流
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const gutil = require('gulp-util');
const webpack = require('gulp-webpack');


// 编译并压缩js
gulp.task('convertJS', function () {
    return gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(webpack({//babel编译import会转成require，webpack再包装以下代码让代码里支持require
            output:{
                filename:"bundle.js",
            },
            stats:{
                colors:true
            }
        }))
        .pipe(gulp.dest("dist/js"));//包装好的js目录
})

// 编译 scss
gulp.task('scss', function () {
    return gulp.src('app/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        /*.pipe(rename(function(path){
         path.basename += '.min';
         }))*/
        .pipe(gulp.dest('app/css'))
    // .pipe(bs.stream())
})

// 合并并压缩css
gulp.task('convertCSS', function () {
    return gulp.src('app/css/*.css')
        .pipe(concat('app.css'))
        .pipe(cssnano())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist/css'));
})

// 监视文件变化，自动执行任务
gulp.task('watch', function () {
    gulp.watch('app/sass/*.scss', ['scss', 'convertCSS']);
    // gulp.watch('app/css/*.css', ['convertCSS']);
    gulp.watch('app/**/*.js', ['convertJS', 'browserify']);
})

// browserify
gulp.task("browserify", function () {
    /*return browserify("dist/js/index.js")
     .bundle()
     .pipe(source('bundle.js'))
     // .pipe(uglify())
     .pipe(gulp.dest("dist/js"));*/

       /* browserify({
              entries: 'dist/js/main.js',
              debug: true
        })
        .transform(babelify)
        // .on('error', gutil.log)
        .bundle()
        // .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/js'));*/
});

// Static server
gulp.task('browser-sync', function () {
    var files = [
        '**/*.jade',
        '**/*.html',
        '**/*.less',
        '**/*.css',
        '**/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: "./dist",
            /*index : './views/page'*/
        },
        /*server : './views/page',*/
        port: 3009,  //设置端口号
    });
});

gulp.task('start', ['browser-sync', 'convertJS', 'convertCSS', 'browserify', 'watch']);