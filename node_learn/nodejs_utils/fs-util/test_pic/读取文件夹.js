var fs = require('fs');
var utils = require('common/utils');
var src = '/Users/chenxingyu/project/my/flower_language/app/static/img/';

var obj = {};

//遍历文件夹
fs.readdir(src, function (err, files) {
    files.forEach(function (fileName) {
        let key = fileName.slice(0, fileName.indexOf('.'));
        key = utils.camelCase(key);
        obj[key] = './dist/img/' + fileName 
        // console.log('./dist/img/' + fileName );
    })
    console.log(obj);
})