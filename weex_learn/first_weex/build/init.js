var fs = require('fs')
var path = require('path')
var ip = require('ip').address()
console.log(ip);
fs.writeFileSync(path.resolve('config.js'), 'var CURRENT_IP = \'' + ip + '\'')
