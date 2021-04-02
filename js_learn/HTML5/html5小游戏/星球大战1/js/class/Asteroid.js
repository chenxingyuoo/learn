/**
 * Created by Administrator on 2016/9/24.
 */
;(function (){
    var gameoverMusic = document.getElementById('gameoverMusic');

    //陨石类
    function Asteroid(){
        this.distance = null;
        this.asteroids = [];
    }

    Asteroid.prototype = {
        update : function (){
            //随机大小
            var type = random(1, 4),
                coordsX,
                coordsY;

            //随机位置
            switch (type) {
                case  1 :
                    coordsX = random(0, cW);
                    coordsY = 0 - 50;
                    break;
                case 2 :
                    coordsX = cW + 150;
                    coordsY = random(0, cH);
                    break;
                case 3 :
                    coordsX = random(0, cW);
                    coordsY = cH + 150;
                    break;
                case 4 :
                    coordsX = 0 - 150;
                    coordsY = random(0, cH);
                    break;
            }

            var asteroid = {
                x: 278,
                y: 0,
                state: 0,
                stateX: 0,
                width: 134,
                height: 123,
                realX: coordsX,
                realY: coordsY,
                moveY: 0,
                coordsX: coordsX,
                coordsY: coordsY,
                size: random(1, 3),
                deg: Math.atan2(coordsX - (cW / 2), -(coordsY - (cH / 2))),
                destroyed: false
            };
            this.asteroids.push(asteroid);
        },
        draw : function (_class){
            var self = this;

            for (var i = 0; i < self.asteroids.length; i++) {
                if (!self.asteroids[i].destroyed) {
                    ctx.save();
                    ctx.translate(self.asteroids[i].coordsX, self.asteroids[i].coordsY);
                    ctx.rotate(self.asteroids[i].deg);

                    ctx.drawImage(
                        _class.sprite.img,
                        self.asteroids[i].x,
                        self.asteroids[i].y,
                        self.asteroids[i].width,
                        self.asteroids[i].height,
                        -(self.asteroids[i].width / self.asteroids[i].size) / 2,
                        self.asteroids[i].moveY += 1 / (self.asteroids[i].size),
                        self.asteroids[i].width / self.asteroids[i].size,
                        self.asteroids[i].height / self.asteroids[i].size
                    );

                    ctx.restore();

                    //实际坐标 、 当前坐标
                    self.asteroids[i].realX = (0) - (self.asteroids[i].moveY + ((self.asteroids[i].height / self.asteroids[i].size) / 2)) * Math.sin(self.asteroids[i].deg);
                    self.asteroids[i].realY = (0) + (self.asteroids[i].moveY + ((self.asteroids[i].height / self.asteroids[i].size) / 2)) * Math.cos(self.asteroids[i].deg);

                    self.asteroids[i].realX += self.asteroids[i].coordsX;
                    self.asteroids[i].realY += self.asteroids[i].coordsY;

                    //游戏结束判断
                    self.distance = Math.sqrt(Math.pow(self.asteroids[i].realX - cW / 2, 2) + Math.pow(self.asteroids[i].realY - cH / 2, 2));
                    if (self.distance < (((self.asteroids[i].width / self.asteroids[i].size) / 2) - 4) + 100) {
                        gameoverMusic.play(); //播放结束声音
                        _class.data.gameOver = true;
                        _class.data.playing = false;
                        canvas.addEventListener('mousemove', function (e){
                            _class.action.mouseMove(e, _class.data);
                        });
                        // canvas.addEventListener('mousedown', action.mouseClick);
                    }
                } else if (!self.asteroids[i].extinct) {
                    debugger;
                    _class.explosion.draw(self.asteroids[i], _class.spriteExplosion);
                }
            }

            //维持一定的陨石数量
            if (self.asteroids.length - _class.data.destroyed < 10 + (Math.floor(_class.data.destroyed / 6))) {
                self.update();
            }
        }
    };

    return window.Asteroid = Asteroid;

})();