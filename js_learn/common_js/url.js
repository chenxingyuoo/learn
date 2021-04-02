/**
 * Created on 2017/7/14.
 */

'use strict';

let emptyObject = {};
let toString = emptyObject.toString;
let hasOwn = emptyObject.hasOwnProperty;

// 返回对象的类型
export const type = (obj) => {
  let type;
  if (obj === null) {
    type = String(obj);
  } else {
    type = toString.call(obj).toLowerCase();
    type = type.substring(8, type.length - 1);
  }
  return type || 'object';
};

//判断是否是对象
export const isObject = (value) => {
  return type(value) === 'object';
};

//判断是否是函数
export const isFunction = (value) => {
  return type(value) === 'function';
};

//判断是否是字符串
export const isString = (value) => {
  return typeof value === 'string';
};

//清除空格字符串
export const cleanEmptyStr = (value) => {
  if (!isString(value)) {
    throw Error('请确保 value 为字符串');
  }

  return value.replace(/\s+/g, '');
};

//返回唯一标识字符串
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};


/**
 * url参数拼接
 * @param data
 * @returns {String}
 */
export const querySplice = (data) => {
  let param = [];

  if (!isObject(data)) {
    return '';
  }

  for (let key in data) {
    //没值则跳过
    if (!data[key]) {
      continue;
    }
    //如果是对象 ，转换json字符串
    if (isObject(data[key])) {
      data[key] = JSON.stringify(data[key]);
    }
    param.push(key + '=' + encodeURIComponent(data[key]));
  }

  param = param.join('&');
  return param;
};

/**
 * url参数序列化
 * @param url
 * @returns {{}}
 */
export const urlQuerySerializ = (url) => {
  let urlParams = {};
  let match;
  let pl = /\+/g;
  let search = /([^&=]+)=?([^&]*)/g;
  let searchIndex = url.indexOf('?');
  let decode = function (s) {
    return decodeURIComponent(s.replace(pl, ' '));
  };

  //判断是否有问号
  if (searchIndex !== -1) {
    url = url.slice(searchIndex + 1);
  }

  while (match = search.exec(url)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }
  return urlParams;
};

/**
 * url 参数删除
 * @param url           url
 * @param targetParams  要删除的参数数组
 * @returns {string}    返回新的url
 */
export const urlParamsDel = function (url, targetParams) {
  let index = url.indexOf('?');

  if (index === -1) {
    return url;
  }

  index = index + 1;

  let baseUrl = url.substr(0, index);
  let paramStr = url.substr(index);
  let paramArr = paramStr.split('&');

  targetParams.forEach((name) => {
    if (paramStr.indexOf(name) === -1) {
      return;
    }

    for (let i = 0; i < paramArr.length; i++) {
      let re = new RegExp(name, 'g');
      //满足条件则删除掉
      if (re.test(paramArr[i])) {
        paramArr.splice(i, 1);
      }
    }
  });

  return baseUrl + paramArr.join('&');
};
// urlParamsDel('http://www.test.com/?page=2&pageSize=10',['page','pageSize'])



/**
 * 写入url参数
 * @param url            //url
 * @param targetParams   //目标参数
 * @returns {String}     //新的url
 */
export const writeUrlParams = (url, targetParams) => {
  let index = url.indexOf('?');
  let baseUrl;
  let paramStr;

  if (index === -1) {
    baseUrl = url + '?';
  } else {
    index = index + 1;
    paramStr = url.substr(index);
    baseUrl = url.substr(0, index);
  }

  //参数数组
  let paramArr = paramStr ? paramStr.split('&') : [];

  //循环参数
  targetParams.forEach((item, i) => {
    let name = item.name;
    let value = item.value;
    //设置参数
    let setParam = (i) => {
      paramArr[i] = name + '=' + value;
    };

    //如果有参数字符串，则替换， 否则添加
    if (paramStr) {
      for (let j = 0, len = paramArr.length; j < len; j++) {
        let reg = new RegExp(name, 'g');
        if (reg.test(paramArr[j])) {
          setParam(j);
          break;
        }
      }
    } else {
      setParam(i);
    }
  });

  return baseUrl + paramArr.join('&');
};

// writeUrlParams('http://www.test.com',[{name : 'page', value : 2}])
