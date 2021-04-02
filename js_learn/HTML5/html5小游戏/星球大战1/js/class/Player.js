/**
 * Created by Administrator on 2016/9/24.
 */
;(function (){


     //飞船类
    function Player() {
        //飞船初始化
        this.posX = -35,
            this.posY = -(100 + 82),
            this.width = 70,
            this.height = 79,
            this.deg;
        this.init();
    }

    Player.prototype = {
        init : function (){
            this.deg = 0;
        },
        draw: function (fire, data , sprite) {  //接收子弹类
            var self = this;
            ctx.save();
            ctx.translate(cW / 2, cH / 2);

            ctx.rotate(self.deg);
            ctx.drawImage(
                sprite.img,
                200,
                0,
                self.width,
                self.height,
                self.posX,
                self.posY,
                self.width,
                self.height
            );

            ctx.restore();

            /*//子弹发射
             if (fire.bullets.length - data.destroyed && data.playing) {
             fire.draw();
             }*/
        },
        //改变飞船的旋转角度
        move : function(e) {
            this.deg = Math.atan2(e.offsetX - (cW / 2), -(e.offsetY - (cH / 2)));
        }
    };

    return window.Player = Player;

})();