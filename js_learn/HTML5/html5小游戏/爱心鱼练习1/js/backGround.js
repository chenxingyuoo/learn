/**
 * Created by mac on 16/5/23.
 */
function drawBackGround(){
    this.bgPic = new Image();
}
drawBackGround.prototype.init = function(){
    //1.canvas2 绘制画布背景
    this.bgPic.src = './src/background.jpg';
};
drawBackGround.prototype.draw = function(){
    ctx2.drawImage(this.bgPic , 0 , 0 , canWidth, canHeight); ////向画布上绘制图像、画布或视频
};