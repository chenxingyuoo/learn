/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function (data) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }


   data.list.forEach(function (item, index){
;
__p += '\n\n   <li class="box-item">\n       <p>' +
((__t = ( item.name )) == null ? '' : __t) +
'</p>\n       <p>' +
((__t = ( item.sex )) == null ? '' : __t) +
'</p>\n   </li>\n\n';

   });
;

return __p
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (data) {
var __t, __p = '';
__p += '<div class="box">\n    <ul class="box-li">\n\n    </ul>\n</div>';
return __p
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	log: function log(obj) {
		console.log(obj);
	}
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(2);

var _test_list = __webpack_require__(1);

var _test_list2 = _interopRequireDefault(_test_list);

var _test_item = __webpack_require__(0);

var _test_item2 = _interopRequireDefault(_test_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//模板
(0, _util.log)('陈');

//获取DOM
var app = document.querySelector('#app');

var testObj = {
    list: [{
        name: 'chen',
        sex: '男'
    }, {
        name: '晓晓',
        sex: '女'
    }]
};
debugger;
app.innerHTML = (0, _test_list2.default)();
app.querySelector('.box-li').innerHTML = (0, _test_item2.default)(testObj);

/***/ })
/******/ ]);