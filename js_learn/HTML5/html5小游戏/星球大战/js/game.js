/**
 * Created by Administrator on 2016/9/24.
 */
//飞船图片类 ， 雪碧图
/* function Sprite(){
 this.sprite = new Image();
 }

 Sprite.prototype = {
 init : function (){
 this.sprite.src = 'img/sprite.png';
 }
 };

 //爆炸图片类 ， 雪碧图
 function SpriteExplosion(){
 this.spriteExplosion = new Image();
 }

 SpriteExplosion.prototype = {
 init : function (){
 this.spriteExplosion.src = 'img/explosion.png';
 }
 };*/
(function () {
    // 当所有DOM解析完以后会触发这个事件
    window.addEventListener("DOMContentLoaded", game);

    //图片初始化
    var sprite = new Image();
    var spriteExplosion = new Image();


    window.onload = function () {
        sprite.src = 'img/sprite.png';
        spriteExplosion.src = 'img/explosion.png';
    };


    //Game
    function game() {
        //获取画布
        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            cH = ctx.canvas.height = window.innerHeight,
            cW = ctx.canvas.width = window.innerWidth;

        //获取音乐
        var expMusic = document.getElementById('expMusic'),
            gameoverMusic = document.getElementById('gameoverMusic');

        expMusic.playbackRate = 2.0; //两倍播放速度

        var bullets = [],        //子弹
            asteroids = [],        //陨石
            explosions = [],        //爆炸
            destroyed = 0,         //总的摧毁数目
            record = parseInt(localStorage.getItem('destroyed')) || 0,         //最高纪录
            count = 0,         //实时摧毁数
            playing = false,     //游戏是否进行中
            gameOver = false,     //游戏是否结束
            _planet = {deg: 0};  //飞船转动角度


        //飞船初始化
        var player = {
            posX: -35,
            posY: -(100 + 82),
            width: 70,
            height: 79,
            deg: 0
        };

        //canvas监听事件
        canvas.addEventListener('click', action);
        canvas.addEventListener('mousemove', action);
        window.addEventListener("resize", update);

        //resize
        function update() {
            cH = ctx.canvas.height = window.innerHeight;
            cW = ctx.canvas.width = window.innerWidth;
        }

        //改变飞船的旋转角度
        function move(e) {
            player.deg = Math.atan2(e.offsetX - (cW / 2), -(e.offsetY - (cH / 2)));
        }


        //返回指定区域的随机值
        function random(from, to) {
            return Math.floor(Math.random() * (to - from + 1)) + from;
        }


        //用户与游戏的交互逻辑
        function action(e) {
            e.preventDefault();
            if (playing) {        //如果游戏进行中，每点击一次填充一颗子弹
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

                bullets.push(bullet);
            } else {

                var dist;
                if (gameOver) {   //如果游戏结束 ， 可以点击重来

                    dist = Math.sqrt(((e.offsetX - cW / 2) * (e.offsetX - cW / 2)) + ((e.offsetY - (cH / 2 + 45 + 22)) * (e.offsetY - (cH / 2 + 45 + 22))));
                    if (dist < 27) {
                        if (e.type == 'click') {
                            gameOver = false;
                            count = 0;
                            bullets = [];
                            asteroids = [];
                            explosions = [];
                            destroyed = 0;
                            player.deg = 0;
                            canvas.removeEventListener('contextmenu', action);
                            canvas.removeEventListener('mousemove', move);
                            canvas.style.cursor = "default";
                        } else {
                            canvas.style.cursor = "pointer";
                        }
                    } else {
                        canvas.style.cursor = "default";
                    }
                } else {
                    dist = Math.sqrt(((e.offsetX - cW / 2) * (e.offsetX - cW / 2)) + ((e.offsetY - cH / 2) * (e.offsetY - cH / 2)));
                    //判断是否点中游戏开始按钮
                    if (dist < 27) {
                        if (e.type == 'click') {
                            playing = true;  // 游戏开始 ， 进行中
                            canvas.removeEventListener("mousemove", action);
                            canvas.addEventListener('contextmenu', action); // 可以使用鼠标右键进行游戏
                            canvas.addEventListener('mousemove', move);
                            canvas.setAttribute("class", "playing");
                            canvas.style.cursor = "default";
                        }else{
                            canvas.style.cursor = "pointer";
                        }
                    } else {
                        canvas.style.cursor = "default";
                    }
                    console.log(dist)
                }
            }
        }


        //子弹
        function fire() {
            var distance;
            for (var i = 0; i < bullets.length; i++) {
                if (!bullets[i].destroyed) {
                    ctx.save();
                    ctx.translate(cW / 2, cH / 2);
                    ctx.rotate(bullets[i].deg);

                    ctx.drawImage(
                        sprite,
                        211,
                        100,
                        50,
                        75,
                        bullets[i].x,
                        bullets[i].y -= 20,  //每一次运行都减掉20 ， 实现动画效果
                        19,
                        30
                    );

                    ctx.restore();

                    //真实坐标
                    bullets[i].realX = (0) - (bullets[i].y + 10) * Math.sin(bullets[i].deg);
                    bullets[i].realY = (0) + (bullets[i].y + 10) * Math.cos(bullets[i].deg);

                    bullets[i].realX += cW / 2;
                    bullets[i].realY += cH / 2;
                    //子弹与陨石碰撞检测
                    for (var j = 0; j < asteroids.length; j++) {
                        if (!asteroids[j].destroyed) {
                                                 //平方根（陨石真实X坐标 - 子弹真实X坐标 2次幂 + 陨石真实Y坐标 - 子弹真实y坐标 2次幂 ）
                            distance = Math.sqrt(Math.pow(asteroids[j].realX - bullets[i].realX, 2) + Math.pow(asteroids[j].realY - bullets[i].realY, 2));
                            if(distance < (((asteroids[j].width / asteroids[j].size) / 2) - 4) + ((19 / 2) - 4)){
                                destroyed += 1;
                                expMusic.play();               //爆炸声播放
                                asteroids[j].destroyed = true; //陨石摧毁
                                bullets[i].destroyed = true; //子弹摧毁
                                explosions.push(asteroids[j]); //爆炸绘制
                                localStorage.setItem("destroyed", destroyed);//设置历史最高记录到本地储存
                            }
                        }
                    }


                }
            }
        }

        //飞船绘制
        function _player() {
            ctx.save();
            ctx.translate(cW / 2, cH / 2);

            ctx.rotate(player.deg);
            ctx.drawImage(
                sprite,
                200,
                0,
                player.width,
                player.height,
                player.posX,
                player.posY,
                player.width,
                player.height
            );

            ctx.restore();

            //子弹发射
            if (bullets.length != 0) {
            }
            if (bullets.length - destroyed && playing) {
                fire();
            }
        }

        //星球绘制
        function planet() {

            var rootspeed = 0.1; //转动速度

            ctx.save();
            ctx.translate(cW / 2, cH / 2);
            ctx.rotate((_planet.deg += rootspeed) * (Math.PI / 180));
            ctx.drawImage(sprite, 0, 0, 200, 200, -100, -100, 200, 200);
            ctx.restore();
        }

        //陨石初始化
        function newAsteroid() {

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
            asteroids.push(asteroid);
        }

        //陨石运动
        function _asteroids(){

            var distance;

            for (var i = 0; i < asteroids.length; i++) {
                if(!asteroids[i].destroyed){
                    ctx.save();
                    ctx.translate(asteroids[i].coordsX, asteroids[i].coordsY);
                    ctx.rotate(asteroids[i].deg);

                    ctx.drawImage(
                        sprite,
                        asteroids[i].x,
                        asteroids[i].y,
                        asteroids[i].width,
                        asteroids[i].height,
                        -(asteroids[i].width / asteroids[i].size) / 2,
                        asteroids[i].moveY += 1 / (asteroids[i].size),
                        asteroids[i].width / asteroids[i].size,
                        asteroids[i].height / asteroids[i].size
                    );

                    ctx.restore();

                    //实际坐标 、 当前坐标
                    asteroids[i].realX = (0) - (asteroids[i].moveY + ((asteroids[i].height / asteroids[i].size) / 2)) * Math.sin(asteroids[i].deg);
                    asteroids[i].realY = (0) + (asteroids[i].moveY + ((asteroids[i].height / asteroids[i].size) / 2)) * Math.cos(asteroids[i].deg);

                    asteroids[i].realX += asteroids[i].coordsX;
                    asteroids[i].realY += asteroids[i].coordsY;

                    //游戏结束判断
                    distance = Math.sqrt(Math.pow(asteroids[i].realX - cW / 2, 2) + Math.pow(asteroids[i].realY - cH / 2, 2));
                    if (distance < (((asteroids[i].width / asteroids[i].size) / 2) - 4) + 100) {
                        gameoverMusic.play(); //播放结束声音
                        gameOver = true;
                        playing = false;
                        canvas.addEventListener('mousemove', action);
                    }
                }else if (!asteroids[i].extinct) {
                    explosion(asteroids[i]);
                }
            }

            //维持一定的陨石数量
            if (asteroids.length - destroyed < 10 + (Math.floor(destroyed / 6))) {
                newAsteroid();
            }
        }

        //爆炸雪碧图绘制
        function explosion(asteroid) {
            ctx.save();
            ctx.translate(asteroid.realX, asteroid.realY);
            ctx.rotate(asteroid.deg);

            var spriteY,
                spriteX = 256;
            if (asteroid.state == 0) {
                spriteY = 0;
                spriteX = 0;
            } else if (asteroid.state < 8) {
                spriteY = 0;
            } else if (asteroid.state < 16) {
                spriteY = 256;
            } else if (asteroid.state < 24) {
                spriteY = 512;
            } else {
                spriteY = 768;
            }

            if (asteroid.state == 8 || asteroid.state == 16 || asteroid.state == 24) {
                asteroid.stateX = 0;
            }

            ctx.drawImage(
                spriteExplosion,
                asteroid.stateX += spriteX,
                spriteY,
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


        //启动函数
        function start() {

            var local_destroyed = parseInt(localStorage.getItem('destroyed'));

            if (!gameOver) {
                ctx.clearRect(0, 0, cW, cH);
                ctx.beginPath();

                planet();   //星球绘制
                _player(); //飞船绘制


                //如果游戏开始或者进行中
                if (playing) {
                    //陨石初始化
                    _asteroids();

                    //游戏中的记录
                    ctx.font = "20px Verdana";
                    ctx.fillStyle = "white";
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = "left";

                    ctx.fillText('Record: ' +   record + '', 20, 30);

                    ctx.font = "40px Verdana";
                    ctx.fillStyle = "white";
                    ctx.strokeStyle = "black";
                    ctx.textAlign = "center";
                    ctx.textBaseline = 'middle';
                    ctx.strokeText('' + destroyed + '', cW / 2, cH / 2);
                    ctx.fillText('' + destroyed + '', cW / 2, cH / 2);
                } else {  //否则绘制开始按钮
                    ctx.drawImage(sprite, 428, 12, 70, 70, cW / 2 - 35, cH / 2 - 35, 70, 70);
                }
            } else if (count < 1) {
                count = 1;
                ctx.fillStyle = 'rgba(0,0,0,0.75)';
                ctx.rect(0, 0, cW, cH);
                ctx.fill();

                ctx.font = "60px Verdana";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", cW / 2, cH / 2 - 150);

                ctx.font = "20px Verdana";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Total destroyed: " + destroyed, cW / 2, cH / 2 + 140);

                //判断记录是否被替换

                record = local_destroyed || 0 > record ? local_destroyed  || 0: record;

                ctx.font = "20px Verdana";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("RECORD: " + record, cW / 2, cH / 2 + 185);

                ctx.drawImage(sprite, 500, 18, 70, 70, cW / 2 - 35, cH / 2 + 40, 70, 70);

            }
        }

        //循环
        (function drawFrame() {
            window.requestAnimationFrame(drawFrame);
            start();
        }())


    }


})();