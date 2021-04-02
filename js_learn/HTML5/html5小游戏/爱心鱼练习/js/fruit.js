/**
 * Created by mac on 16/5/23.
 */
function FruitObj() {
    this.alive = []; //布尔值
    this.x = [];  //x坐标
    this.y = [];  //y坐标
    this.l = [];  //果实长度
    this.speed = [];  //果实长大的速度
    this.fruitType = []; //果实类型
    this.orange = new Image();
    this.blue = new Image();
}

//果实个数
FruitObj.prototype.num = 30;

//果实初始化
FruitObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.fruitType[i]= '';
        this.speed[i] = Math.random() * 0.017 + 0.003; // [0.003 , 0.02]  //速度
    }
    this.blue.src = './src/blue.png';
    this.orange.src = './src/fruit.png';
};

FruitObj.prototype.draw = function () {

    for (var i = 0; i < this.num; i++) {

        //this.alive[i] = true 的时候 。 锁定
        if (this.alive[i]) {

            //果实从小到大生长 ， 小于一个值的时候 ， 不然会一直放大
            if (this.l[i] <= 14) {
                this.l[i] += this.speed[i] * deltaTime;  //长度慢慢加大
            } else {
                this.y[i] -= this.speed[i] * 7 * deltaTime;
            }


            var pic;
            //对应果实的类型 ， 设置果实颜色
            if(this.fruitType[i] == 'blue'){
                pic = this.blue;
            }else{
                pic = this.orange;
            }

            //找到海葵的位置 , 绘制果实图片
            ctx2.drawImage(pic , this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

            //果实离开屏幕
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }

            //drawImage 参数
            //1 规定要使用的图像、画布或视频。
            //2 可选。开始剪切的 x 坐标位置。
            //3 可选。开始剪切的 y 坐标位置。
            //4 可选。被剪切图像的宽度。
            //5 可选。被剪切图像的高度。
            //6 在画布上放置图像的 x 坐标位置。
            //7 在画布上放置图像的 y 坐标位置。
            //8 可选。要使用的图像的宽度。（伸展或缩小图像）
            //9 可选。要使用的图像的高度。（伸展或缩小图像）
        }
    }
};

//果实出生，找到对应的海葵 ， 给 x , y , l 赋值  . //i 是海葵的索引
FruitObj.prototype.bron = function (i) {
    var aneID = Math.floor(Math.random() * ane.num);  //随机海葵位置
    this.x[i] = ane.x[aneID];  //果实的位置，对应的海葵
    this.y[i] = canHeight - ane.len[aneID];  //果实的位置，对应的海葵的哪个高度
    this.l[i] = 0;  //果实长度
    this.alive[i] = true;  //在这里设成true ， 果实很小的时候也可以被吃掉 ？ 但是分值一样 ？
    var ram = Math.random();
    if(ram < 0.2){
        this.fruitType[i] = 'blue';
    }else{
        this.fruitType[i] = 'orange';
    }
};


//发送果实
FruitObj.prototype.sendFruit = function(){
    for (var i = 0; i < this.num; i++) {
        // this.alive[i] = false 的时候 ， 取返
        if(!this.alive[i]){
            //这时候 , 找到对应的海葵执行 果实出生 函数
            this.bron(i);
            return;
        }
    }
};

//果实出生 ， 可以控制游戏中果实最大值
FruitObj.prototype.fruitMonitor = function(number){
    var num = 0;
    var maxNum = number || 15;
    for (var i = 0; i < this.num; i++) {
        //果实出生 ， this.alive[i] == true
        if (this.alive[i]) num++;
    }
    //如果小于15 ， 就发送果实
    if(num < maxNum){
        this.sendFruit();
        return;
    }

};

//果实被吃掉了的时候
FruitObj.prototype.dead = function(i){
    this.alive[i] = false;
};



