var fs = require('fs');
var src = '/Users/chenxingyu/Desktop/气球切图/气球2/';

fs.readdir(src, function(err, files) {    // files是名称数组，因此
    // 可以使用forEach遍历哈, 此处为ES5 JS一点知识
    files.forEach(function (fileName, index) {
        //console.log('"../static/img/' + fileName + '",')

        var fileSrc = src + fileName;
        console.log(src,fileName)
        // console.log(fileName.indexOf('.'));
        // console.log(fileName.lastIndexOf('.'));
        // console.log(fileName.replace(fileName.substring(fileName.indexOf('.'), fileName.lastIndexOf('.')), ''))


        var oldPath = src + fileName;
        // var newPath = src + fileName.replace(fileName.substring(fileName.indexOf('.'), fileName.lastIndexOf('.')), '');
        // var newPath = src + 'p' + (index + 1) + '.jpg';
        var newPath = src + fileName.replace(/气球/g,'balloon');

        fs.rename(oldPath, newPath, function (err) {
            if(!err){
                console.log(fileName + '名称替换成功');
            }
        })

    })

    // var oldPath = src + '/' + fileName,
    //     newPath = src + '/' + fileName.replace(/_/g,'-');
    // //重命名
    // fs.rename(oldPath, newPath, function (err) {
    //     if(!err){
    //         console.log(fileName + '名称替换成功');
    //     }
    // })
})