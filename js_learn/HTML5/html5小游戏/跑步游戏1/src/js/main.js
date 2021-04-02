/**
 * Created by chenxingyu on 2017/3/15.
 */
"use strict";

import imgObj from './data/img_obj';

//commonjs
import './core/common';

//背景方法
import background from './game/background';
//跑男
import run from './game/run';
//公路
import road from './game/road';
//时间
import time from './game/time';
//数据
import data from './game/data';

//获取DOM
let app = document.querySelector('#app');
let indexBox = app.querySelector('#index-box');
let gameBox = app.querySelector('#game-box');
let startBtn = app.querySelector('.start-btn');

//画布对象
let canvas = app.querySelector('#canvas');
let context = canvas.getContext('2d');

let width = 640;
let height = document.documentElement.clientHeight;

/**
 *  将画布宽高设置到全局变量下
 *  设置画布宽高
 **/
window.canWidth = canvas.width = width;
window.canHeight = canvas.height = height;

window.lastTime = null;   //记录最后一次的时间
window.deltaTime = null;  //增量时间

/**
 *  初始化
 *
 **/

let gameBg;
let gameRun;
let gameRoad;
let gameTime;

//游戏数据
let gameData = data();

//初始化游戏
let initGame = () => {
    //初始化一个游戏背景
    gameBg = background(imgObj.gameBg);
    //初始化跑男
    gameRun = run(imgObj.gameGuy);
    //初始化公路
    gameRoad = road(imgObj.gameRoad);
    //初始化时间
    gameTime = time(imgObj.gameTime);

    context.font = '22px verdana';
};

//点击开始游戏
startBtn.addEventListener('click', () => {

    lastTime = Date.now();
    deltaTime = 0;

    //初始化游戏
    initGame();

    //循环绘制
    gameLoop();

    gameBox.style.display = 'block';
    indexBox.style.display = 'none';
}, false);

window.loopTime = 200;

setInterval(function(){
    window.loopTime = window.loopTime - 5;
},3000);

let gameLoop = () => {
    window.requestAnimFrame(gameLoop, 1000 / 16);

    let nowTime = Date.now();  //当前时间
    deltaTime = nowTime - lastTime;   //deltaTime ，增量时间 ， 每两帧的时间间隔 ， 保证游戏画面流畅
    lastTime = nowTime;  //记录最后一次的时间

    console.log(deltaTime);
    console.log(lastTime);

    //清除画布
    context.clearRect(0, 0, canWidth, canHeight);

    //绘制背景
    gameBg.draw(context);

    //绘制公路
    gameRoad.draw(context, 640, 780);

    //绘制跑男
    gameRun.draw(context , 176, 377);

    //绘制时间
    gameTime.draw(context, 164, 79);

    //绘制时间分秒数
    gameData.draw(context);
};




// console.log(gameBg);