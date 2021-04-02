/**
 * Created by mac on 16/5/27.
 */
function WaveObj(){
    this.x = [];
    this.y = [];
    this.alive = []; //是否活著
    this.r = [];  //半徑
}

WaveObj.prototype.num = 10;

WaveObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
    }
};

//大鱼吃果实波浪绘制
WaveObj.prototype.draw = function(){
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowColor = 'white';
    ctx1.shadowBlur = 10;
    for (var i = 0; i < this.num; i++) {
        if(this.alive[i]){

            //半径变大
            this.r[i] += deltaTime * 0.04;
            //最大为50就消失
            if(this.r[i] > 50){
                this.alive[i] = false;
                break; //退出循环
            }

            var alpha = 1 - this.r[i] / 50;

            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0 , Math.PI * 2, true);
            //不关闭路径路径会一直保留下去，当然也可以利用这个特点做出意想不到的效果
            ctx1.closePath();
            ctx1.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
            ctx1.stroke();
        }
    }
    ctx1.restore();
};

//大鱼吃果实波浪出生
WaveObj.prototype.bron = function(x , y){
    for (var i = 0; i < this.num; i++) {
        if(!this.alive[i]){
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            //bron
            return
        }
    }
};