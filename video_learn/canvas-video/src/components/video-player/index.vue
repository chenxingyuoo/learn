<template>
  <div class="video-wrap" v-loading="loading">

    <div class="video-content" @click="togglePlay">
      <canvas id="myCanvas" ref="myCanvas" :width="videoWidth" :height="videoHeight">Your browser does not support the HTML5 canvas tag.</canvas>
    </div>

    <div class='video-ctrl'> 
      <video-control v-if="showContr" 
      :isPlaying="isPlaying"
      :time="currentPlayTime" 
      :endTime="totalDuration"
      :showSounds="showSounds"
      :audioObject="currentAudio"
      :videoObject="currentVideo"
      @onTogglePlay="togglePlay"
      @dragProgress="onDragProgress"></video-control>
    </div>
  </div>
</template>

<script>
import videoControl from './video-control.vue'
export default {
  props: {
    autoPlay: {
      type: Boolean,
      default: false
    },
    playList: {
      type: Array,
      default () {
        return []
      }
    },
    totalDuration: {
      type: Number,
      default: 0
    },
    videoWidth: {
      type: Number,
      default: 400
    },
    videoHeight: {
      type: Number,
      default: 200
    },
     showContr: {
      type: Boolean,
      default: true
    },
    showSounds: {
      type: Boolean,
      default: true
    },
    audioSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timer: null,
      loading: true, 
      isPlaying: false, // 是否播放中
      isPlayEnd: false, // 是否播放结束 
      videoList: [], // 视频列表 
      currentIndex: null, // 默认当前播放碎片指引
      currentVideo: null, // 当前播放视频
      currentPlayTime: 0, // 当前播放进度
      currentTime: 0,     // 当前视频当前时间
      currentAudio: null, // 当前音频
      audioPlaying: false, // 音频是否播放中
    };
  },
  components: {
    videoControl
  },
  computed: {},
  beforeDestroy() {
    this.cancelLoop()
  },
  mounted() {
    this.canvasInit()
  },
  watch: {
    playList () {
      this.initVideo()
      this.setCurrentIndex(0)
      this.initAudio()
      console.log('totalDuration', this.totalDuration)
    
      this.currentVideo.onloadeddata = this.onLoadedData
      this.currentVideo.autoplay = true
      setTimeout(() => {
        document.body.click()
      }, 0)
    },
    currentPlayTime (val) {
      // 设置是否播放结束
      this.isPlayEnd = Number(val.toFixed(2)) === Number(this.totalDuration.toFixed(2))
    }
  },
  methods: {
    playInit() {
       this.setCurrentIndex(0)
       this.setCurrentVideoCurrentTime(0)
       this.setCurrentTime(0)
       this.setCurrentPlayTime(0)
       this.setAudioCurrentTime(0)
    },
    initAudio () {
      if (!this.audioSrc) {
        return
      }

      this.currentAudio = new Audio()
      this.currentAudio.src = this.audioSrc
      this.currentAudio.load()

      // 音频play监听回调
      let audioPlayHandle = () => {
        this.audioPlaying = true
      }
      // 音频pause监听回调
      let audioPauseHandle = () => {
        this.audioPlaying = false
      }
      // 播放
      this.currentAudio.addEventListener('play', audioPlayHandle, false)
      // 暂停
      this.currentAudio.addEventListener('pause', audioPauseHandle, false)
    },
    audioPlay () {
      if (this.currentAudio) {
        this.currentAudio.play()
      }
    },
    audioPause () {
      if (this.currentAudio) {
        this.currentAudio.pause()
      }
    },
    setAudioCurrentTime (currentTime) {
      if (this.currentAudio) {
        this.currentAudio.currentTime = currentTime
      }
    },
    initVideo () {
      this.playList.map((item) => {
        const video =  document.createElement("video")
        video.src = item.src
        video.load()
        video.onplay = this.onVideoPlay
        video.onpause = this.onVideoPause
        video.onended = this.onVideoPlayEnd
        // video.onloadeddata = this.onLoadedData
        video.ontimeupdate = this.onTimeUpdate
        if (this.audioSrc) {
          video.muted = true
        }
        this.videoList.push(video)
      })
      // this.videoList[0].autoPlay = true
      console.log(this.videoList)
    },
    setCurrentIndex (index) {
      if (this.currentIndex === index) {
        return
      }
      this.currentIndex = index
      this.setCurrentVideo()
    },
    setCurrentVideo () {
      this.currentVideo = this.videoList[this.currentIndex]
    },
    setCurrentVideoCurrentTime (time) {
      this.currentVideo.currentTime = time
    },
    setCurrentPlayTime (time) {
      this.currentPlayTime = time
    },
    setCurrentTime (time) {
      this.currentTime = time
    },
    nextVideo () {
      this.currentIndex += 1
      this.setCurrentVideo()
    },
    getIsLastVideo () {
      return this.currentIndex === this.videoList.length - 1
    },
    canvasInit () {
      this.myCanvas = this.$refs.myCanvas
      this.ctx = this.myCanvas ? this.myCanvas.getContext('2d') : null
    },
    draw () {
      this.ctx.drawImage(this.currentVideo, 0, 0, this.videoWidth, this.videoHeight)
    },
    loop () {
      this.draw()
      this.timer = window.requestAnimationFrame(this.loop) 
    },
    cancelLoop () {
      this.timer && window.cancelAnimationFrame(this.timer)
    },
    togglePlay () {
      if (!this.isPlaying) {
        if (this.isPlayEnd) {
          this.playInit()
        }
        this.videoPlay()
        this.audioPlay()
      } else {
        this.videoPause()
        this.audioPause()
      }
    },
    videoPlay () {
      this.loop()
      this.currentVideo.play()
      this.isPlaying = true
      
    },
    videoPause () {
      this.currentVideo.pause()
      this.isPlaying = false
      this.cancelLoop()
    },
    onLoadedData (e) {
      console.log(e.currentTarget.duration)
      
      this.draw()
      this.videoPlay()
      this.audioPlay()
      this.loading = false
      console.log('onLoadedData')
    },
    onVideoPlay () {
      this.isPlaying = true
      console.log('onPlay')
    },
    onVideoPause () {
      this.isPlaying = false
      console.log('onPause')
    },
    onVideoPlayEnd () {
      console.log('end')
      if (this.getIsLastVideo()) {
        this.audioPause()
        this.isPlaying = false
        this.cancelLoop()
        return
      }
      this.setCurrentTime(0)
      this.nextVideo()
      this.videoPlay()
    },
    onTimeUpdate (e) {
      let currentTime = e.currentTarget.currentTime
      let oldCurrentTime = this.currentTime
      
      if (currentTime !== oldCurrentTime && this.isPlaying) {
        let diff = currentTime - oldCurrentTime
        let currentPlayTime = this.currentPlayTime + (diff > 0 ? diff : 0)
        this.setCurrentPlayTime(currentPlayTime)
        this.setCurrentTime(currentTime)
      }
    },
    // 通过进度获取视频信息
    getVideoInfoByProgress (progressTime) {
      let beforeTimeLens = 0
      for (let i = 0; i < this.videoList.length; i++) {
        const item = this.videoList[i]
        if(beforeTimeLens + item.duration >= progressTime) {
          let currentTime
          if (i === 0) {
            currentTime = progressTime
          } else {
            // 当前进度 - 不包含自身及往后视频的 “视频总长度”
            currentTime = progressTime - beforeTimeLens
          }
          return {
            currentIndex: i,
            currentTime: currentTime
          }
        }

        // 加上一个视频的长度
        beforeTimeLens += item.duration
      }
    },
    onDragProgress (val) {
      console.log('onDragProgress')
      
      // this.setCurrentTime(0) // 当拖拽的是 视频应该暂停,不然声音还一直播放
      // this.videoPause() // 当拖拽的是 视频应该暂停,不然声音还一直播放
      // this.audioPause()

      let videoInfo = this.getVideoInfoByProgress(val)
      this.setCurrentIndex(videoInfo.currentIndex)
      this.setCurrentVideoCurrentTime(videoInfo.currentTime)
      // this.currentPlayTime = val
      // this.currentVideoCurrentTime = videoInfo.currentTime
      this.setCurrentPlayTime(val)
      this.setCurrentTime(videoInfo.currentTime)
      this.setAudioCurrentTime(val)

      setTimeout(() => {
        this.videoPlay()
        this.audioPlay()
      }, 0);
    }
  }
}
</script>

<style>
.video-wrap{
    width: 100%;
    height: 100%;
    position: relative;
}
#myCanvas{
  display: block;
}
</style>