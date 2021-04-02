/**
 * Created by chenxingyu on 2016/11/19.
 */
let app = getApp()
Page({
    data:{
        userInfo: {}
    },
    onLoad() {
        debugger;
        app.getUserInfo(userInfo => {
            userInfo.gender = userInfo.gender === 1 ? 'Male' : 'Female'
            this.setData({
                userInfo: userInfo
            })
        })
    }
})