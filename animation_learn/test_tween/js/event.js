/**
 * 事件处理
 * Created by chenxingyu on 2017/4/15.
 */

//绑定事件
var bindEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    //重写bindEvent
    bindEvent = function (elem, type, handler) {
      if (elem && type) {
        elem.addEventListener(type, handler, false);
      }
    }
  }
  if (window.attachEvent) {
    //重写bindEvent
    bindEvent = function (elem, type, handler) {
      if (elem && type) {
        elem.attachEvent('on' + type, handler);
      }
    }
  }

  bindEvent(elem, type, handler);
};

//解除事件
var unbindEvent = function (elem, type, handler) {
  if (document.removeEventListener) {
    //重写unbindEvent
    unbindEvent = function (elem, type, handler) {
      if (elem && type) {
        elem.removeEventListener(type, handler, false);
      }
    };
  }

  if (window.attachEvent) {
    //重写unbindEvent
    unbindEvent = function (elem, type, handler) {
      if (elem && type) {
        elem.detachEvent('on' + type, handler);
      }
    };
  }

  unbindEvent(elem, type, handler);
};


//绑定一次事件
var bindOnce = function (elem, type, handler){
  var listener = function() {
    if (handler) {
      handler.apply(this, arguments);
    }
    //解除事件
    unbindEvent(elem, type, listener);
  };
  //绑定事件
  bindEvent(elem, type, listener);
};

module.exports = {
  on: bindEvent,
  off: unbindEvent,
  once: bindOnce
};
