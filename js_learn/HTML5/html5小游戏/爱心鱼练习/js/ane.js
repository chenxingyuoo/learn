/**
 * Created by mac on 16/5/23.
 */
function AneObj(){
    this.x = [];
    this.len = [];
}

AneObj.prototype.num = 50;

//海葵初始化
AneObj.prototype.init = function(){
    for (var i = 0; i < this.num; i++) {
        this.x[i] = i * 16 + Math.random() * 20;  //海葵绘制的x坐标
        this.len[i] = 200 + Math.random() * 50;  ////海葵绘制的长度
    }
};

//海葵绘制
AneObj.prototype.draw = function(){
    ctx2.save();  //保存当前环境的状态
    ctx2.globalAlpha = 0.6;  //透明度
    ctx2.lineWidth = 20;  //设置或返回当前的线条宽度
    ctx2.lineCap = "round";  //设置或返回线条的结束端点样式
    ctx2.strokeStyle = '#3b154e'; //设置或返回用于笔触的颜色、渐变或模式
    for (var i = 0; i < this.num; i++) {
        ctx2.beginPath();  //起始一条路径，或重置当前路径
        ctx2.moveTo(this.x[i], canHeight);  //把路径移动到画布中的指定点，不创建线条
        ctx2.lineTo(this.x[i], canHeight - this.len[i]);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
        ctx2.stroke();  //绘制已定义的路径
    }
    ctx2.restore(); //返回之前保存过的路径状态和属性
};