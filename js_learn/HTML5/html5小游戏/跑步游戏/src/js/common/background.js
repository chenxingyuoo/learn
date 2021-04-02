/**
 * Created by chenxingyu on 2017/3/15.
 */

export default function backGround(src){
    const bgPic = new Image();
    //设置url
    bgPic.src = src;

    function draw(context){
        context.drawImage(bgPic, 0, 0, canWidth, canHeight);     //向画布上绘制图像、画布或视频
    }

    return {
        draw : draw
    }
};