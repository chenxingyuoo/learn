const printB = require('./b')

module.exports = function printA() {
  console.log('module a!')
  printB()
}
