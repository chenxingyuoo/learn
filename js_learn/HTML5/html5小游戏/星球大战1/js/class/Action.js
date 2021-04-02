/**
 * Created by Administrator on 2016/9/24.
 */
;(function () {

    function Action(bullets) {
        this.bullets = bullets
    }

    Action.prototype = {
        mouseMove: function (e, data) {
            e.preventDefault();

            function getCursorStyle(dist) {
                if (dist < 27) {
                    canvas.style.cursor = "pointer";
                } else {
                    canvas.style.cursor = "default";
                }
            }

            if (!data.playing) {
                var dist;
                if (data.gameOver) {   //如果游戏结束
                    dist = Math.sqrt(((e.offsetX - cW / 2) * (e.offsetX - cW / 2)) + ((e.offsetY - (cH / 2 + 45 + 22)) * (e.offsetY - (cH / 2 + 45 + 22))));
                    getCursorStyle(dist);
                } else {
                    dist = Math.sqrt(((e.offsetX - cW / 2) * (e.offsetX - cW / 2)) + ((e.offsetY - cH / 2) * (e.offsetY - cH / 2)));
                    getCursorStyle(dist);
                }
            }
        },
        mouseClick: function (e, _class) {  //接受各个类作为参数
            debugger;
            e.preventDefault();
            var self = this;
            if (_class.data.playing) {        //如果游戏进行中，每点击一次填充一颗子弹
                var bullet = {
                    x: -8,
                    y: -179,
                    sizeX: 2,
                    sizeY: 10,
                    realX: e.offsetX,
                    realY: e.offsetY,
                    dirX: e.offsetX,
                    dirY: e.offsetY,
                    deg: Math.atan2(e.offsetX - (cW / 2), -(e.offsetY - (cH / 2))),
                    destroyed: false
                };

                _class.fire.bullets.push(bullet);

            } else {
                var dist;
                if (_class.data.gameOver) {   //如果游戏结束 ， 可以点击重来
                    dist = Math.sqrt(((e.offsetX - cW / 2) * (e.offsetX - cW / 2)) + ((e.offsetY - (cH / 2 + 45 + 22)) * (e.offsetY - (cH / 2 + 45 + 22))));
                    if (dist < 27) {
                        _class.data.gameOver = false;
                        _class.data.count = 0;
                        _class.fire.bullets = [];
                        _class.asteroid.asteroids = [];
                        _class.explosion.explosions = [];
                        _class.data.destroyed = 0;
                        _class.player.init();
                        canvas.removeEventListener('contextmenu', self.mouseClick);
                        canvas.removeEventListener('mousemove', _class.player.move);
                        canvas.style.cursor = "default";
                    } else {
                        canvas.style.cursor = "default";
                    }
                } else {
                    dist = Math.sqrt(((e.offsetX - cW / 2) * (e.offsetX - cW / 2)) + ((e.offsetY - cH / 2) * (e.offsetY - cH / 2)));
                    //判断是否点中游戏开始按钮
                    if (dist < 27) {
                        _class.data.playing = true;  // 游戏开始 ， 进行中
                        canvas.removeEventListener("mousemove", self.mouseMove);
                        // 可以使用鼠标右键进行游戏
                        canvas.addEventListener('contextmenu', function (e) {
                            self.mouseClick(e, _class);
                        });
                        canvas.addEventListener('mousemove', function (e) {
                            _class.player.move(e);
                        });
                        canvas.setAttribute("class", "playing");
                        canvas.style.cursor = "default";
                    } else {
                        canvas.style.cursor = "default";
                    }
                }
            }
        }
    };

    return window.Action = Action;
})();