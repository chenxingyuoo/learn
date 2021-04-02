/**
 * Created by chenxingyu on 2017/3/15.
 */
"use strict";
export default function backGround(src){
    const bgPic = new Image();
    //设置url
    bgPic.src = src;

    let draw = (context, width, height) => {
        context.drawImage(bgPic, 0, 0, canWidth, canHeight);     //向画布上绘制图像、画布或视频
    };

    return {
        draw : draw
    }
};