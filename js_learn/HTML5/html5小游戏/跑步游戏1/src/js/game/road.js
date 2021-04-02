/**
 * Created by chenxingyu on 2017/3/15.
 */
"use strict";
export default function road(src){
    let timer = 0;
    let index = 0; //保存index ， 用来切换动画
    let roadPic = new Image();

    roadPic.src = src;

    //向画布上绘制图像
    let draw = (context, width, height) => {
        //获取定时器时间
        timer = timer + deltaTime;

        //公路的绘制时间是 loopTime * 2
        let curLoopTime = loopTime * 2;
        if(timer > curLoopTime){
            //获取当前的index
            index = (index + 1) % 6;

            //求余数循环
            timer = timer % curLoopTime;
        }

        //保存当前环境的状态
        context.save();
        //偏移
        context.translate(0, canHeight - height);
        //绘制图片
        context.drawImage(roadPic, index * width, 0, width, height, 0, 0, width, height);
        //返回之前保存过的路径状态和属性
        context.restore();
    };

    return {
        draw : draw
    }
}