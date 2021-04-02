var fs = require('fs');
var utils = require('./common/utils');
var src = '/Users/chenxingyu/project/sq_project/pingan-nianhui/src/assets/img';

var url = 'http://xfx-dev.img-cn-shenzhen.aliyuncs.com/newyear/';

//遍历文件夹中的文件夹
const getFoldersFilePath = (src, callback) => {
    fs.readdir(src, (err, paths) => {
        if (err) {
          throw err;
        }
        paths.forEach((path) => {
            let _src = src  + '/' + path;
            fs.stat(_src, (err, st) => {
                if (err) {
                  throw err;
                }

                //如果是文件
                if (st.isFile()) {
                    callback(_src, path);
                }
                //如果是目录
                else if (st.isDirectory()) {
                    getFoldersFilePath(_src, callback)
                }
            });
        })
    });
};

getFoldersFilePath(src,(_src, fileName) => {
    //忽略隐藏文件
    if (fileName.indexOf('.') === 0) {
        return;
    }
    // let newSrc = '..' + _src.substr(_src.indexOf('/assets'));
    // let newSrc = url + _src;
    // let newSrc = 
    let pointSrc = `require(url + '${fileName}'),`;
    console.log(pointSrc);
});
