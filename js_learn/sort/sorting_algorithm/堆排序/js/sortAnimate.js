/**
 * Created by mac on 16/5/30.
 */
//排序动画构造器
function SortAnimate(array, wrapper){
    this.array = array.slice();
    this.max = Math.max.apply(Math, array);
    this.ui = {items : [] , wrapper : wrapper || document.body};
    this.animte = [];
    this.index = -1;
    this.html = '';
    this.speed = 0;
    this.init();
}

SortAnimate.prototype.init = function(){
    var html = '';
    for (var i = 0; i < this.array.length; i++) {
        html += this.setDom(this.array[i]);
    }

    this.html = html;
    this.ui.wrapper.innerHTML = this.html;
    this.ui.items = this.ui.wrapper.querySelectorAll(".items");
};


//获取高度
SortAnimate.prototype.getHeight = function(i){
    return parseInt( i / this.max * 100);
};

//初始化设置dom
SortAnimate.prototype.setDom = function (i) {
    return '<div class="items" style="height:'+this.getHeight(i)+'%" title="items'+ i +'" ></div>'
};

//添加交换两个数的位置
SortAnimate.prototype.exChange = function(index1, index2){
    this.animte.push({
        type:"uiExchange",
        data:[index1, index2]   //储存在一个data数组里面 ， 后面利用分布函数调用的时候传的参数
    });
};

//交换两个数的位置
SortAnimate.prototype.uiExchange = function( index1, index2 ){
    //交换两个数的位置
    var tmp = this.array[index1];  //这里要用个临时变量储存 index1 的值 或者 index2 的值 。因为下面的代码就要把这个值重新赋值了。
    this.array[index1] = this.array[index2];
    this.array[index2] = tmp;

    //改变两个数的高度
    this.setDomHeight(index1);
    this.setDomHeight(index2);
};

//改变速度
SortAnimate.prototype.changeSpeed = function( speed ){
    this.speed = speed;
    this.play();
};

//设置高度, 改变两个数的高度
SortAnimate.prototype.setDomHeight = function( index ){
    var number = this.array[index];
    //改变样式
    this.ui.items[index].style.height = this.getHeight( number )+"%";
    //改变属性
    this.ui.items[index].title = number;
};

//获取速度
SortAnimate.prototype.getSpeed = function(){
    return this.speed =  200 - document.getElementById('speed').value; //获取速度
};

//播放动画 利用setInterval执行每一帧的动画
SortAnimate.prototype.play = function( speed ){
    clearInterval( SortAnimate.interid );
    this.speed = speed || this.getSpeed();  //获取速度
    var animate = this.animte;  //setInterval 里面访问不到this变量 ， 所以要用个临时变量保存起来
    var len = animate.length;  //交换位置的动作的长度（也就是要执行这么多次）；
    var self = this;
    SortAnimate.interid = setInterval(function(){
        self.index++;
        if(self.index < len){
            try{
                self[animate[self.index].type].apply(self, animate[self.index].data);
            }catch(e){
                console.log(animate[self.index].type);
            }
        }else{
            clearInterval( SortAnimate.interid );
        }
    },this.speed)
};