/**
 * Created by Administrator on 2016/9/24.
 */
;(function (){

    //爆炸图片类 ， 雪碧图
    function SpriteExplosion() {
        this.img = new Image();
    }

    SpriteExplosion.prototype = {
        init: function () {
            this.img.src = 'img/explosion.png';
        }
    };

    return window.SpriteExplosion = SpriteExplosion;
})();