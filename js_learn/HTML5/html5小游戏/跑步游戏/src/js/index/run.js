/**
 * Created by chenxingyu on 2017/3/15.
 */

export default function run(src){
    let index = 0; //保存index ， 用来切换动画
    let runPic = new Image();

    //设置url
    runPic.src = src;

    //向画布上绘制图像
    function draw(context, width, height){
        //获取当前的index
        index = (index + 1) % 4;

        //保存当前环境的状态
        context.save();
        //偏移
        context.translate(0, canHeight - height);
        //绘制图片
        context.drawImage(runPic, index * canWidth, 0, width, height, 0, 0, width, height);
        //返回之前保存过的路径状态和属性
        context.restore();
    }

    return {
        draw : draw
    }
};
