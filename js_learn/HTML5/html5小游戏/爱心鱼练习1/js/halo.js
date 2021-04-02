/**
 * Created by mac on 16/5/30.
 */
function HaloObj(){
    this.x = [];
    this.y = [];
    this.alive = [];
    this.r = [];
}

HaloObj.prototype.num = 5;

HaloObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.x[i] = 0;
        this.y[i] = 0;
        this.r[i] = 0;
        this.alive[i] = false;
    }
};

//大鱼喂小鱼光环出现;
HaloObj.prototype.bron = function(x , y){
    for (var i = 0; i < this.num; i++) {
        if(!this.alive[i]){
            //bron
            this.alive[i] = true;
            this.r[i] = 10;
            this.x[i] = x;
            this.y[i] = y;
            return
        }
    }
};

//大鱼喂小鱼光环绘制;
HaloObj.prototype.draw = function(){
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowColor = 'yellow';
    ctx1.shadowBlur = 10;
    for (var i = 0; i < this.num; i++) {
        if(this.alive[i]){
            //半径变大
            this.r[i] += deltaTime * 0.01;

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