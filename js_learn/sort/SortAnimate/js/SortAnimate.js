
/**
	记录数组排序过程的步骤
	
	options
	
*/



function SortAnimate( array, wrapper ){
	this.array = array.slice();
	this.max = Math.max.apply(Math, array);
	this.ui = {columns:[], wrapper:wrapper || document.body};
	this.index = -1;
	this.animte = [];
	this.html = "";
	this.init();
};
SortAnimate.prototype = {
	//初始化
	init:function(){
		var html = "";
		for(var i=0; i<this.array.length; i++){
			html += this.getColumn(this.array[i] /*, this.array[i]*/);
		}
		this.html = html;
		
		this.ui.wrapper.innerHTML = this.html;
		this.ui.columns = this.ui.wrapper.getElementsByClassName("column");

	},

	//获取高度
	getHeight:function( number ){
		return parseInt(number/this.max*100);
	},
	//获取数组的总数
	getColumn:function( number){
		return '<div class="column" style="height:'+this.getHeight(number)+'%" title="'+ number +'" ></div>';
	},




	//交换两个数的位置
	uiExchange:function( index1, index2 ){
		console.log('uiExchange')
		var tmp = this.array[index1];
		this.array[index1] = this.array[index2];
		this.array[index2] = tmp;
		
		this.uiSetHeight(index1);
		this.uiSetHeight(index2);
	},

	//设置高度
	uiSetHeight:function( index ){
		var number = this.array[index];
		this.ui.columns[index].style.height = this.getHeight( number )+"%";
		this.ui.columns[index].title = number;
	},
	//高度高亮
	uiHighlightOne:function(index1, index2){
		this.ui.columns[index1].className += " highlight";
		this.ui.columns[index2].className += " highlight";
	},
	//取消高度高亮
	uiUnHighlightOne:function(index1, index2){
		this.ui.columns[index1].className = this.ui.columns[index1].className.replace(" highlight", "");
		this.ui.columns[index2].className = this.ui.columns[index2].className.replace(" highlight", "");
	},
	//激活第 index 个元素
	uiActiveOne:function( index ){
		this.ui.columns[index].className += " focus";
	},
	//取消激活 index 个元素
	uiBlurOne:function( index ){
		this.ui.columns[index].className = this.ui.columns[index].className.replace(" focus", "");
	},
	//激活数组中一个片段
	uiActiveFragment:function(startIndex, endIndex){
		//console.log("uiActiveFragment", startIndex, endIndex);
		this.startIndex = startIndex;
		this.endIndex = endIndex;
		for(var i= startIndex; i<endIndex; i++){
			this.ui.columns[i].className += " active";
		}
	},
	//取消激活数组中一个片段
	uiBlurFragment:function(startIndex, endIndex){
		
		startIndex = startIndex || this.startIndex;
		endIndex = endIndex || this.endIndex;
		
		for(var i= startIndex; i<endIndex; i++){
			this.ui.columns[i].className = this.ui.columns[i].className.replace(" active","");
		}
	},
	activeOne:function( index ){
		this.animte.push({
			type:"uiActiveOne",
			data:[index]
		});
	},
	blurOne:function( index ){
		this.animte.push({
			type:"uiBlurOne",
			data:[index]
		});
	},
	exchange:function(index1, index2){
		this.highlight(index1, index2);
		this.unHighlight(index1, index2);
		
		this.animte.push({
			type:"uiExchange",
			data:[index1, index2]
		});
	},
	activeFragment:function(startIndex, endIndex){
		startIndex = startIndex < 0 ? 0 : startIndex; 
		this.animte.push({
			type:"uiActiveFragment",
			data:[startIndex, endIndex]
		});
	},
	blurFragment:function(startIndex, endIndex){
		startIndex = startIndex < 0 ? 0 : startIndex;
		this.animte.push({
			type:"uiBlurFragment",
			data:[startIndex, endIndex]
		});
	},

	highlight:function( index1, index2 ){
		this.animte.push({
			type:"uiHighlightOne",
			data:[index1, index2]
		});
	},

	unHighlight:function(index1, index2){
		this.animte.push({
			type:"uiUnHighlightOne",
			data:[index1, index2]
		});
	},
	//改变速度
	changeSpeed:function( speed ){
		this.speed = speed;
		this.play();
	},
	/**
		play 播放排序动画
		id 容器id
		speed 速度单位毫秒
	*/
	play:function( speed ){
			
		clearInterval( SortAnimate.interid );
		this.speed = speed || this.speed;
		var animate = this.animte;
		var len = animate.length;
		var self = this;
		SortAnimate.interid = setInterval(function(){
			self.index++
			if(self.index<len){
				self[animate[self.index].type].apply( self, animate[self.index].data);
			}else{
				clearInterval( SortAnimate.interid );
			}
		}, this.speed);
	}
};