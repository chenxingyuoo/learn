/**
 * Created by mac on 16/5/24.
 */
function DataObj(){
    this.fruitNum; //果实数量
    this.double;  //倍数
    this.scores;  //分数
    this.gameOver = true; //游戏状态 ， 是否结束
    this.alpha = 0;   //游戏状态 , 提示的透明度
}

//数据初始化
DataObj.prototype.init = function(){
    this.fruitNum = 0;
    this.double = 1;
    this.scores = 0;
};

//分值重置
/*DataObj.prototype.reset = function(){
    this.fruitNum = 0;
    this.double = 1;
};*/


//绘制分值
DataObj.prototype.draw = function(){
    var w = can1.width;
    var h = can1.height;

    ctx1.save();

    ctx1.fillStyle = 'white'; //设置或返回用于填充绘画的颜色、渐变或模式

    ctx1.fillText('果实(fruit): ' + this.fruitNum, w * 0.5 , h  - 80 );  //在画布上绘制“被填充的”文本
    ctx1.fillText('倍数(double): ' + this.double, w * 0.5 , h  - 50 );
    ctx1.fillText('分数(scores): ' + this.scores, w  - 100 ,  50 );
    if(!this.gameOver){
        //透明度
        this.alpha += deltaTime * 0.0005;
        if(this.alpha > 1){
            this.alpha = 1;
        }

        ctx1.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
        ctx1.fillText('game over', w  * 0.5 , h *  0.5 );
    }
    ctx1.restore();
};

//大鱼喂果实小鱼，得分的时候
DataObj.prototype.addScore = function(){
                                //100分一个
    this.scores += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
};