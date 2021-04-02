/**
 * Created by chenxingyu on 2017/3/16.
 */
"use strict";

export default function data(){
    let timeTimer = 0;
    let timeNum = 0;
    let timeText = '';
    //判断游戏是否结束
    let gameOver = false;

    //偏移值
    let left = 105;
    let top = 65;

    //如果等于100秒
    let isOneHundredSeconds = (time) => {
        return timeText === '100.0s';
    };

    //绘制
    let draw = (context) => {
        //获取定时器时间
        timeTimer = timeTimer + deltaTime;

        if (timeTimer >= 100) {
            //毫秒数+ 0.1
            timeNum = timeNum + 0.1;
            timeText = timeNum.toFixed(1) + "s";

            //如果100s
            if (isOneHundredSeconds(timeText)) {
                //偏移值改变
                left = 100;
            }

            //求余数循环
            timeTimer = timeTimer % 100;
        }

        //绘制文本
        context.fillText(timeText, left ,  top );
    };

    return {
        draw : draw,
        gameOver : gameOver
    }
}