<template>
  <div id="video-preview" :style="{width: `${width}px`, height: `${height}px`}">
    <!-- <video src="https://img.kuaizi.co/vid/8/3e/3ed1b8730870af30b2348f52adbc7076.mp4" autoplay></video> -->
    <VideoPlayer
      :style="videoStyle"
      :videoWidth="videoWidth"
      :videoHeight="videoHeight"
      :playList="playList"
      :totalDuration="totalDuration"
      :audioSrc="audioSrc"
    ></VideoPlayer>
    <img 
    class="img-item"
    :src="item.src.url" 
    :style="{
      top:`${item.newx}px`,
      left:`${item.newy}px`,
      width: `${item.neww}px`,
      height: `${item.newh}px`,
      'z-index': `${item.z}`
    }"
    v-for="(item, i) in imagesData" 
    :key="i"/>
  </div>
</template>

<script>
import VideoPlayer from "../components/video-player/index"
  import queryComponent from 'component-querystring'

export default {
  data() {
    let query = queryComponent.parse(location.search)
    return {
      width: window.width,
      height: window.height,
      videoWidth: 400,
      videoHeight: 200,
      firstVideo: null,
      videoStyle: {},   
      playList: [],     // 视频列表
      totalDuration: 0, // 视频总长度
      audioSrc: "",     // 播放音频地址
      imagesData: [],   // 图片元件数据
      zoom: 1,
      loadVideo: /load_video/gi.test(location.href), // 表示地址栏中没有load_video字段
      creative: {
        template_id: query.template_id,
        creative_id: query.creative_id,
        width: window.width,
        height: window.height,
        objs: window.objs,
        layout: window.layout,
        creative_type: window.creative_type, // 2 表示banner的创意 5表示video的创意
        url: window.url,
        bind_array: window.bind_array || [],
        video_array: window.video_array
      }
    };
  },
  components: {
    VideoPlayer
  },
  computed: {},
  created() {
    this.init()
    this.getData();
  },
  methods: {
    init () {
      let loadVideo
      if (/content_element/gi.test(location.href)) loadVideo = false;
      if (/load_video/gi.test(location.href)) loadVideo = true;
      
      // const getImages
      this.setZoom()
      window.addEventListener('resize', (e) => {
        setTimeout(() => {
          this.onResize(e)
        }, 100);
      }, false)
    },
    setZoom () {
      this.zoom = document.documentElement.clientWidth / window.width
      this.zoom = this.zoom > 1 ? 1 : this.zoom
    },
    setZoomInfo (options) {
      this.$set(options, 'newx', options.x * this.zoom)
      this.$set(options, 'newy', options.y * this.zoom)
      this.$set(options, 'neww', options.w * this.zoom)
      this.$set(options, 'newh', options.h * this.zoom)
    },
    setVideoStyle (options) {
      this.videoWidth = options.neww
      this.videoHeight = options.newh
      this.videoStyle = {
        top: options.newy + 'px',
        left: options.newx + 'px',
        width: options.neww + 'px',
        height: options.newh + 'px'
      }
    },
    onResize (e) {
      this.setZoom()
      this.creative.objs.map((item) => {
        const options = item.options
        this.setZoomInfo(options)
        this.setVideoStyle(this.firstVideo)
      })
    },
    getData() {
      this.creative.objs.map((item) => {
        const options = item.options
        this.setZoomInfo(options)

        if (item.type === 'Img') {
          this.imagesData.push(options)
        } else if (item.type === 'Vid') {
          // this.playList.push(item.options)
          if (!this.firstVideo) {
            this.firstVideo = item.options
            this.setVideoStyle(this.firstVideo)
          }
        }
      })

      const that = this;
      setTimeout(() => {
        that.audioSrc =
          "http://img.kuaizi.co/vid/8/57/57f8f1977096d9c279e75f5e518709ba.mp3";
        that.playList = [
          {
            src:
              "https://img.kuaizi.co/vid/8/3e/3ed1b8730870af30b2348f52adbc7076.mp4",
            duration: 2.602667 // 长度
          },
          {
            // 碎片资源列表  这个是需要后端返回的
            src:
              "https://img.kuaizi.co/vid/8/fc/fc5032b1580232a1f86276601de2129d.mp4",
            duration: 1.045333 // 长度
          },
          {
            src:
              "https://img.kuaizi.co/vid/8/f1/f116e8750658890deb194a1647c3b31d.mp4",
            duration: 1.045333
          },
          {
            src:
              "https://img.kuaizi.co/vid/8/a6/a6160efceabdbde053cb9bc0dcca339c.mp4",
            duration: 2.090667
          },
          {
            src:
              "https://img.kuaizi.co/vid/8/53/532b008e011876c6b8eff771ba773915.mp4",
            duration: 2.773333
          }
        ];
        that.totalDuration = that.playList.reduce((num, item) => {
          return num + item.duration;
        }, 0);
        console.log("that.totalDuration", that.totalDuration);
      }, 1000);
    }
  }
};
</script>

<style>

#video-preview {
  position: relative;
  margin: auto;
}

.img-item{
  position: absolute;
}

:fullscreen body {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: black;
}
:fullscreen #video-preview {
  /* position: fixed !important;
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  box-sizing: border-box !important;
  min-width: 0px !important;
  max-width: none !important;
  min-height: 0px !important;
  max-height: none !important;
  width: 100% !important;
  height: 100% !important;
  transform: none !important; */
}
</style>