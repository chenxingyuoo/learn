/**
 * Created by chenxingyu on 2017/5/6.
 */
var zlib = require('zlib');
const gzip = zlib.createGzip();
const fs = require('fs');
const inp = fs.createReadStream('input.txt');
const out = fs.createWriteStream('input.txt.gz');

console.log(inp.pipe(gzip));;