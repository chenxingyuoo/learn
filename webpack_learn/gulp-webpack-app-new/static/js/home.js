/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(typeof DEBUG !== "undefined" && DEBUG) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	
	// import '../../common/sass/common.scss';
	
	__webpack_require__(5);
	
	var _home = __webpack_require__(3);
	
	var _home2 = _interopRequireDefault(_home);
	
	__webpack_require__(6);
	
	var _home_nav = __webpack_require__(11);
	
	var _home_nav2 = _interopRequireDefault(_home_nav);
	
	var _home_banner = __webpack_require__(10);
	
	var _home_banner2 = _interopRequireDefault(_home_banner);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//引入模板 
	var homeNav = new _home_nav2.default('a', 'b', 'c');
	
	//引入公共入口文件
	
	
	var homeBanner = new _home_banner2.default({
	    waitTime: 500,
	    index: 20
	});
	
	var num = 'learn gulp o';
	function hello() {
	    // debugger;
	    alert(num + '？');
	    num = num + 1;
	}
	
	hello();
	
	console.log('陈星宇');
	
	document.querySelector('#app').innerHTML = (0, _home2.default)({
	    home: '我的家',
	    img: '../static/img/logo.png'
	});

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = function (data) {
	var __t, __p = '';
	__p += '<div class="home">' +
	((__t = ( data.home )) == null ? '' : __t) +
	'</div>\n<img src="' +
	((__t = ( data.img )) == null ? '' : __t) +
	'" alt="">';
	return __p
	}

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"!!../../../../node_modules/.0.26.4@css-loader/index.js!../../../../node_modules/.1.2.2@postcss-loader/index.js!../../../../node_modules/.5.0.1@sass-loader/lib/loader.js!./home.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	if(typeof content === 'string') content = [[module.i, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(0)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../../node_modules/.0.26.4@css-loader/index.js!../../../../node_modules/.1.2.2@postcss-loader/index.js!../../../../node_modules/.5.0.1@sass-loader/lib/loader.js!./home.scss", function() {
				var newContent = require("!!../../../../node_modules/.0.26.4@css-loader/index.js!../../../../node_modules/.1.2.2@postcss-loader/index.js!../../../../node_modules/.5.0.1@sass-loader/lib/loader.js!./home.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	/**
	 * Created by chenxingyu on 2017/2/10.
	 */
	
	window.common = __webpack_require__(7);
	window.util = __webpack_require__(9);
	window.API = __webpack_require__(8);
	
	//定时器
	window.requestAnimFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback, element) {
	        return window.setTimeout(callback, 1000 / 60);
	    };
	}();
	
	window.cancelAnimFrame = function () {
	    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;
	}();

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	/**
	 * Created by chenxingyu on 2017/2/10.
	 */
	
	// var $doc = $(document);
	
	// $doc.on('click',function (){
	//     alert('click document');
	// });
	
	
	document.addEventListener('click', function () {
	  console.log('click document');
	}, false);

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	/**
	 * Created by chenxingyu on 2017/2/8.
	 */
	
	//请求地址配置
	module.exports = {
	  getCalendar: 'http://mrm.amediaz.cn/calendar'
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	/**
	 * Created by chenxingyu on 2017/2/10.
	 */
	
	//返回数组中随机的一个
	exports.randomArray = function (array) {
	    return array[Math.floor(Math.random() * array.length)];
	};
	
	/**
	 * 如果该对象存在此数组 ， 则返回数组的索引
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	exports.indexOf = function indexOf(arr, obj) {
	    var i = arr.length;
	    while (i--) {
	        if (arr[i] === obj) {
	            return i;
	        }
	    }
	    return -1;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	/**
	 * Created by chenxingyu on 2017/2/12.
	 */
	function HomeBanner(opts) {
	  this.opts = opts || {};
	}
	
	module.exports = HomeBanner;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	/**
	 * Created by chenxingyu on 2017/2/12.
	 */
	function HomeNav() {
	  for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	    arg[_key] = arguments[_key];
	  }
	
	  this.homeNav = arg;
	}
	
	module.exports = HomeNav;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }
/******/ ]);