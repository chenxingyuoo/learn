<template>
  <div class="controls">
    <div class="left">
      <span class="play-contr" @click="togglePlay">
        <i class="iconfont iconbofang2" v-show="!isPlaying"></i>
        <i class="iconfont iconzanting3 ic" v-show="isPlaying"></i>
      </span>
      <span>{{currentTimeLabel}}/{{terminalTimeLabel}}</span>
    </div>

    <div class="center">
      <el-slider
            :step="0.01"
            @change="progressDrag"
            v-model="progress"
            :max="endTime"
            :format-tooltip="formatTooltip"
          ></el-slider>
    </div>

    <div class="right">
         <span class="nav-item sound-contr" v-if="showSounds">
            <span class="sound-icon" @click="triggerSound">
              <i class="iconfont iconshengyin" v-show="!mutedable"></i>
              <i class="iconfont iconjingyin1" v-show="mutedable"></i>
            </span>
            <div class="sound-progress">
              <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              v-model="soundValue"
              orient="vertical"
              @change="onSoundValueChange"
            >
            </div>
          </span>
          <!-- @click="toggleFullscreen" -->
          <span class="nav-item" v-fullscreen.el >
            <i class="iconfont iconscreenfull" v-show="!isFullscreen"></i>
            <i class="iconfont iconquanping2" v-show="isFullscreen"></i>
          </span>
    </div>
    
  </div>
</template>

<script>
import moment from "moment";
require("moment-duration-format");
export default {
  name: "video-control",
  props: {
    time: {
      type: Number,
      default: 0
    },
    endTime: {
      type: Number,
      default: 0
    },
    showSounds: {
      type: Boolean
    },
    isPlaying: {
      type: Boolean
    },
    audioObject: {
      type: [HTMLAudioElement, Object]
    },
    videoObject: {
      type: [HTMLVideoElement, Object]
    }
    // ["time", "endTime", "showSounds"]
  },
  data() {
    return {
      mutedable: false,
      currentTimeLabel: "00:00",
      terminalTimeLabel: "",
      progress: 0, // 进度条
      isFullscreen: false,
      soundValue: 0
    };
  },
  watch: {
    time(val) {
      this.progress = val;
      // this.currentTimeLabel = this.durationFormat(Math.floor(val))
    },
    endTime(val) {
      this.terminalTimeLabel = this.durationFormat(val); // 格式化所有视频长度
    },
    progress(val) {
      this.currentTimeLabel = this.durationFormat(Math.floor(val));
    },
    audioObject(val) {
      this.soundValue = val.volume;
      this.setMediaVolume(val.volume);
    },
    videoObject(val) {
      this.soundValue = val.volume;
      this.setMediaVolume(val.volume);
    }
  },
  beforeMount() {
    this.terminalTimeLabel = this.durationFormat(this.endTime); // 格式化所有视频长度
    console.log("this.terminalTimeLabel", this.terminalTimeLabel);

    console.log("audioObject", this.audioObject);

    this.fullscreenEventInit();
  },
  methods: {
    togglePlay() {
      this.$emit("onTogglePlay");
    },
    /**
     *  @param ms 秒数
     */
    durationFormat(ms) {
      // 大过一个小时候的时候 格式化为: h:m:ss
      // 否则不显示小时 只显示 分和秒
      return ms > 3600
        ? moment.duration(ms, "seconds").format("hh:mm:ss", { trim: false })
        : moment.duration(ms, "seconds").format("mm:ss", { trim: false });
    },
    progressDrag(val) {
      this.$emit("dragProgress", val);
    },
    formatTooltip() {
      return this.currentTimeLabel;
    },
    getMediaObject() {
      if (this.audioObject) {
        return this.audioObject;
      } else {
        return this.videoObject;
      }
    },
    triggerSound() {
      this.mutedable = !this.mutedable;
      this.getMediaObject().muted = this.mutedable;
    },
    // 声音拖动条改变
    onSoundValueChange(e) {
      this.setMediaVolume(Number(e.currentTarget.value));
    },
    // 设置媒体音量
    setMediaVolume(val) {
      this.getMediaObject().volume = val;
    },
    fullscreenEventInit() {
      [
        "fullscreenchange",
        "mozfullscreenchange",
        "webkitfullscreenchange",
        "msfullscreenchange"
      ].map(event => {
        document.addEventListener(
          event,
          e => {
            if (
              document.fullscreen ||
              document.mozFullScreen ||
              document.webkitIsFullScreen ||
              document.msFullscreenElement
            ) {
              this.isFullscreen = true;
            } else {
              this.isFullscreen = false;
            }
          },
          false
        );
      });
    },
    toggleFullscreen() {
      if (!this.isFullscreen) {
        this.fullscreen();
      } else {
        this.exitFullscreen();
      }
    },
    fullscreen() {
      var docElm = document.documentElement;
      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      //IE11
      else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }
};
</script>


<style scoped>

.controls {
  opacity: 0.8;
  background-color: #fff;
  position: absolute;
  left: 0;
  bottom: -24px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 1000;
}
.controls .left {
  width: 100px;
  display: inline-block;
}
.controls .center {
  width: calc(100% - 160px);
  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
.controls .right{
  width: 60px; 
  display: inline-block;
}
.controls .row {
  line-height: 30px;
}
.time-duration {
  font-size: 0.6rem;
}
.play-contr {
  cursor: pointer;
  margin-right: 10px;
}
.nav-item {
  position: relative;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  color: #999;
  vertical-align: bottom;
  margin-right: 10px;
  height: 23px;
}
.nav-item i {
  font-size: 20px;
}
.sound-contr:hover  .sound-progress{
  display: block;
}
.sound-icon{
  position: relative;
  z-index: 10;
}
.sound-progress {
  display: none;
  position: absolute;
  bottom: 0px;
  right: -4px;
  width: 30px;
  height: 115px;
  text-align: center;
  background-color: #eee;
  border-radius: 20px;
  padding-top: 10px;
}
.sound-contr input[type="range"][orient="vertical"]{
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical; /* WebKit */
  /* position: absolute; */
  /* top: 10px; */
  /* left: 0; */
  width: 8px;
  height: 80px;
}
</style>

<style>
.controls .el-slider__runway{
  margin: 2px 0;
}
</style>