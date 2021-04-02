//index.js
//获取应用实例
var app = getApp()
let util = require('../../utils/util')
let request = require('../../lib/request')

Page({
  data: {
    timeline: [],
    loading: false,
    motto: 'Hello World',
    userInfo: {}
  },
  onReady() {
    this.getTimeline();
  },
  getTimeline() {
    this.setData({
      loading: true
    });

    request({
      url: 'timeline.json',
      success: res => {

        let timeline = this.formatTimeline(res.data)
        this.setData({
          timeline: timeline
        })
      },
      complete: () => {
        this.setData({
          loading: false
        })
      }
    })
  },
  formatTimeline(items) {
    items.forEach(item => {
      item.avatar = util.getAvatarUrl(item.avatar)
      item.time = util.timeFormat(item.created_at)
      return item
    })
    return items
  },
  previewImage (event){
    wx.previewImage({
      current: '',
      urls: [event.target.dataset.originalPic],
      complete() {

      }
    })
  }
})
