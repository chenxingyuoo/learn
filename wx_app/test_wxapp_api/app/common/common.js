/**
 * Created on 02/02/2018.
 */

'use strict';
import * as utils from './util';

let isOpenedSetting = false;

const app = getApp();

export default {
  //显示loading
  showLoading(text) {
    wx.showToast({
      title: text || '正在加载',
      icon: 'loading',
      duration: 20000
    });
  },
  //隐藏loading
  hideLoading() {
    wx.hideToast();
  },
  //文本提示
  toast(obj){
    obj = obj || {};
    wx.showToast({
      title : obj.text || '提示',
      icon : obj.icon || 'none',
      duration : obj.time || 2000
    });
  },

  //是否没有用户信息
  isNotUserInfo(){
    return utils.isEmptyObject(app.globalData.userInfo);
  },

  //不支持微信api提示
  notWxApiTips() {
    wx.showModal({
      title: '提示',
      content: '您的微信版本太低，不支持该功能，请升级至最新版本后使用，谢谢',
      showCancel: false
    });
  },

  //打开设置
  openSetting() {
    if (isOpenedSetting === true) {
      return;
    }
    isOpenedSetting = true;

    if (!wx.openSetting) {
      isOpenedSetting = false;
      this.notWxApiTips();
      return;
    }

    wx.openSetting({
      complete: (res) => {
        isOpenedSetting = false;
      }
    });
  },
}