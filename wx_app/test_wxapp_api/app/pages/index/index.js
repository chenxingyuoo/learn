import page from '../../common/page.js';
import * as util from '../../common/util';
import auth from '../../common/auth';

const app = getApp();

Page({
  data: {
    isAvatarUrl: true,
    channel: null   //渠道参数
  },
  onLoad(options) {
    let self = this;

    if (options.scene) {
      this.data.channel = decodeURIComponent(options.scene)
    }


    let loginData = {};
    let channel = this.data.channel;
    if (typeof channel !== 'undefined' && channel !== null) {
      loginData.channel = channel; //渠道参数
    }

    //检测用户登录、获取用户信息
    auth.checkLogin({
      loginData : loginData,
      isRequestWeRunData : false,
      getUserInfoSucc: () => {
        //检测是否有形象图片，跳转首页
        self.checkIsAvatarUrlGoHome();
      },
      getWeRunDataSucc : () => {
        if (!util.isEmptyObject(app.globalData.userInfo)) {
          page.goHome();
        }
      },
      notWeRunCallback : () => {
        page.goHome();
      }
    });
  },
  onShow() {
    //检测授权状态
    auth.checkSettingStatu();
  },

  //检测是否有形象图片，跳转首页
  checkIsAvatarUrlGoHome(){
    if (app.globalData.weRunInfo) {
      page.goHome();
    }
  },
  clickGetSuit() {
    page.goHome();
  }
});