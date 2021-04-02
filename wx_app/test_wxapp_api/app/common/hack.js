/**
 * 兼容小程序的一些问题
 * Created on 2017/12/21.
 */

'use strict';

const app = getApp();

export default {
  //解决在聊天顶部挂太久，进来没有数据跳转到登录页面
  notUserInfoGOLoginPage(){
    let globalData = app.globalData;
    if (!globalData || !globalData.userInfo || typeof globalData.userInfo.step === 'undefined') {
      wx.redirectTo({
        url: '/pages/index/index'
      });
    }
  }
};