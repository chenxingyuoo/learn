/**
 * Created by Administrator on 2016/9/24.
 */

(function () {
    // 当所有DOM解析完以后会触发这个事件
    window.addEventListener("DOMContentLoaded", gameInit);


    /*var starWarsGameObj = {
        sprite : null,
        spriteExplosion : null,
        canvas : null,
        ctx : null,
        cH : null,
        cW : null,
        expMusic : null,
        gameoverMusic : null,
        player : null,
        planet : null,
        fire : null,
        asteroid : null,
        explosion : null,
        action : null,
        bullets : [],
        asteroids : [],
        explosions : [],
        destroyed : [],
        record : parseInt(localStorage.getItem('destroyed')) || 0,
        count : 0,
        playing : false,
        gameOver : false,
        _planet : {deg: 0}
    };*/

    //图片初始化
    var sprite;
    var spriteExplosion;

    var canvas,
        ctx,
        cH,
        cW;

    var expMusic,
        gameoverMusic;

    var player; // 飞船

    var planet; // 星球

    var fire; // 子弹

    var asteroid; //陨石

    var explosion; //爆炸

    var action; //用户交互

    var bullets = [],        //子弹
        asteroids = [],        //陨石
        explosions = [],        //爆炸
        destroyed = 0,         //总的摧毁数目
        record = parseInt(localStorage.getItem('destroyed')) || 0,         //最高纪录
        count = 0,         //实时摧毁数
        playing = false,     //游戏是否进行中
        gameOver = false,     //游戏是否结束
        _planet = {deg: 0};  //飞船转动角度







    sprite = new Sprite();
    spriteExplosion = new SpriteExplosion();
    window.onload = function () {
        sprite.init();
        spriteExplosion.init();
    };









    //返回指定区域的随机值
    function random(from, to) {
        return Math.floor(Math.random() * (to - from + 1)) + from;
    }





    //Game
    function gameInit() {
        //获取画布
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        cH = ctx.canvas.height = window.innerHeight;
        cW = ctx.canvas.width = window.innerWidth;

        //获取音乐
        expMusic = document.getElementById('expMusic');
        gameoverMusic = document.getElementById('gameoverMusic');

        expMusic.playbackRate = 2.0; //两倍播放速度

        action = new Action();

        //canvas监听事件
        canvas.addEventListener('click', function (e) {
            action.mouseClick(e)
        });
        canvas.addEventListener('mousemove', function (e){
            action.mouseMove(e)
        });
        window.addEventListener("resize", update);

        //resize
        function update() {
            cH = ctx.canvas.height = window.innerHeight;
            cW = ctx.canvas.width = window.innerWidth;
        }




        //子弹实例化
        fire = new Fire();

        //飞船实例化
        player = new Player();

        //星球实例化
        planet = new Planet();

        //陨石类
        asteroid = new Asteroid();

        //爆炸类
        explosion = new Explosion();


        //启动函数
        function gameStart() {
            var local_destroyed = parseInt(localStorage.getItem('destroyed'));
            if (!gameOver) {
                ctx.clearRect(0, 0, cW, cH);
                ctx.beginPath();

                player.draw();//飞船绘制
                planet.draw();   //星球绘制

                //如果游戏开始或者进行中
                if (playing) {
                    asteroid.draw();  //陨石绘制

                    //游戏中的记录
                    ctx.font = "20px Verdana";
                    ctx.fillStyle = "white";
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = "left";
                    ctx.fillText('Record: ' + record + '', 20, 30);

                    ctx.font = "40px Verdana";
                    ctx.fillStyle = "white";
                    ctx.strokeStyle = "black";
                    ctx.textAlign = "center";
                    ctx.textBaseline = 'middle';
                    ctx.strokeText('' + destroyed + '', cW / 2, cH / 2);
                    ctx.fillText('' + destroyed + '', cW / 2, cH / 2);
                } else {  //否则绘制开始按钮
                    ctx.drawImage(sprite.img, 428, 12, 70, 70, cW / 2 - 35, cH / 2 - 35, 70, 70);
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
                record = local_destroyed || 0 > record ? local_destroyed || 0 : record;

                ctx.font = "20px Verdana";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("RECORD: " + record, cW / 2, cH / 2 + 185);

                ctx.drawImage(sprite.img, 500, 18, 70, 70, cW / 2 - 35, cH / 2 + 40, 70, 70);
            }
        }

        //循环
        (function drawFrame() {
            window.requestAnimationFrame(drawFrame);
            gameStart();
        }())

    }

})();