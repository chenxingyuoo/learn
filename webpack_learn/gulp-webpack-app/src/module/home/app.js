"use strict";

import '../../assets/sass/common/common.scss';

//引入模板
import tplHome from './tpl/home.ejs';

//引入公共入口文件
import '../../common/app'; 

import HomeNav  from './home_nav/home_nav';
import HomeBanner  from './home_banner/home_banner';

var homeNav = new HomeNav('a', 'b', 'c');

var homeBanner = new HomeBanner({
    waitTime : 500,
    index : 20,
});

var num = 'learn gulp o';
function hello(){
    // debugger;
    alert(num + '？');
    num = num + 1;
}

hello();

console.log('陈星宇');

document.querySelector('#app').innerHTML = tplHome({
    home : '我的家',
    img : '../dist/img/logo.png'
});


