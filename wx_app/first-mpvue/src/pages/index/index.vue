<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
      
    <form class="form-container" >
      <input type="text" class="form-control" v-model="form.name" placeholder="v-model" />
      <button @click="submit">提交</button>
    </form>


  </div>
</template>

<script>
import card from '@/components/card'
import WxValidate from '../../utils/vaild'

export default {
  data () {
    return {
      form: {
        name: ''
      },


      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    submit(e){
      debugger
      console.log(this.form)

      if (!this.WxValidate.checkForm(this.form)) {
        const error = this.WxValidate.errorList[0]
        wx.showToast({
            title: error.msg,
            duration: 2000
        })
      }
    },
    bindViewTap () {
      const url = '../logs/logs'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()

    // 验证字段的规则
    const rules = {
        name: {
            required: true
        }
    }

    const messages = {
      name: {
          required: '请输入名称'
      }
    }
    // 创建实例对象
     this.WxValidate = new WxValidate(rules, messages)
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
