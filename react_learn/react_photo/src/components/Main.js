require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
var ReactDOM = require('react-dom');  // 不引入的话 ， 使用 React.findDOMNode 会报_react2.default.findDOMNode is not a function


//获取图片相关数据
var imgDatas = require('../data/imageData.json');

//自执行函数 ， 将图片名信息转化成图片url
imgDatas = (function getImageUrl(imgDataArr) {
  for(var i = 0, len = imgDataArr.length; i < len ; i++){
    var itemImage = imgDataArr[i];
    itemImage.imgUrl = require('../images/' + itemImage.fileName);
    imgDataArr[i] = itemImage;
  }
  return imgDataArr;
})(imgDatas);



var ImgFigure = React.createClass({


   handleClick : function (e) {
     console.log(this, e);

       //图片居中才翻转  ， 否则重新排列图片
       if(this.props.arrange.isCenter){
           this.props.inverse();
       }else {
           this.props.center();
       }
       e.stopPropagation();
   },

   render : function () {

     var styleObj = {};

     //如果props属性中定义了这张图片的位置， 则使用。
     if(this.props.arrange.pos){
       styleObj = this.props.arrange.pos
     }

     //如果图片的旋转角度有值且不为0 ， 添加旋转角度
     if(this.props.arrange.rotate){
       (['-webkit-', '-moz-','-ms-', '']).forEach(function (value) {
         styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
       }.bind(this));
     }

     // 如果是居中的图片， z-index设为11
     if (this.props.arrange.isCenter) {
       styleObj.zIndex = 11;
     }

     var imgFigureClassName = 'img-figure';
     imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

     return (
       <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
             <img src={this.props.data.imgUrl} alt={this.props.data.title}/>
             <figcaption>
                <h2 className="img-title">{this.props.data.title}</h2>
                <div className="img-back" onClick={this.handleClick}>
                   <p>{this.props.data.desc}</p>
                </div>
             </figcaption>
         </figure>
     );
   }
});

//获取区间的一个随机值
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

//获取0 - 30 度之间的任意正副值
function get30DegRandom() {
  return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);
}



//控制按钮
class ControllerUnit extends React.Component {
    handleClick(e) {
        // 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        var controlelrUnitClassName = "controller-unit";

        // 如果对应的是居中的图片，显示控制按钮的居中态
        if(this.props.arrange.isCenter){
            controlelrUnitClassName += " is-center";

            // // 如果同时对应的是翻转图片， 显示控制按钮的翻转态
            if (this.props.arrange.isInverse) {
                controlelrUnitClassName += " is-inverse";
            }
        }
        return (
                                                              //es6 要绑定this才可以访问this变量
            <span className={controlelrUnitClassName} onClick={this.handleClick.bind(this)}></span>
        );
    };
}



class AppComponent extends React.Component {

  Constant = {
      centerPos: { //中间位置的取值范围
        left: 0,
        right: 0
      },
      hPosRange: {  //水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {  //垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
  };


  //es6 状态初始化
  constructor(props) {
    super(props);
    this.state = {imgsArrangeArr: []};
  }

  //es5 状态初始化
  /*getInitialState : function(){
   return {
   imgsArrangeArr : [
   /!*pos : {
   left : '0',
   top : '0'
   },
   rotate : 0  //旋转角度
   isInverse : false //图片正反面状态
   isCenter : false  //图片是否居中
   *!/
   ]
   }
   }*/

  /*
   * 翻转图片
   * @param idnex 输入当前被执行inverse操作的图片对应的图片信息数组的index值
   * @return {Function} 这个一个闭包函数 ， 其实return一个真正待被执行的函数
   */

  inverse (index){
     return function () {
       var imgsArrangeArr = this.state.imgsArrangeArr;
       imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

       this.setState({
         imgsArrangeArr : imgsArrangeArr
       });
     }.bind(this);
  }


    /*
     * 利用arrange函数， 居中对应index的图片
     * @param index, 需要被居中的图片对应的图片信息数组的index值
     * @returns {Function}
     */
    center (index) {
        return function () {
            this.rearrange(index);
        }.bind(this);
    };

  /*
   * 重新布局所有图片
   */
  rearrange (centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.ceil(Math.random() * 2),
        //取一个或者不取
        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex , 1);



      imgsArrangeCenterArr[0] = {
          pos : centerPos,   //首先居中centerIndex 的图片
          rotate : 0,  //居中的图片不需要旋转
          isCenter : true

      }  ;


    //取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    //布局位于上侧的图片
    imgsArrangeTopArr.forEach(function (value, index) {

      imgsArrangeTopArr[index] = {
        pos : {
          top : getRangeRandom(vPosRangeTopY[0] , vPosRangeTopY[1]),
          left : getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate : get30DegRandom(),
        isCenter : false
      };

    });


    //布局左右两侧的图片
    for(var i = 0 , len = imgsArrangeArr.length, k = len / 2; i < len; i++){
      var hPosRangeLORX = null;

      //前半边布局到左边 ， 后半边布局到右边
      if(i < k){
        hPosRangeLORX = hPosRangeLeftSecX;
      }else{
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i] = {
        pos : {
          top : getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left : getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate : get30DegRandom(),
        isCenter : false
      }

    }

    if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
      //开始位置 ， 要删除项目数量的个数， 向数组添加的新项目
      imgsArrangeArr.splice(topImgSpliceIndex, 0 , imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr : imgsArrangeArr
    })

  }

  //组件加载以后 ， 为每张图片计算其位置的范围
  componentDidMount (){

    //首先拿到舞台的大小
    var stageDom = this.refs.stage,
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);



    //拿到一个imgFigure的大小
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);


    //取到中心点的值
    this.Constant.centerPos = {
      left : halfStageW - halfImgW,
      top : halfStageH - halfImgH
    };

    //计算左侧、右侧图片的位置点的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上侧区域图片排布区域的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }

  render() {
    var navUnits = [],
        imgFigures = [];

    imgDatas.forEach(function (value, index) {

      //如果当前没有状态对象 , 那么就去初始化它这个状态对象
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
           pos : {
             left : '0',
             top : '0'
           },
           rotate : 0,
           isInverse : false,
           isCenter : false
        }
      };

      imgFigures.push(<ImgFigure  key={index} data={value} ref={'imgFigure' + index}
      arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);

      navUnits.push(<ControllerUnit  key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
      center={this.center(index)}/>);
     }.bind(this));

    return (
       <section className="wrap" ref="stage">
           <section className="img-sec">
              {imgFigures}
           </section>
            <nav className="controller-nav">
               {navUnits}
            </nav>
        </section>
    );
  }
}


AppComponent.defaultProps = {};

export default AppComponent;
