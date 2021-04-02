/**
 * Created by Administrator on 2016/9/24.
 */
;(function (){
    //飞船图片类 ， 雪碧图
    function Sprite() {
        this.img = new Image();
    }

    Sprite.prototype = {
        init: function () {
            this.img.src = 'img/sprite.png';
        }
    };

    return window.Sprite = Sprite;
})();