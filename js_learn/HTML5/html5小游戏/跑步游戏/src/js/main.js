/**
 * Created by chenxingyu on 2017/3/15.
 */

import imgObj from './data/img_obj';

//背景方法
import background from './common/background';

//index
import run from './index/run';


//画布对象
let myCanvas = document.querySelector('#my-canvas');
let context = myCanvas.getContext('2d');

/**
 *  将画布宽高设置到全局变量下
 *  设置画布宽高
 **/
window.canWidth = myCanvas.width = 640;
window.canHeight = myCanvas.height = document.documentElement.clientHeight;

/**
 *  初始化
 *
 **/

// document.querySelector('#app').style.width = canWidth + 'px';
// document.querySelector('#app').style.height = canHeight + 'px';

//初始化一个首页背景
let indexBg = background(imgObj.indexBg);
let indexRun = run(imgObj.indexRun);

//首页循环渲染
const indexLoop = function indexLoop(){
    window.setTimeout(indexLoop, 200);
    //清除画布
    context.clearRect(0, 0, canWidth, canHeight);
    //绘制背景
    indexBg.draw(context);

    //绘制跑步
    indexRun.draw(context , 640, 848);
};

indexLoop();


console.log(indexLoop);


// console.log(gameBg);