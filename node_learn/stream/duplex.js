const { Duplex } = require('stream');

//双工流
//在双工流中的可读流与可写流是完全独立的，双工流仅仅是一个对象同时具有可读流和可写流的功能。理解这一点至关重要。
const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
});

inoutStream.currentCharCode = 65;
process.stdin.pipe(inoutStream).pipe(process.stdout);