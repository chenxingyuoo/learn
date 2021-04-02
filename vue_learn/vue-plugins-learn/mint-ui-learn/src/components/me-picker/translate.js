/**
 * 偏移样式控制
 * Created by chenxingyu on 2017/4/15.
 */
//doc样式
var docStyle = document.documentElement.style;
//内核
var engine;
//3d样式
var translate3d = false;

//获取内核
if (window.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
  engine = 'presto';
} else if ('MozAppearance' in docStyle) {
  engine = 'gecko';
} else if ('WebkitAppearance' in docStyle) {
  engine = 'webkit';
} else if (typeof navigator.cpuClass === 'string') {
  engine = 'trident';
}

//css的内核前缀
var cssPrefix = {trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-'}[engine];
//浏览器前缀
var vendorPrefix = {trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O'}[engine];

//帮助元素
var helperElem = document.createElement('div');
//透视属性
var perspectiveProperty = vendorPrefix + 'Perspective';
//转换属性
var transformProperty = vendorPrefix + 'Transform';
//转换样式名称
var transformStyleName = cssPrefix + 'transform';
//过度属性
var transitionProperty = vendorPrefix + 'Transition';
//过度样式名称
var transitionStyleName = cssPrefix + 'transition';
//过度结束属性
var transitionEndProperty = vendorPrefix.toLowerCase() + 'TransitionEnd';

//判断浏览器是否支持3d样式
if (helperElem.style[perspectiveProperty] !== undefined) {
  translate3d = true;
}


//获取偏移样式
var getTranslate = function(element) {
  var result = {left: 0, top: 0};
  if (element === null || element.style === null) {
    return result;
  }

  var transform = element.style[transformProperty];
  var matches = /translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g.exec(transform);
  if (matches) {
    result.left = +matches[1];
    result.top = +matches[3];
  }

  return result;
};

//清除偏移样式
var cleanTranslateElement = function(element) {
  if (element === null || element.style === null){
    return;
  }
  //获取transform样式值
  var transformValue = element.style[transformProperty];
  //如果有值则清除
  if (transformValue) {
    transformValue = transformValue.replace(/translate\(\s*(-?\d+(\.?\d+?)?)px,\s*(-?\d+(\.\d+)?)px\)\s*translateZ\(0px\)/g, '');
    element.style[transformProperty] = transformValue;
  }
};


//元素偏移
var translateElement = function(element, x, y) {
  if (x === null && y === null) {
    return;
  }

  if (element === null || element === undefined || element.style === null) {
    return;
  }

  if (!element.style[transformProperty] && x === 0 && y === 0) {
    return;
  }

  if (x === null || y === null) {
    //获取偏移样式
    var translate = getTranslate(element);
    if (x === null) {
      x = translate.left;
    }
    if (y === null) {
      y = translate.top;
    }
  }

  //清除偏移样式
  cleanTranslateElement(element);

  //设置偏移样式
  if (translate3d) {
    element.style[transformProperty] += ' translate(' + (x ? (x + 'px') : '0px') + ',' + (y ? (y + 'px') : '0px') + ') translateZ(0px)';
  } else {
    element.style[transformProperty] += ' translate(' + (x ? (x + 'px') : '0px') + ',' + (y ? (y + 'px') : '0px') + ')';
  }
};

export default {
  transformProperty: transformProperty,
  transformStyleName: transformStyleName,
  transitionProperty: transitionProperty,
  transitionStyleName: transitionStyleName,
  transitionEndProperty: transitionEndProperty,
  getElementTranslate: getTranslate,
  translateElement: translateElement,
  cleanTranslateElement: cleanTranslateElement
};
