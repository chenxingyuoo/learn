/**
 * Created by mac on 15/12/9.
 */

//Node.js Stream(流)

//从流中读取数据

/*var fs = require('fs');

 var data ='';

 //创建可读流
 var readerStream =  fs.createReadStream('../mac/project/nodejs_learn/fight/input.txt');


 //设置编码为 utf8
 readerStream.setEncoding('UTF8');

 //处理事件流 --> data , end , and error
 readerStream.on('data',function(chunk){
 data += chunk;
 });

 readerStream.on('end',function(){
 console.log(data);
 });

 readerStream.on('error',function(err){
 console.log(err.stack);
 });

 console.log("程序处理完成");*/


//写入流

/*var fs = require("fs");

 var data = "hello world , i am here , with you!";

 //创建一个可以写入的流 ， 写入到output.txt中  //能直接创建一个文件
 var writerStream = fs.createWriteStream('../mac/project/nodejs_learn/fight/ioutput.txt');

 //使用utf8编码写入数据
 writerStream.write(data,'UTF8');

 //标记文件末尾
 writerStream.end();

 //处理事件流
 writerStream.on('finish',function(){
 console.log("写入成功");
 });

 writerStream.on('error',function(err){
 console.log(err.stack);
 });

 console.log("程序执行完毕");


//管道流

/*var fs = require('fs');

 //创建一个可读流
 var readerStream = fs.createReadStream('../mac/project/nodejs_learn/fight/input.txt');

 //创建一个可写流
 var writerStream = fs.createWriteStream('../mac/project/nodejs_learn/fight/output.txt');

 //管道读写操作
 //读写 input.txt 文件内容 ， 并将内容写入到 output.txt 文件中
 readerStream.pipe(writerStream);

 console.log("程序执行完毕");*/



//链式流  。压缩文件 ,据我测试 , 可写流不能进行压缩

/*var fs = require('fs');

var zlib = require('zlib');

//创建一个可读流 ， 压缩 input.txt 文件为 input.txt.gz ，变为可写流

var writerStream = fs.createReadStream('../mac/project/nodejs_learn/fight/input.txt');

writerStream.pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('../mac/project/nodejs_learn/fight/input.txt.gz'));


console.log("文件压缩成功");*/


//链式流  。解压文件

/*var fs = require('fs');

var zlib = require('zlib');

//创建一个可读流 ， 压缩 input.txt.gz 文件为 input.txt ，变为可写流

var decompression = fs.createReadStream('../mac/project/nodejs_learn/fight/input.txt.gz');


decompression.pipe(zlib.createGzip())
              .pipe(fs.createWriteStream('../mac/project/nodejs_learn/fight/mm.txt'));

console.log("文件解压成功");*/
