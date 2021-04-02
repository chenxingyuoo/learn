"use strict";

//引入css
import '../../assets/sass/common.scss';
import '../../assets/sass/home.scss';
import './sass/test.scss';

//引入图片
import imgLogo from '../../assets/image/logo.png';

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

var num = '324234';
function hello(){
    // debugger;
    alert(num + '？');
    num = num + 1;
}

hello();

console.log('app s.JS D');

document.querySelector('#app').innerHTML = tplHome({
    home : '我的dddd家',
    img : imgLogo
});


