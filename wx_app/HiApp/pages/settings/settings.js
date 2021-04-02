/**
 * Created by chenxingyu on 2016/11/19.
 */
let app = getApp()
Page({
    data:{
        userInfo: {}
    },
    onLoad() {
        app.getUserInfo(userInfo => {
            this.setData({
                userInfo: userInfo
            })
        })
    },
    navToPage(event) {
        let route = event.currentTarget.dataset.route
        wx.navigateTo({
            url: route
        })
    }
})