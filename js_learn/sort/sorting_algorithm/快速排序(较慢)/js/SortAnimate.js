/**
 * Created by mac on 16/5/28.
 */
function SortAnimate( array, wrapper ){
    this.array = array.slice();
    this.max = Math.max.apply(Math, array);
    this.columns = [];
    this.wrapper = wrapper || document.body;
    this.index = -1;
    this.animte = [];
    this.html = "";
    this.init();
};

SortAnimate.prototype.init = function(){
    var html = "";
    for(var i=0; i<this.array.length; i++){
        html += this.getColumn(this.array[i] /*, this.array[i]*/);
    }

    console.log(html)
    this.html = html;

    console.log(this.wrapper)
    this.wrapper.innerHTML = this.html;
    this.columns = this.wrapper.getElementsByClassName("column");
};

//获取高度
SortAnimate.prototype.getHeight = function( number ){
    return parseInt(number/this.max*100);
};

//获取数组的总数
SortAnimate.prototype.getColumn = function(number){
    return '<div class="column" style="height:'+this.getHeight(number)+'%" title="'+ number +'" ></div>';
};


SortAnimate.prototype.blurOne = function( index ){
    this.animte.push({
        type:"uiBlurOne",
        data:[index]
    });
};

SortAnimate.prototype.blurFragment = function(startIndex, endIndex){
    startIndex = startIndex < 0 ? 0 : startIndex;
    this.animte.push({
        type:"uiBlurFragment",
        data:[startIndex, endIndex]
    });
};






//交换两个数的位置
SortAnimate.prototype.uiExchange = function( index1, index2 ){
    console.log('uiExchange')
    var tmp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = tmp;

    this.uiSetHeight(index1);
    this.uiSetHeight(index2);
},

//交换两个数的位置
SortAnimate.prototype.exchange = function(index1, index2){
    this.highlight(index1, index2);
    this.unHighlight(index1, index2);

    this.animte.push({
        type:"uiExchange",
        data:[index1, index2]
    });
};



SortAnimate.prototype.highlight = function( index1, index2 ){
    this.animte.push({
        type:"uiHighlightOne",
        data:[index1, index2]
    });
};

SortAnimate.prototype.unHighlight = function(index1, index2){
    this.animte.push({
        type:"uiUnHighlightOne",
        data:[index1, index2]
    });
};

//设置高度
SortAnimate.prototype.uiSetHeight = function( index ){
    var number = this.array[index];
    this.columns[index].style.height = this.getHeight( number )+"%";
    this.columns[index].title = number;
};

//高度高亮
SortAnimate.prototype.uiHighlightOne = function(index1, index2){
    this.columns[index1].className += " highlight";
    this.columns[index2].className += " highlight";
};
//取消高度高亮
SortAnimate.prototype.uiUnHighlightOne = function(index1, index2){
    this.columns[index1].className = this.columns[index1].className.replace(" highlight", "");
    this.columns[index2].className = this.columns[index2].className.replace(" highlight", "");
},



SortAnimate.prototype.activeFragment =  function(startIndex, endIndex){
    startIndex = startIndex < 0 ? 0 : startIndex;
    this.animte.push({
        type:"uiActiveFragment",
        data:[startIndex, endIndex]
    });
};



SortAnimate.prototype.activeOne = function( index ){
    this.animte.push({
        type:"uiActiveOne",
        data:[index]
    });
};
//激活第 index 个元素
SortAnimate.prototype.uiActiveOne = function( index ){
    this.columns[index].className += " focus";
};


//取消激活 index 个元素
SortAnimate.prototype.uiBlurOne = function( index ){
    this.columns[index].className = this.columns[index].className.replace(" focus", "");
};
//

//激活数组中一个片段
SortAnimate.prototype.uiActiveFragment = function(startIndex, endIndex){
    //console.log("uiActiveFragment", startIndex, endIndex);
    this.startIndex = startIndex;
    this.endIndex = endIndex;
    for(var i= startIndex; i<endIndex; i++){
        this.columns[i].className += " active";
    }
};

//取消激活数组中一个片段
SortAnimate.prototype.uiBlurFragment = function(startIndex, endIndex){

    startIndex = startIndex || this.startIndex;
    endIndex = endIndex || this.endIndex;

    for(var i= startIndex; i<endIndex; i++){
        this.ui.columns[i].className = this.ui.columns[i].className.replace(" active","");
    }
};

/**
 play 播放排序动画
 id 容器id
 speed 速度单位毫秒
 */
SortAnimate.prototype.play = function( speed ){

    clearInterval( SortAnimate.interid );
    this.speed = speed || this.speed;
    var animate = this.animte;
    var len = animate.length;
    var self = this;
    SortAnimate.interid = setInterval(function(){
        self.index++;
        if(self.index<len){
            try{
                self[animate[self.index].type].apply( self, animate[self.index].data);
            }catch(e){
                console.log(animate[self.index].type)
            }

        }else{
            clearInterval( SortAnimate.interid );
        }
    }, this.speed);
};