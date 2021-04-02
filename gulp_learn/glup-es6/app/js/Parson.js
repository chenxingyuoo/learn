/**
 * Created by Administrator on 2016/9/9.
 */
// import $ from '../../lib/jquery-1.9.1.min';

// import {EJS} from '../../lib/ejs_production';

// console.log(EJS)

// import {tpl} from '../../tpl/list';

// console.log(tpl);

class Parson {
    constructor(_name = 'CHEN', _age = '21'){
        this.name = _name;
        this.age = _age;
    }
    renders(){
        var html = '';
        var ids = ['chen','xing', 'yu'];
        var messages = ids.map((value, index, list) =>  html += `<div class="${index}">${value}</div>`); // implicit return
        document.getElementById('app').innerHTML = html
    };
    getName(){
        console.log(this.name);
        return this.name;
    }
    getAge(){
        return this.age;
    }
}

export default  Parson
/*
var parson = new Parson();
parson.getName();*/
