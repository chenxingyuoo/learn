import common from './common';
import * as utils from './util';
import Promise from './promise';
const app = getApp();
const notLoginCodes = [-1,-2];  //-1 token过期 -2 session_key过期
const successCode = 200;
const errorCode = 400;

const contentTypes = {
  form: 'application/x-www-form-urlencoded;charset=UTF-8',
  json: 'application/json;charset=UTF-8'
};

//添加请求参数
const addParams = (options) => {
  let userData = app.globalData.userData;
  // let userData =  wx.getStorageSync('userData');
  if (userData && userData.accessToken && options.url.indexOf('/login') === -1) {
    options.data['access_token'] = userData.accessToken.token;
  }
};

//微信接口require ， 发起网络请求 ， 利用promise进行封装
const request = (options) => {
  return new Promise((resolve, reject) => {
    let isAddCommonParam = typeof options.isAddCommonParam !== 'undefined' ? options.isAddCommonParam : true;
    let isShowToast = typeof options.isShowToast !== 'undefined' ? options.isShowToast : true;
    if (isAddCommonParam) {
      addParams(options);
    }

    options = utils.deepCopy(options, {
      header: {
        'content-type': contentTypes[options.dataType] || contentTypes['form']
      },
      success: (result) => {
        // options.data.encryptedData = true;
        // console.log(`request ${options.url} success`);
        // console.log(`data  ${JSON.stringify(options.data)}`);
        // console.log(`response ${JSON.stringify(result)}`);
        let statusCode = result.statusCode;
        let data = result.data || {};
        let code = data.code;

        if (statusCode >= 200 && statusCode < 300) {
          if (typeof code === 'undefined') {
            common.hideLoading();
            if (isShowToast) {
              common.toast({
                text: '网络不给力，请稍候再试'
              });
            }

            reject(data);
          }else if (notLoginCodes.indexOf(code) !== -1) {
            wx.redirectTo({
              url: '/pages/index/index'
            });
          } else if (code === successCode) {
            let isAutoHideLoading = typeof options.isAutoHideLoading !== 'undefined' ? options.isAutoHideLoading : true;
            if (isAutoHideLoading) {
              common.hideLoading();
            }

            resolve(data);
          } else if(code >= errorCode) {
            common.hideLoading();

            if (isShowToast) {
              common.toast({
                text: data.msg || '请求失败'
              });
            }

            reject(data);
          }
        } else {
          if (statusCode >= errorCode) {
            common.hideLoading();
            common.toast({
              text: '网络不给力，请稍候再试'
            });
          }
          reject(data);
        }
      },
      fail: (result) => {
        console.log(`%c request ${options.url} fail`, 'color:red');
        // console.log(`%c data  ${JSON.stringify(options.data)}`, 'color:#FF9900');
        console.log(`%c response ${JSON.stringify(result)}`, 'color:green');
        common.hideLoading();
        common.toast({
          text: '网络不给力，请稍候再试'
        });
        reject(result);
      }
    });

    //发起网络请求
    wx.request(options);
  });
};


module.exports = {
  request: request
};

