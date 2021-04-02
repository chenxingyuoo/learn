const { Readable } = require('stream'); 

//可读流
const inStream = new Readable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  read(size) {
  	this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 100) {
      this.push(null);
    }
    // there is a demand on the data... Someone wants to read it.
  }
});

inStream.currentCharCode = 65;
inStream.pipe(process.stdout);