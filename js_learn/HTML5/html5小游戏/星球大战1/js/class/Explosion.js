/**
 * Created by Administrator on 2016/9/24.
 */
;(function (){

    //爆炸类
    function Explosion(){
        this.spriteY = null;
        this.spriteX = 256;
        this.explosions = [];
    }

    Explosion.prototype = {
        draw : function (asteroid, spriteExplosion){
            debugger;
            var self = this;
            ctx.save();
            ctx.translate(asteroid.realX, asteroid.realY);
            ctx.rotate(asteroid.deg);

            if (asteroid.state == 0) {
                self.spriteY = 0;
                self.spriteX = 0;
            } else if (asteroid.state < 8) {
                self.spriteY = 0;
            } else if (asteroid.state < 16) {
                self.spriteY = 256;
            } else if (asteroid.state < 24) {
                self.spriteY = 512;
            } else {
                self.spriteY = 768;
            }

            if (asteroid.state == 8 || asteroid.state == 16 || asteroid.state == 24) {
                asteroid.stateX = 0;
            }

            debugger;
            ctx.drawImage(
                spriteExplosion.img,
                asteroid.stateX += self.spriteX,
                self.spriteY,
                256,
                256,
                -(asteroid.width / asteroid.size) / 2,
                -(asteroid.height / asteroid.size) / 2,
                asteroid.width / asteroid.size,
                asteroid.height / asteroid.size
            );

            asteroid.state += 1;

            if (asteroid.state == 31) {
                asteroid.extinct = true;
            }

            ctx.restore();
        }
    };

    return window.Explosion = Explosion;

})();