/**
 * Created by Administrator on 2016/9/10.
 */
import * as Parent from './Parson'; 

//执行Parent构造函数
var parent = new Parent.default();
parent.getName();  // CHEN
parent.renders();

//继承Parent构造函数
class Dog extends Parent.default{
    constructor(){
        super('chenxingyu', 21);//执行一次父类的构造，否则会报错
        console.log("==constructor dog==");
    }

    sayHelo(){
        console.log('hello ' + this.name);
    }
}
var dog = new Dog();
dog.getName();  //chenxingyu
dog.sayHelo();  //hello chenxingyu
