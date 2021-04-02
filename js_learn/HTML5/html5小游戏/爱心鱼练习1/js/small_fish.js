/**
 * Created by mac on 16/5/23.
 */
function SmallFish(){
    this.x;
    this.y;
    this.angle;

    //计时器，计数器
    this.smallTailTimer = 0;
    this.smallTailCount = 0;

    //计时器，计数器
    this.smallEyeTimer = 0;
    this.smallEyeCount = 0;
    this.smallEyeInterval = 1000;

    //计时器，计数器
    this.smallBodyTimer = 0;
    this.smallBodyCount = 0;
/*
    this.smallTail = new Image();
    this.smallEye = new Image();
    this.smallBody = new Image();*/
}

SmallFish.prototype.init = function(){
    this.x = canWidth * 0.5 ;//x轴开始在屏幕中间
    this.y = canHeight * 0.5 ;//y轴开始在屏幕中间

    this.angle = 0;

    /*this.smallTail.src = './src/babyTail0.png';
    this.smallBody.src = './src/babyFade0.png';
    this.smallEye.src = './src/babyEye0.png';*/
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


    //8. 小鱼动画
    this.smallTailTimer += deltaTime;
    //计时器存储时间 , 50毫秒换一帧
    if(this.smallTailTimer > 50 ){
        this.smallTailCount = (this.smallTailCount + 1) % 8;
        this.smallTailTimer %= 50;
    }
    var smallTailCount = this.smallTailCount;

    //
    this.smallEyeTimer += deltaTime;
    if(this.smallEyeTimer > this.smallEyeInterval){
        this.smallEyeCount = (this.smallEyeCount + 1) % 2;
        this.smallEyeTimer %= this.smallEyeInterval;

        //鱼眨动眼睛有两种状态
        if(this.smallEyeCount == 0){
            this.smallEyeInterval = Math.random() * 1500 + 2000;  //[2000 - 3500]
        }else{
            this.smallEyeInterval = 200;  //闭眼
        }

    }
    var smallEyeCount = this.smallEyeCount;

    //
    this.smallBodyTimer += deltaTime;
    if(this.smallBodyTimer > 300){
        this.smallBodyCount  = (this.smallBodyCount + 1);
        this.smallBodyTimer %= 50;
        //大于十九就等于十九 ， 让它保持在身体变白的图片 ， 再提示 game over
        if(this.smallBodyCount > 19){
            this.smallBodyCount = 19;

            //game over
            data.gameOver = false;
        }
    }
    var smallBodyCount = this.smallBodyCount;


    ctx1.save();
    ctx1.translate(this.x , this.y );  //	重新映射画布上的 (0,0) 位置
    ctx1.rotate(this.angle); //旋转当前绘图
    ctx1.drawImage(smallFishTail[smallTailCount] , -smallFishTail[smallTailCount].width * 0.5 + 23, -smallFishTail[smallTailCount].height * 0.5 );
    ctx1.drawImage(smallFishBody[smallBodyCount] , -smallFishBody[smallBodyCount].width * 0.5 , -smallFishBody[smallBodyCount].height * 0.5 );
    ctx1.drawImage(smallFishEye[smallEyeCount] , -smallFishEye[smallEyeCount].width * 0.5 , -smallFishEye[smallEyeCount].height * 0.5 );
    ctx1.restore();
};