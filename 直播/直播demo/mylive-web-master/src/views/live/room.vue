<!--
 * @description: 
 * @author: 小羽
 * @github: https://github.com/sulgweb
 * @lastEditors: 小羽
 * @Date: 2020-01-16 23:02:22
 * @LastEditTime: 2022-09-03 01:33:00
 * @Copyright: 1.0.0
-->
<template>
  <div
    class="room"
    :style="{ marginTop: $route.meta.noHeader ? '0px' : '60px' }"
  >
    <section class="video-content">
      <div class="video-content-header">
        <div class="video-content-header-avatar">
          <img :src="roomDetail.avatar" />
        </div>
        <div>
          <div class="video-content-header-title">{{ roomDetail.title }}</div>
          <div class="video-content-header-anchor">{{ roomDetail.name }}</div>
        </div>
      </div>
      <div class="video-content-main">
        <div class="barrage-block" :style="{ top: '40px' }">
          <span
            class="barrage-block-item"
            v-for="(item, index) of barrageMsgList"
            :key="index + item"
            >{{ item.msg }}</span
          >
        </div>
        <BarrageStream></BarrageStream>
        <video id="videoElement" width="100%" height="100%" controls></video>
        <button @click="handlePlay">播放</button>
      </div>
    </section>
    <section class="chat-content">
      <Barrage></Barrage>
    </section>
  </div>
</template>
<script>
//const flyjs = require("../../assets/js/flv");
import flvjs from 'flv.js'
import { common } from '@/assets/js/common.js'
import Barrage from './barrage.vue'
import BarrageStream from './barrageStream.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      roomDetail: {}
    }
  },
  components: {
    Barrage,
    BarrageStream
  },
  computed: {
    ...mapState({
      barrageMsgList: state => state.barrage.barrageMsgList
    })
  },
  created() {},
  async mounted() {
    let urlData = this.$router.history.current.query
    this.livingRoom = urlData.room
    this.roomDetail = await this.$api.livingRoomApi.getRoomDetail({
      id: this.livingRoom
    })
    this.$nextTick(() => {})
  },
  methods: {
    handlePlay() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement')
        this.flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: `${this.$baseEnv.livingUrl}/${this.livingRoom}.flv`
        })
        this.flvPlayer.attachMediaElement(videoElement)
        try {
          this.flvPlayer.load()
          this.flvPlayer.play()
        } catch {
          console.log('error')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.room {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 44vw;
  .video-content {
    box-sizing: border-box;
    height: 100%;
    width: calc(100vw - 360px - 40px);
    min-width: 300px;
    padding: 20px;
    background: #fff;
    position: relative;
    &-header {
      height: 60px;
      display: flex;
      justify-content: flex-start;
      &-avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-title {
        font-size: 20px;
      }
      &-anchor {
        color: #999;
      }
    }
    &-main {
      position: relative;
      height: calc(100% - 60px);
    }
    video {
      object-fit: fill;
    }
  }
  .chat-content {
    width: 360px;
    height: 100%;
    background: #fff;
    margin-right: 20px;
    box-sizing: border-box;
    padding: 20px 0;
  }
}
</style>
