/**
 * Created by mac on 16/5/23.
 */
function BigFish(){
    this.x;
    this.y;
    this.angle;
    this.bigTail = new Image();
    this.bigEye = new Image();
    this.bigBody = new Image();
}

//大鱼初始化
BigFish.prototype.init = function(){
    this.x = canWidth * 0.5 ;//x轴开始在屏幕中间
    this.y = canHeight * 0.5 ;//y轴开始在屏幕中间

    this.angle = 0;

    this.bigTail.src = './src/bigTail0.png';
    this.bigBody.src = './src/big.png';
    this.bigEye.src = './src/bigEye0.png';

};

//大鱼绘制
BigFish.prototype.draw = function(){

    //进行线性插值 ， 返回一个值趋向于一个值 。   //1参 目标值，2参当前值 ， 3参百分比
    this.x = lerpDistance(mouseX , this.x , 0.95);
    this.y = lerpDistance(mouseY , this.y , 0.95);

    //随着鼠标的方向 ， 计算出角度
    var detalX = mouseX - this.x;
    var detalY = mouseY - this.y;
    //通过坐标差计算
    var beta = Math.atan2(detalY , detalX) + Math.PI ; //返回-PI 到 PI 之间的值，是从 X 轴正向逆时针旋转到点 (x,y) 时经过的角度。

    this.angle = lerpAngle( beta, this.angle, 0.6 ) ;

    ctx1.save();
    ctx1.translate(this.x , this.y );  //	重新映射画布上的 (0,0) 位置
    ctx1.rotate(this.angle); //旋转当前绘图
    ctx1.drawImage(this.bigTail , -this.bigTail.width * 0.5 + 30, -this.bigTail.height * 0.5 );
    ctx1.drawImage(this.bigBody , -this.bigBody.width * 0.5 , -this.bigBody.height * 0.5 );
    ctx1.drawImage(this.bigEye , -this.bigEye.width * 0.5 , -this.bigEye.height * 0.5 );
    ctx1.restore();  //返回之前保存过的路径状态和属性
};