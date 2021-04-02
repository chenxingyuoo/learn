const fs = require('fs');
const server = require('http').createServer();


//值得注意的是，对象的部分行为是密切相关的。例如：在客户端HTTP对象是可读流，在服务端HTTP对象是可写流。这是因为在HTTP上，程序从一个对象上读取数据（http.IncomingMessage），然后将读取的数据写到另外一个对象上（http.ServerResponse）。


// 当服务接收请求，程序将会通过异步fs.readFile函数向请求者发送数据报文。表面上看这样的代码并不会阻塞程序的事件循环，真的是这样吗？
//好，当我们启动这段服务，然后请求这个服务后，让我们看看内存占用将会有怎样的变化。
//当启动服务时，服务占用的内存量是8.7兆。
//然后请求这个服务，注意内存占用的情况：
//哇 ---- 内存占用突然间跳到434.8兆。
// server.on('request', (req, res) => {
//   fs.readFile('./big.file', (err, data) => {
//     if (err) throw err;
  
//     res.end(data);
//   });
// });

//当客户端请求大文件时，程序一次将一块数据生成流文件，这就意味着我们不需要将数据缓存到内存中。内存的占用也仅仅上升了25兆。
server.on('request', (req, res) => {
  const readableSrc = fs.createReadStream('./big.file');
  readableSrc.pipe(res);
});


server.listen(8000);