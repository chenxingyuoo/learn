/**
 * Created by mac on 16/5/23.
 */
function SmallFish(){
    this.x;
    this.y;
    this.angle;
    this.smallTail = new Image();
    this.smallEye = new Image();
    this.smallBody = new Image();
}

SmallFish.prototype.init = function(){
    this.x = canWidth * 0.5 ;//x轴开始在屏幕中间
    this.y = canHeight * 0.5 ;//y轴开始在屏幕中间

    this.angle = 0;

    this.smallTail.src = './src/babyTail0.png';
    this.smallBody.src = './src/babyFade0.png';
    this.smallEye.src = './src/babyEye0.png';
};

SmallFish.prototype.draw = function(){

    //让小于的坐标跟随大鱼的坐标
    this.x = lerpDistance(big_fish.x , this.x , 0.98);  //进行线性插值
    this.y = lerpDistance(big_fish.y , this.y , 0.98);

    //随着大鱼的方向， 计算出角度
    var detalX = big_fish.x - this.x;
    var detalY = big_fish.y - this.y;

    //通过坐标差计算
    var beta = Math.atan2(detalY , detalX) + Math.PI ; //返回-PI 到 PI 之间的值，是从 X 轴正向逆时针旋转到点 (x,y) 时经过的角度。

    this.angle = lerpAngle( beta, this.angle, 0.6 ) ;

    ctx1.save();
    ctx1.translate(this.x , this.y );  //	重新映射画布上的 (0,0) 位置
    ctx1.rotate(this.angle); //旋转当前绘图
    ctx1.drawImage(this.smallTail , -this.smallTail.width * 0.5 + 23, -this.smallTail.height * 0.5 );
    ctx1.drawImage(this.smallBody , -this.smallBody.width * 0.5 , -this.smallBody.height * 0.5 );
    ctx1.drawImage(this.smallEye , -this.smallEye.width * 0.5 , -this.smallEye.height * 0.5 );
    ctx1.restore();
};