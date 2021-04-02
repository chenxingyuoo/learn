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