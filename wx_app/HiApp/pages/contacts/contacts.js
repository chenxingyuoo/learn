/**
 * Created by chenxingyu on 2016/11/19.
 */
//获取应用实例
var app = getApp()
let util = require('../../utils/util')
let request = require('../../lib/request')

Page({
    data:{
        contacts: [],
        loading: false
    },
    onLoad() {
        this.getContacts()
    },
    //获取 Contacts 列表
    getContacts() {
        this.setData({
            loading: true
        })
        request({
            url: 'contacts.json',
            success: res => {
                this.setData({
                    contacts: this.formatContacts(res.data)
                })
            },
            complete: () => {
                this.setData({
                    loading: false
                })
            }
        })

    },
    formatContacts(items) {
        items.forEach(item => {
            item.avatar = util.getAvatarUrl(item.avatar)
            return item
        })
        return items
    },
    //调到对应页面
    navToMessage(event) {
        let name = event.currentTarget.dataset.name
        wx.navigateTo({
            url: `../message/message?name=${name}`
        })
    }
});