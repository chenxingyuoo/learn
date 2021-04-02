import axios from 'axios';
import * as qs from 'qs';
import * as Message from '@/common/message';

const MIN_RES_CODE = 200;
const MAX_RES_CODE = 300;
const NO_LOGIN_CODE = -14;
const SUCCESS_CODE = 0;
const CONTENT_TYPES = {
  form : 'application/x-www-form-urlencoded',
  json : 'application/json;charset=UTF-8'
};

//添加一个响应拦截器
axios.interceptors.response.use(function(res){
  //在这里对返回的数据进行处理
  return res;
},function(err){
  //Do something with response error
  return Promise.reject(error);
})


//去登陆页面
const goLogin = () => {
  let local = 'http://localhost:8080';
  let produce = 'http://common.pincoak.com';
  let loginUrl = (process.env.NODE_ENV === 'development' ? local : produce) + '/#/usr/login';
  location.href = `${loginUrl}?callbackUrl=${location.href}`;
};

//请求状态码是否ok
const isOk = (status) => {
  return status >= MIN_RES_CODE && status <= MAX_RES_CODE;
};

//网络请求捕获错误
const requireCatch = (res, requireObj) => {
  if ((typeof res === 'number' && !isOk(res)) || (res.response && !isOk(res.response.status))) {
    console.warn('requireCatch', res, requireObj);
    Message.alertError('系统出现错误了~' + res);
  }
  if (res.code && res.code !== SUCCESS_CODE) {
    console.warn('requireCatch', res, requireObj);
    Message.alertWarning(res.message);
  }
  return Promise.reject(res);
};

/**
 * get请求
 * @param  {Object} opts   请求参数对象
 * @return {Promise}         Promise
 */
export const get = (opts = {}) => {
  let setting = {
    url: opts.url || '',
    method: 'GET',
    params: opts.params
  };

  //发送请求
  return axios(setting).then((res) => {
    console.log({url: opts.url, params: opts.params, res: res});

    if (res.status < MIN_RES_CODE || res.status > MAX_RES_CODE) {
      return Promise.reject(new Error(res.status));
    }
    if (res.data.code === NO_LOGIN_CODE) {
      goLogin();
      return;
    }
    if (res.data.code === SUCCESS_CODE) {
      return res.data;
    }
    return Promise.reject(res.data);
  }).catch((res) => {
    let requireObj = {url: opts.url, params: opts.params, res: res};
    return requireCatch(res, requireObj);
  });
};


/**
 * post请求
 * @param  {Object}   opts   请求对象 包括 axios 的配置参数
 * @return {Promise}         Promise
 */
export const post = (opts = {}) => {
  let setting = {
    url: opts.url || '',
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPES[opts.contentType || 'form']
    },
    data: qs.stringify(opts.params) || {}
  };

  //发送请求
  return axios(setting).then(res => {

    console.log({url: opts.url, params: opts.data, res: res});

    if (!isOk(res.status)) {
      return Promise.reject(res.status);
    }

    if (res.data.code === NO_LOGIN_CODE) {
      goLogin();
      return;
    }

    if (res.data.code === SUCCESS_CODE) {
      return res.data;
    }

    return Promise.reject(res.data);

  }).catch(res => {
    // eslint-disable-next-line
    let requireObj = {url: opts.url, params: opts.params, res: res};
    return requireCatch(res, requireObj);
  });
};

/**
 * 文件上传
 * @param  {Object} opts    请求参数对象
 * @return {Promise}        Promise
 */
export const upload = (opts = {}) => {
  let setting = {
    url: opts.url || '',
    method: 'POST',
    headers: {
      'Content-Type': CONTENT_TYPES[opts.contentType || 'form']
    },
    data: qs.stringify(opts.params) || {},
    transformRequest: [function (data) {
      let fd = new FormData();

      for (let key in data) {
        fd.append(key, data[key]);
      }
      return fd;
    }]
  };

  //发送请求
  return axios(setting).then((res) => {
    console.log({url: opts.url, params: opts.params, res: res});

    if (!isOk(res.status)) {
      return Promise.reject(res.status);
    }

    if (res.data.code === NO_LOGIN_CODE) {
      goLogin();
      return;
    }

    if (res.data.code === SUCCESS_CODE) {
      return res.data;
    }
    return Promise.reject(res.data);

  }).catch(res => {
    return requireCatch(res);
  });
};

