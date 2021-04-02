/**
 * Created by mac on 15/12/6.
 */
/*
exports.world = function(){
    console.log("hello world");
};
*/


function Hello(){
    var name;
    this.setName = function(thyName){
       name = thyName;
        console.log(name);
    };

    this.sayHello = function(){
        console.log('Hello' + name);
    }
}

module.exports = Hello;