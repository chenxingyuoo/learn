const { Transform } = require('stream');

//转换流
//不需要实现read和write函数，开发者仅仅需要实现transform函数，因为transform函数已经实现了read函数和write函数。
//下面是将输入的字母转换为大写格式后，然后把转换后的数据传给可写流：
const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTr).pipe(process.stdout);
