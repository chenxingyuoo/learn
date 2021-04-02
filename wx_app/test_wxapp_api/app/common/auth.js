/**
 * Created on 23/12/2017.
 */

'use strict';
import common from './common';
import https from './request';
import api from './api';
import * as utils from './util';
import wxMethod from './wx-method.js';

const app = getApp();

let isLoadWeRun = false;
let isLoadUserInfo = false;
let isLogin = false;
const emptyFn = () => {};

export default {
  requestNum : 0,
  initRequestNum(){
    this.requestNum = 0;
  },
  requestNumPlus(){
    this.requestNum += 1;
  },
  hideLoading(){
    if (!this.isRequestWeRunData && this.requestNum === 1) {
      common.hideLoading();
      return;
    }

    if (this.isRequestWeRunData && this.requestNum === 2) {
      common.hideLoading();
    }
  },
  //检测登录
  checkLogin(options) {
    this.isRequestWeRunData = typeof options.isRequestWeRunData !== 'undefined' ? options.isRequestWeRunData : true;
    this.isAuthWeRun = typeof options.isAuthWeRun !== 'undefined' ? options.isAuthWeRun : true;
    this.notWeRunCallback = options.notWeRunCallback || emptyFn;
    this.loginData = options.loginData || {};
    this.getUserInfoSucc = options.getUserInfoSucc || emptyFn;
    this.getWeRunDataSucc = options.getWeRunDataSucc || emptyFn;

    this.initRequestNum();
    this.getWxUserInfo();
  },

  //获取用户信息成功回调
  getUserInfoSuccCallback(data) {
    this.getUserInfoSucc(data);
  },

  //获取微信运动成功回调
  getWeRunDataSuccCallback() {
    this.getWeRunDataSucc();
  },

  //没有微信运动回调
  notWeRunCallback(){
    this.notWeRunCallback();
  },

  //解析配置
  parseConfig(data){
    let configs = JSON.parse(data.config || '[]');
    let settingConfig = {
      shareConfig : {}
    };

    for (let i = 0, len = configs.length; i < len; i++) {
      let obj = configs[i];
      let configJson = JSON.parse(obj.configJson || '{}');
      if (obj.configType !== 5) {
        utils.copy(settingConfig, configJson);
      }

      let shareData = configJson.data;
      if (obj.configType === 5 && shareData && shareData.length !== 0) {
        for (let j = 0, len = shareData.length; j < len; j++) {
          let shareObj = shareData[j];
          settingConfig.shareConfig[shareObj.key] = shareObj;
        }
      }
    }

    console.log('settingConfig', settingConfig);
    app.settingData = settingConfig;

    wx.setStorage({
      key: 'settingData',
      data: settingConfig
    });
  },

  //获取平台个人信息
  getUserInfo() {
    common.showLoading();

    https.request({
      isAutoHideLoading : false,
      url: api.getUserInfo,
      method: 'GET',
      data: {}
    }).then((userInfoRes) => {
      let data = userInfoRes.msg || {};
      let userInfo = data.userInfo || {};

      this.parseConfig(data);

      app.globalData.userInfo = userInfo;

      wx.setStorage({
        key: 'userInfo',
        data: userInfo
      });

      this.requestNumPlus();
      this.hideLoading();

      //获取用户信息成功回调
      this.getUserInfoSuccCallback(userInfo);
    }).catch(() => {
      common.hideLoading();
    });
  },
  //获取用户信息
  getWxUserInfo() {
    let self = this;
    if (isLoadUserInfo === true) {
      return;
    }
    isLoadUserInfo = true;

    //登录成功，获取用户信息进行平台登录
    wxMethod.wxLogin().then((code) => {
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          app.globalData.wxUserInfo = res.userInfo || {};

          common.showLoading();

          let data = utils.copy({
            code: code,
            encryptedData: res.encryptedData,
            iv: res.iv
          }, self.loginData);

          https.request({
            isAutoHideLoading : false,
            url: api.login,
            method: 'POST',
            data: data
          }).then((data) => {
            let _data = data.msg || {};

            isLogin = true;

            wx.setStorage({
              key: 'userData',
              data: _data
            });

            app.globalData.userData = _data;

            //获取平台用户信息
            self.getUserInfo();

            //获取微信运动数据
            if (self.isAuthWeRun) {
              self.getWeRunData();
            }

          }).catch(() => {
            common.hideLoading();
          });
        },
        fail: (res) => {
          common.openSetting();
        },
        complete: () => {
          isLoadUserInfo = false;
        }
      });
    });
  },
  //获取微信运动数据
  getWeRunData() {
    let self = this;
    if (isLoadWeRun === true) {
      return;
    }
    isLoadWeRun = true;

    if (!wx.getWeRunData) {
      isLoadWeRun = false;
      app.isWeRun = false;
      this.notWeRunCallback();
      return;
    }

    wx.getWeRunData({
      success: (weRunRes) => {
        app.globalData.weRunInfo = weRunRes;

        //判断是否请求微信运动
        if (!this.isRequestWeRunData) {
          isLoadWeRun = false;
          //获取微信运动成功回调
          self.getWeRunDataSuccCallback();
          return;
        }

        common.showLoading();

        https.request({
          isAutoHideLoading : false,
          url: api.commitStep,
          method: 'POST',
          data: {
            encryptedData: weRunRes.encryptedData,
            iv: weRunRes.iv
          }
        }).then((res) => {
          let data = res.msg || {};

          //更新用户步数
          app.updateUserStep(data);

          this.requestNumPlus();
          this.hideLoading();

          //获取微信运动成功回调
          self.getWeRunDataSuccCallback();
        }).catch(() => {
          common.hideLoading();
        });
      },
      fail: (res) => {
        res = res || {};
        //根据微信错误提示判断是否支持微信运动
        if (res.errMsg && res.errMsg.indexOf('not support') !== -1) {
          app.isWeRun = false;
          this.notWeRunCallback();
        } else {
          common.openSetting();
        }
      },
      complete() {
        isLoadWeRun = false;
      }
    });
  },

  // 检测授权状态
  checkSettingStatu() {
    let self = this;
    if (!wx.getSetting) {
      common.notWxApiTips();
      return;
    }

    wxMethod.getSetting().then((res) => {
      let authSetting = res.authSetting || {};
      let userInfoAuth = authSetting['scope.userInfo'];
      let weRunAuth = authSetting['scope.werun'];

      if (utils.isEmptyObject(authSetting)) {
        return;
      }

      // 没有授权的提醒
      if (userInfoAuth === false && !app.globalData.wxUserInfo) {
        common.openSetting();
      } else {
        if (!app.globalData.wxUserInfo) {
          self.getWxUserInfo();
          return;
        }

        if (!wx.getWeRunData || app.isWeRun === false || this.isAuthWeRun === false) {
          return;
        }

        if (weRunAuth === false && !app.globalData.weRunInfo) {
          common.openSetting();
        } else {
          if (!app.globalData.weRunInfo && isLogin === true) {
            //获取微信运动数据
            self.getWeRunData();
          }
        }
      }
    });
  },

  // 上传 form_id
  uploadFormId(id, tx) {
    if (id ==='undefined' 
        || id === 'the formId is a mock one'){
      console.log('模拟器没有formid');
      return;
    }
    https.request({
      isAutoHideLoading : false,
      url: api.uploadFormId,
      method: 'POST',
      data: {
        formId: id,
        action: tx,
      }
    }).then((res) => {
      console.log(res);
    })

  },
};