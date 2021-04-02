/**
 * Created by chenxingyu on 2016/12/14.
 */
/*exports.setName = function (thyName) {
 name = thyName;
 };
 exports.sayHello = function () {
 console.log('Hello ' + name);
 };*/


function Hello() {
    var name;
    this.setName = function (thyName) {
        name = thyName;
    };
    this.sayHello = function () {
        console.log('Hello ' + name);
    };
};

module.exports = Hello