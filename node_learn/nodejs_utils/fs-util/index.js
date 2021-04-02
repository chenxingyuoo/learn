/**
 * Created by Administrator on 2016/8/3.
 */
var fs = require('fs');
var utils = require('common/utils');
var src = '/Users/chenxingyu/project/my/flower_language/app/static/img/';

var obj = {};

//读取 path 路径所在目录的内容。 回调函数 (callback) 接受两个参数 (err, files)
// 其中 files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'
fs.readdir(src, function(err, files) {    // files是名称数组，因此
    // 可以使用forEach遍历哈, 此处为ES5 JS一点知识
    files.forEach(function (fileName) {
        console.log('"../static/img/' + fileName + '",')
    })
        var oldPath = src + '/' + fileName,
            newPath = src + '/' + fileName.replace(/_/g,'-');
        //重命名
        fs.rename(oldPath, newPath, function (err) {
            if(!err){
                console.log(fileName + '下划线替换成功');
            }
        })
    })







