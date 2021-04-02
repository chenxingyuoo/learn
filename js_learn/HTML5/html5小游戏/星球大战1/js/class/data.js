/**
 * Created by Administrator on 2016/9/24.
 */
;(function (){

    function Data(){
        this.count = 0;        //实时摧毁数
        this.destroyed = 0;         //总的摧毁数目
        this.record = parseInt(localStorage.getItem('destroyed')) || 0;         //最高纪录
        this.count = 0;         //实时摧毁数
        this.playing = false;     //游戏是否进行中
        this.gameOver = false;     //游戏是否结束
    }

    Data.prototype = {
        scoreDraw : function (){
            var self = this;
            //游戏中的记录
            ctx.font = "20px Verdana";
            ctx.fillStyle = "white";
            ctx.textBaseline = 'middle';
            ctx.textAlign = "left";
            ctx.fillText('Record: ' + self.record + '', 20, 30);

            ctx.font = "40px Verdana";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = 'middle';
            ctx.strokeText('' + self.destroyed + '', cW / 2, cH / 2);
            ctx.fillText('' + self.destroyed + '', cW / 2, cH / 2);
        }
    };

    return window.Data = Data;

})();