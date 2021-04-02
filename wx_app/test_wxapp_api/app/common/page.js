/**
 * Created on 2017/12/18.
 */

'use strict';

export default {
  //去到首页
  goHome(){
    wx.switchTab({
      url: '/pages/home/home'
    });
  },
  //去任务列表页面
  goTaskList(){
    wx.switchTab({
      url: '/pages/task/task-list/task-list'
    });
  }
};