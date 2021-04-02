<template>
  <div class="video-wrap" v-loading="loading" @click="play">
    <canvas id="myCanvas" ref="myCanvas" :width="width" :height="height">Your browser does not support the HTML5 canvas tag.</canvas>

    <div class='video-ctrl'> 
      <!-- <video-control v-if='showContr' :time='hasPlayTime' :endTime='endTime' @dragProgress='dragProgress' :showSounds='showSounds'></video-control> -->
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
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 200
    },
     showContr: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: true,
      isPlaying: false,
      currentIndex: 0,
      videoList: [],
      currentVideo: null
    };
  },
  components: {
    videoControl
  },
  computed: {},
  beforeDestroy() {},
  mounted() {
    this.init()
    
  },
  watch: {
    playList () {
      this.initVideo()
      this.setCurrentIndex(0)
      this.loop()
      this.loading = false
    }
  },
  methods: {
    initVideo () {
      this.playList.map((item) => {
        const video =  document.createElement("video")
        video.src = item.src
        video.load()
        video.onplay = this.onPlay
        video.onpause = this.onPause
        video.onended = this.onPlayEnd
        this.videoList.push(video)
      })
      // this.videoList[0].autoPlay = true
      console.log(this.videoList)
    },
    setCurrentIndex (index) {
      this.currentIndex = index
      this.setCurrentVideo()
    },
    setCurrentVideo () {
      this.currentVideo = this.videoList[this.currentIndex]
    },
    nextVide () {
      this.currentIndex += 1
      this.setCurrentVideo()
    },
    getIsLastVideo () {
      return this.currentIndex === this.videoList.length - 1
    },
    init () {
      this.myCanvas = this.$refs.myCanvas
      this.ctx = this.myCanvas ? this.myCanvas.getContext('2d') : null
    },
    
    draw () {
      this.ctx.drawImage(this.currentVideo, 0, 0, this.width, this.height)
    },
    loop () {
      this.draw()
      window.requestAnimationFrame(this.loop) 
    },
    play () {
      this.currentVideo.play()
      this.isPlaying = true
    },
    pause () {
      this.currentVideo.pause()
      this.isPlaying = false
    },
    onPlay () {
      console.log('onPlay')
    },
    onPause () {
      console.log('onPause')
    },
    onPlayEnd () {
      console.log('end')
      if (this.getIsLastVideo()) {
        return
      }
      this.nextVide()
      this.play()
    }
  }
}
</script>

<style lang="scss">
.video-wrap{
    width: 100%;
    height: 100%;
}
</style>