/**
 * Created by chenxingyu on 2016/12/14.
 */

//让我们看看在 Node.js 中如何用异步的方式读取一个文件，下面是一个例 :
var fs = require('fs');

function readFileCallBack(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
}

fs.readFile('file.txt', 'utf-8', readFileCallBack);
console.log('end.');

//end.
//这是一首简单的小情歌


//Node.js 也提供了同步读取文件的 API:
var data = fs.readFileSync('file.txt', 'utf-8');
console.log(data);
console.log('end.');

// 这是一首简单的小情歌
// end.

