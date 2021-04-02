/**
 * Created on 2017/12/14.
 */

'use strict';

import Promise from './promise';

export default {
  //微信登录
  wxLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          let code = res.code;
          if (code) {
            resolve(code);
          } else {
            reject(res);
            console.log('获取用户登录态失败！' + res.errMsg);
          }
        }
      });
    });
  },
  //获取用户信息
  getUserInfo(){
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        withCredentials: true,
        success: (res) => {
          resolve(res);
        },
        fail : (res) => {
          reject(res);
        }
      });
    });
  },
  //获取微信运动
  getWeRunData(){
    return new Promise((resolve, reject) => {
      wx.getWeRunData({
        success: (res) => {
          resolve(res);
        },
        fail : (res) => {
          reject(res);
        }
      });
    });
  },
  //获取设置
  getSetting(){
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          resolve(res);
        },
        fail : (res) => {
          reject(res);
        }
      });
    });
  }
};