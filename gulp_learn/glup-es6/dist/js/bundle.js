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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Administrator on 2016/9/9.
	 */
	// import $ from '../../lib/jquery-1.9.1.min';

	// import {EJS} from '../../lib/ejs_production';

	// console.log(EJS)

	// import {tpl} from '../../tpl/list';

	// console.log(tpl);

	var Parson = function () {
	    function Parson() {
	        var _name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'CHEN';

	        var _age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '21';

	        _classCallCheck(this, Parson);

	        this.name = _name;
	        this.age = _age;
	    }

	    _createClass(Parson, [{
	        key: 'renders',
	        value: function renders() {
	            var html = '';
	            var ids = ['chen', 'xing', 'yu'];
	            var messages = ids.map(function (value, index, list) {
	                return html += '<div class="' + index + '">' + value + '</div>';
	            }); // implicit return
	            document.getElementById('app').innerHTML = html;
	        }
	    }, {
	        key: 'getName',
	        value: function getName() {
	            console.log(this.name);
	            return this.name;
	        }
	    }, {
	        key: 'getAge',
	        value: function getAge() {
	            return this.age;
	        }
	    }]);

	    return Parson;
	}();

	exports.default = Parson;
	/*
	var parson = new Parson();
	parson.getName();*/

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Parson = __webpack_require__(1);

	var Parent = _interopRequireWildcard(_Parson);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016/9/10.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	//执行Parent构造函数
	var parent = new Parent.default();
	parent.getName(); // CHEN
	parent.renders();

	//继承Parent构造函数

	var Dog = function (_Parent$default) {
	    _inherits(Dog, _Parent$default);

	    function Dog() {
	        _classCallCheck(this, Dog);

	        //执行一次父类的构造，否则会报错
	        var _this = _possibleConstructorReturn(this, (Dog.__proto__ || Object.getPrototypeOf(Dog)).call(this, 'chenxingyu', 21));

	        console.log("==constructor dog==");
	        return _this;
	    }

	    _createClass(Dog, [{
	        key: 'sayHelo',
	        value: function sayHelo() {
	            console.log('hello ' + this.name);
	        }
	    }]);

	    return Dog;
	}(Parent.default);

	var dog = new Dog();
	dog.getName(); //chenxingyu
	dog.sayHelo(); //hello chenxingyu

/***/ })
/******/ ]);