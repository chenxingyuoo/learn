/**
 * Created by mac on 16/5/23.
 */
function AneObj(){
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.alpha = 0;
    this.amp = []
}

AneObj.prototype.num = 50;

//海葵初始化
AneObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;  //海葵绘制的x坐标
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50 ;
        this.amp[i] = Math.random() * 50 + 50;
    }
};

//海葵绘制
AneObj.prototype.draw = function(){
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);  //[-1 , 1]

    ctx2.save();  //保存当前环境的状态
    ctx2.globalAlpha = 0.6;  //透明度
    ctx2.lineWidth = 20;  //设置或返回当前的线条宽度
    ctx2.lineCap = "round";  //设置或返回线条的结束端点样式
    ctx2.strokeStyle = '#3b154e'; //设置或返回用于笔触的颜色、渐变或模式
    for (var i = 0; i < this.num; i++) {
        ctx2.beginPath();  //起始一条路径，或重置当前路径
        ctx2.moveTo(this.rootx[i], canHeight);  //把路径移动到画布中的指定点，不创建线条

        this.headx[i] = this.rootx[i] + l * this.amp[i];  //这样重新赋值 ， 果实生长的位置就可以访问到这个 headx 坐标。
        ctx2.quadraticCurveTo(this.rootx[i] , canHeight - 100 , this.headx[i] , this.heady[i] );

        ctx2.stroke();  //绘制已定义的路径
    }
    ctx2.restore(); //返回之前保存过的路径状态和属性
};