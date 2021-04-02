/**
 * Created by chenxingyu on 2017/3/15.
 */
"use strict";
export default function run(src){
    let timer = 0;
    let index = 0; //保存index ， 用来切换动画
    let runPic = new Image();

    //设置url
    runPic.src = src;

    //向画布上绘制图像
    let draw = (context, width, height) => {

        //获取定时器时间
        timer = timer + deltaTime;

        //跑男的绘制时间是 loopTime
        if(timer > loopTime){
            //获取当前的index
            index = (index + 1) % 8;

            //求余数循环
            timer = timer % loopTime;
        }

        //保存当前环境的状态
        context.save();
        //偏移
        context.translate((canWidth - width) / 2, canHeight - height - 150);
        //绘制图片
        context.drawImage(runPic, index * width, 0, width, height, 0, 0, width, height);
        //返回之前保存过的路径状态和属性
        context.restore();
    };

    return {
        draw : draw
    }
};


