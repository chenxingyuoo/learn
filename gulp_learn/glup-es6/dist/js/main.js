'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Parson = require('./Parson');

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