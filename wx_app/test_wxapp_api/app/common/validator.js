/**
 * Created by chenxingyu on 2017/3/31.
 */
'use strict';

//验证算法
let validatorMethod = {
  //是否为空字符串
  isNonEmpty(value, errorMsg) {
    if (validatorMethod.isString(value)) {
      value = value.replace(/\s+/g,'');
    }
    if (value === '') {
      return errorMsg;
    }
  },
  //最小长度
  minLength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  //是否是电话号码
  isMobile(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg || '您输入的手机号码格式不正确';
    }
  },
  //是否是邮政编码
  isZipCode(value, errorMsg){
    let re= /^[1-9][0-9]{5}$/;
    if (!re.test(value)) {
      return errorMsg || '您输入的邮政编码格式不正确';
    }
  },
  //是否是中文字符
  isNotChinese(value, errorMsg) {
    if (!/^\w+$/.test(value)) {
      return errorMsg;
    }
  },
  //最小值
  min(value, minNum, errorMsg) {
    if (value < minNum) {
      return errorMsg;
    }
  },
  //最大值
  max(value, maxNum, errorMsg) {
    if (value > maxNum) {
      return errorMsg;
    }
  },
  //是否是字符串
  isString(value, errorMsg) {
    if (typeof value !== 'string') {
      return errorMsg;
    }
  },
  //是否是数字
  isNumber(value, errorMsg) {
    if (typeof value !== 'number') {
      return errorMsg;
    }
  },
  //是否为对象
  isObject(value, errorMsg) {
    if (typeof value !== 'object') {
      return errorMsg;
    }
  },
  //是否没有值
  isNot(value, errorMsg) {
    if (!value) {
      return errorMsg;
    }
  }
};


//验证类
class Validator {
  constructor(args) {
    this.cache = [];
  }

  //添加验证规则
  add(value, rules) {
    let self = this;
    for (let i = 0, rule; rule = rules[i++];) {
      (function (rule) {
        let strategyAry = rule.strategy.split(':');
        let errorMsg = rule.errorMsg;
        self.cache.push(function () {
          let strategy = strategyAry.shift();
          strategyAry.unshift(value);
          strategyAry.push(errorMsg);
          return validatorMethod[strategy].apply(null, strategyAry);
        });
      })(rule);
    }
  }

  //开始验证
  start() {
    for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      //执行缓存区函数
      let msg = validatorFunc();
      if (msg) {
        return msg;
      }
    }
  }
}

module.exports = Validator;
