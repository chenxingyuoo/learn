let request = require('../../lib/request')

const answers = [
  'Yes!',
  'No',
  'Hm...',
  'I am not sure',
  'And what about you?',
  'May be ;)',
  'Lorem ipsum dolor sit amet, consectetur',
  'What?',
  'Are you sure?',
  'Of course',
  'Need to think about it',
  'Amazing!!!'
]
let answerTimeout

// TODO 获取消息、发送消息之后需要滚动到底部
// 似乎 scroll-view 很多问题

Page({
  data: {
    userName: '',
    messages: [],
    loading: false,
    inputValue: '',
    inputContent: {}
  },
  onLoad: function (options) {
    debugger;
    let name = options.name || 'HiApp'
    this.setData({
      userName: name
    })
  },
  onReady() {
    //设置当前页面标题
    wx.setNavigationBarTitle({
      title: this.data.userName
    })
    //获取聊天内容
    this.getMessage();
  },
  //获取输入框信息
  bindChange(e) {
    debugger;
    this.data.inputContent[e.currentTarget.id] = e.detail.value
  },
  getMessage() {
    this.setData({
      loading: true
    })
    request({
      url: 'message.json',
      success: res => {
        this.setData({
          messages: res.data
        })
        debugger;
      },
      complete: () => {
        this.setData({
          loading: false
        })
      }
    })
  },
  sendMessage() {
    debugger;
    this.setData({
      messages: [...this.data.messages, {
        text: this.data.inputContent.message,
        from: 'sent'
      }]
    })
    this.data.inputValue = ''
    setTimeout(() => {
      this.autoAnswer()
    }, 1000)
  },
  //自动回复
  autoAnswer() {
    answerTimeout && clearTimeout(answerTimeout)
    answerTimeout = setTimeout(() => {
      let message = {
        from: 'received',
        text: answers[Math.floor(Math.random() * answers.length)]
      }
      this.setData({
        messages: [...this.data.messages, message]
      })
    },1000)
  }
})
