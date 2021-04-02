/**
 * Created by Administrator on 2016/9/24.
 */
;(function (){

    //星球类
    function Planet() {
        this.rootspeed = 0.1;//转动速度
        this.deg = 0; //旋转角度
    }

    Planet.prototype = {
        draw: function (sprite) {
            ctx.save();
            ctx.translate(cW / 2, cH / 2);
            ctx.rotate((this.deg += this.rootspeed ) * (Math.PI / 180));
            ctx.drawImage(sprite.img, 0, 0, 200, 200, -100, -100, 200, 200);
            ctx.restore();
        }
    };

    return window.Planet = Planet;

})();