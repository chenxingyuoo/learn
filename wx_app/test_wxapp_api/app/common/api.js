/**
 * Created on 2017/10/17.
 */

'use strict';

// let url = 'http://rapapi.org/mockjsdata/28733';
// let url = 'http://192.168.0.131:8080';
// let url = 'http://123.207.49.108:8080';
let url = 'https://wechatdev.gdzyon.com';
// let url = 'https://wechat.gdzyon.com';

let apis = {
  //用户模块
  login : '/user/login',                 //登录
  getUserInfo : '/user/user/info',       //获取平台用户信息
  getItemList : '/user/item/list',       //获取形象列表
  exchangeItem : '/user/item/exchange',  //兑换形象
  commitStep : '/user/step/commit',      //提交步数
  exchangeStep : '/user/step/exchange',  //兑换步数
  selectAvatar : '/user/item/avatar/select',   //切换形象
  getMedalList : '/user/medal/list',      //勋章列表
  exchangeMedal : '/user/medal/exchange', //兑换勋章
  submitMedalGiftInfo : '/user/medal/present/contact',     //提交勋章礼品表单信息
  medalDisplay : '/user/medal/display',   //勋章是否展示
  shareGetGold : '/user/shareGetGold',    //分享获得星币

  //探索
  updateIbs : '/user/lbs/update' ,       //更新用户lbs
  refreshNearUsers : '/user/lbs/explore',  //刷新探索,获取新用户
  stealGold: '/task/explore/steal',      //挖金币

  //留言
  commentGet : '/user/comment/get',
  userComment :'/user/comment/comment',  //用户留言
  commentList : '/user/comment/list',    //留言板列表
  commentReply : '/user/comment/reply',  //回复留言
  commentRead : '/user/comment/read',    //标记留言已读
  commentDetail : '/user/comment/detail',//留言详情

  //排行榜
  rankList : '/user/rank/get',                  //排行榜
  myRank : '/user/rank/myRank',                 //个人排名
  groupRank : '/user/rank/groupRank',           //群排行榜
  joinGroupRank : '/user/rank/joinGroupRank',   //加入群排行
  myGroupList : '/user/rank/myGroupList',       //我的群列表
  myGroupRank : '/user/rank/myGroupRank',       //我的群排行
  rankMultiGet : '/user/rank/multi-get',             //指定多人排行

  //客服
  customReply : '/user/custom/reply',   //客服自动回复

  //年会
  donateStep : '/task/donate/step',       //捐赠步数
  donateData : '/user/pub/donate/data',   //年会数据

  //任务模块
  createTask : '/task/challenge/create',  //创建任务
  getTaskList : '/task/challenge/list',   //获取任务列表
  getTaskDetails : '/task/challenge/detail',  //获取任务详情
  getOtherTaskList : '/task/challenge/list/other', //获取其他人的任务列表
  taskReply : '/task/challenge/reply',                     //任务邀请回复

  //成绩模块
  getTaskAchievement : '/task/challenge/achievement',      //获取成绩详情 + 成绩列表
  getTaskAward : '/task/challenge/award',                  //领取奖励
  getAllTaskAward : '/task/challenge/award/all',           //一键领取所有奖励
  getTaskAchievementOther : '/task/challenge/achievement/other',   //获取他人的成绩

  //通知
  getRedPoint : '/user/notice/redPoint',                   //获取通知红点
  noticeList : '/user/notice/list',                        //通知列表，noticeType参数 0(挖金币) 1(留言) 2(挑战)
  noticeRead : '/user/notice/read',                        //标记通知已读
  noticeReadMulti : '/user/notice/read/multi',              //批量标记通知已读
    // 上传formid
  uploadFormId : '/user/userForm/saveUserForm',
   // 保存收货地址
  saveDeliveryAddr: '/user/delivery/saveAddress',
   // 是否可以填写收货地址
  canInputAddr: '/user/delivery/canFill',
   // 推送填写收件地址
  // sendAddressTmpMsg: '/user/delivery/sendAddressTmpMsg'
  sendAddressTmpMsg: '/pub/userAddress/sendAddressTmpMsg'
};

for (let key in apis) {
  apis[key] = url + apis[key];
}

export default apis;
