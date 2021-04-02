/**
 * Created by chenxingyu on 2017/3/16.
 */
"use strict";
export default function time(src){
    let timePic = new Image();

    //设置图片路径
    timePic.src = src;

    let draw = (context, width, height) => {
        //保存当前环境的状态
        context.save();
        //偏移
        context.translate( 20, 20);
        //绘制图片
        context.drawImage(timePic, 0, 0, width, height, 0, 0, width, height);
        //返回之前保存过的路径状态和属性
        context.restore();
    };

    return {
        draw : draw
    }
}