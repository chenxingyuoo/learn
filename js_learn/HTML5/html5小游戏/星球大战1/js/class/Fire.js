/**
 * Created by Administrator on 2016/9/24.
 */
;(function (){

    var expMusic = document.getElementById('expMusic');
    expMusic.playbackRate = 2.0; //两倍播放速度


    //子弹类
    function Fire() {
        this.distance = null;
        this.bullets = [];  //子弹
    }

    Fire.prototype = {
        draw: function (_class) {
            var self = this;
            for (var i = 0; i < self.bullets.length; i++) {
                if (!self.bullets[i].destroyed) {
                    ctx.save();
                    ctx.translate(cW / 2, cH / 2);
                    ctx.rotate(self.bullets[i].deg);

                    ctx.drawImage(
                        _class.sprite.img,
                        211,
                        100,
                        50,
                        75,
                        self.bullets[i].x,
                        self.bullets[i].y -= 20,  //每一次运行都减掉20 ， 实现动画效果
                        19,
                        30
                    );

                    ctx.restore();

                    //真实坐标
                    self.bullets[i].realX = (0) - (self.bullets[i].y + 10) * Math.sin(self.bullets[i].deg);
                    self.bullets[i].realY = (0) + (self.bullets[i].y + 10) * Math.cos(self.bullets[i].deg);

                    self.bullets[i].realX += cW / 2;
                    self.bullets[i].realY += cH / 2;

                    //子弹与陨石碰撞检测
                    for (var j = 0; j < _class.asteroid.asteroids.length; j++) {
                        if (!_class.asteroid.asteroids[j].destroyed) {
                            //平方根（陨石真实X坐标 - 子弹真实X坐标 2次幂 + 陨石真实Y坐标 - 子弹真实y坐标 2次幂 ）
                            self.distance = Math.sqrt(Math.pow(_class.asteroid.asteroids[j].realX - self.bullets[i].realX, 2) + Math.pow(_class.asteroid.asteroids[j].realY - self.bullets[i].realY, 2));
                            if (self.distance < (((_class.asteroid.asteroids[j].width / _class.asteroid.asteroids[j].size) / 2) - 4) + ((19 / 2) - 4)) {
                                _class.data.destroyed += 1;
                                expMusic.play();               //爆炸声播放
                                _class.asteroid.asteroids[j].destroyed = true; //陨石摧毁
                                self.bullets[i].destroyed = true; //子弹摧毁
                                _class.explosion.explosions.push(_class.asteroid.asteroids[j]); //爆炸绘制
                                localStorage.setItem("destroyed", _class.data.destroyed);//设置历史最高记录到本地储存
                            }
                        }
                    }

                }
            }
        }
    };

    return window.Fire = Fire;

})();