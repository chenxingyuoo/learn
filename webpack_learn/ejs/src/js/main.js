import { log } from './core/util';

//模板
import tplTestList from '../tpl/test_list.ejs';
import tplTestItem from '../tpl/test_item.ejs';

log('陈'); 

//获取DOM
var app = document.querySelector('#app');

var testObj = {
    list : [
        {
            name : 'chen',
            sex : '男',
        },
        {
            name : '晓晓',
            sex : '女',
        }
    ]
};
debugger
app.innerHTML = tplTestList();
app.querySelector('.box-li').innerHTML = tplTestItem(testObj);
