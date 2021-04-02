/**
 * Created by mac on 15/12/6.
 */


var Hello = require('./hello');

hello = new Hello();

hello.setName('chenxignyu');

hello.sayHello();


//nodejs 函数
/*function say(word){
    console.log(word);
}

function execute(someFunction , value){
    someFunction(value);
}

execute(say , 'hello world');*/


//nodejs 匿名函数
function execute(someFunction , value){
    someFunction(value);
};

execute(function(word){
    console.log(word);
},'hello world');
