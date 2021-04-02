/**
 * Created by chenxingyu on 2016/12/13.
 */
var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var clean = require("gulp-clean");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssmin = require('gulp-minify-css');
const rename = require('gulp-rename');
var gulpCopy = require('gulp-copy');
var webpackConfig = require("./webpack.config");

function getConfig(opt) {
  var config = {
    module: {
      loaders: [
        { test: /\.vue$/, loader: 'vue'},
        {
          test: /\.js$/,
          loader: 'babel',
        },
      ],
      devtool: 'source-map',
    }
  };

  if (!opt) {
    return config
  }else{
    for (var i in opt) {
      config[i] = opt
    }
    return config
  }
}

//清理
gulp.task("clean",function(){
  return gulp.src("./dist/static")
    .pipe(clean());
});


gulp.task('copy',function (){
  /*var sourceFiles = './static/!**!/!*';
  gulp.src(sourceFiles)
    .pipe(gulp.dest('./dist/static/'))*/
  return gulp
    .src('./static/**/*')
    .pipe(gulpCopy('./dist'))
   // .dest('./dist');

});


/*gulp.task("concat-lib",function(){
  gulp.src('./static/js/!*.js')
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(rename('lib.min.js'))
    .pipe(gulp.dest('./static/js'));//包装好的js目录
});

gulp.task('cssmin',function (){
  gulp.src('./static/css/!*.css')
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest("./static/css"));
});*/

//启用webpack,依赖clean
gulp.task("webpack",function(){
  return gulp.src("./src/main.js")
    .pipe(named())
    .pipe(webpack(webpackConfig))
    // .pipe(rev())
    .pipe(gulp.dest("./dist/static/js"))
    // .pipe(rev.manifest())
    // .pipe(gulp.dest("./build"));
});

/*
gulp.task('bundle', function() {
  return gulp.src(['./src/main.js'])
    .pipe(named())
    .pipe(webpack(getConfig()))
    .pipe(gulp.dest('./dist/'))
});
*/

gulp.task('watch', function() {

  gulp.watch("./src/**/*",['webpack']);

  // gulp.watch("./static/js/*",['concat-lib']);

  // gulp.watch("./static/css/*",['cssmin']);

  gulp.watch("./static/**/*",['copy', 'webpack']);

});



gulp.task('default', ['watch']);
