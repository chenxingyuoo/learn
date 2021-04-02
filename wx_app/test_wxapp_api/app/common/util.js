/**
 * 计算距离现在的时间
 * @param time
 * @returns {*}
 */
export const timeToNow = (time) => {
  const t = parseFloat(new Date - new Date(time)) / 1000;
  let str;
  if (t) {
    if (t > 60 && t < 3600) {
      str = `${parseInt(t / 60.0, 10)}分钟前`;
    } else if (t >= 3600 && t < 86400) {
      str = `${parseInt(t / 3600.0, 10)}小时前`;
    } else if (t >= 86400 && t < 86400 * 30) {
      str = `${parseInt(t / 86400.0, 10)}天前`;
    } else if (t >= 86400 * 30 && t < 86400 * 365) {
      str = `${parseInt(t / (86400.0 * 30), 10)}个月前`;
    } else if (t >= 86400 * 365) {
      str = `${parseInt(t / (86400.0 * 365), 10)}年前`;
    } else {
      str = `${parseInt(t, 10)}秒前`;
    }
  }
  return str;
};

/**
 * 格式化日期时间
 * @param date
 * @param joinStr
 * @returns {string}
 */
export const formatTime = (date, joinStr) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join(joinStr ? joinStr : '-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

/**
 * 格式化日期
 * @param date
 * @param joinStr
 * @returns {string}
 */
export const formatDate = (date, joinStr) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join(joinStr ? joinStr : '-');
};

/**
 * 格式化数字
 * @param n
 * @returns {*}
 */
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n
};



/**
 * 是否为空对象
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = (obj) => {
  for (let key in obj) {
    return false;
  }
  return true;
};


/**
 * 获取指定的日期 ， 向前 、 向后 、今天
 * @param startDate   开始日期
 * @param num         天数 （负向前、正向后）
 * @param joinStr     分隔的字符串 ，默认为 '-'
 * @returns {string}
 */
export const getSpecifyDate = (obj) => {
  let startDate = obj.startDate || new Date();
  let num = obj.num;
  let joinStr = obj.joinStr || '-';

  //如果是字符串 ，则转换为date对象
  if (typeof startDate === 'string') {
    startDate = startDate.replace(/\-/g, '/');
    startDate = new Date(startDate);
  }

  let dateTime = startDate.getTime();

  const newDate = new Date(dateTime - 3600 * 24 * 1000 * -num);

  return {
    date: newDate,
    dateStr: formatDate(newDate, joinStr),
    dateTimeStr: formatTime(newDate, joinStr)
  };
};


/**
 * 将属性混合到目标对象中 , 进行拷贝 , 微信小程序中不敢使用es6，使用function的arguments
 * @param to
 * @param arguments
 * @returns {*|{}}
 */

export const copy = function(to) {
  to = to || {};
  let args =  Array.prototype.slice.call(arguments);
  args = args.slice(1);

  for (let i = 0, len = args.length; i < len; i++) {
    let from = args[i];
    for (let key in from) {
        to[key] = from[key];
    }
  }

  return to;
};


/**
 * 将属性混合到目标对象中 , 进行深拷贝
 * @param to
 * @param arguments
 * @returns {*|{}}
 */
export const deepCopy = (to, from) => {
  to = to || {};
  for (let i in from) {
    if (typeof from[i] === 'object') {
      to[i] = (Array.isArray(from[i])) ? [] : {};
      deepCopy(to[i], from[i]);
    } else {
      to[i] = from[i];
    }
  }

  return to;
};

/**
 * 从个位数起，每三位之间加一个逗号
 * @param num
 * @returns {string}
 */
export const toThousands = (num) => {
  let result = [], counter = 0;
  num = (num || 0).toString().split('');
  for (let i = num.length - 1; i >= 0; i--) {
    counter++;
    result.unshift(num[i]);
    if (!(counter % 3) && i !== 0) {
      result.unshift(',');
    }
  }
  return result.join('');
};


/**
 * 从一个给定的数组arr中,随机返回1个
 * @returns {*}
 **/
export const randomElemnt = (array) => {
  if (array.length === 0) {
    throw new Error('the array is empty');
  }
  return array[Math.floor(Math.random() * array.length)];
};

//求函数随机数
export const getRandom = (min, max) => {
  let random = Math.random() * (max - min) + min;
  random = Math.floor(random);
  return random;
};

//矩形碰撞检测
export const intersects = (rectA, rectB) => {
  return !(rectA.x + rectA.width <= rectB.x ||
    rectB.x + rectB.width <= rectA.x ||
    rectA.y + rectA.height <= rectB.y ||
    rectB.y + rectB.height <= rectA.y);
};

/**
 * 获取当前时间转换为分钟数
 * @param date
 * @returns {string}
 */
export const getTimeToMinute = (date) => {
  date = date || new Date();

  let hour = date.getHours() * 60;
  let minute = date.getMinutes();
  let second = Number((date.getSeconds() / 60).toFixed(2));
  return hour + minute + second;
};

/**
 * 分钟数转换小时、分钟
 * @param minutes
 * @returns {{hour: number, minutes: number}}
 */
export const minutesToHourMinute = (minutes) => {
  let hour = Math.floor(minutes/60);
  let minute = minutes % 60;
  return {
    hour : hour < 10 ? '0' + hour : hour,
    minute : minute < 10 ? '0' + minute : minute
  };
};



/**
 * 判断时间是否是今天
 * @param timestamps
 * @returns {boolean}
 */
export const isToday = (timestamps) => {
  let d = new Date(timestamps);
  let todayDate = new Date();
  return d.setHours(0,0,0,0) === todayDate.setHours(0,0,0,0);
};

// "true"  => true
// "false" => false
// "null"  => null
// "42"    => 42
// "42.5"  => 42.5
// "08"    => "08"
// JSON    => parse if valid
// String  => self
/**
 *
 * @param value
 * @returns {*}
 */
export const deserializeValue = (value) => {
  try {
    let result;
    if (value) {

      if (value === "false") {
        result = false;
      } else if (value === "null") {
        result = null;
      } else if (+value + "" === value) {
        result = +value;
      } else if (/^[\[\{]/.test(value)) {
        result = JSON.parse(value);
      } else {
        result = value;
      }

      return value === "true" || result;

    } else {
      return value;
    }
  } catch (e) {
    return value
  }
};