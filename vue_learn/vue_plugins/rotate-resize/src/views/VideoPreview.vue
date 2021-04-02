<template>
  <VideoPlayer :playList="playList"></VideoPlayer>
</template>

<script>
import VideoPlayer from '../components/video-player/index';
export default {
  data() {
    return {
        playList: []
    };
  },
  components: {
      VideoPlayer
  },
  computed: {},
  beforeMount() {
    this.getData()
  },
  methods: {
    getData: function () {
      const that = this
      setTimeout(() => {
        that.playList = [{
          src: 'https://img.kuaizi.co/vid/8/3e/3ed1b8730870af30b2348f52adbc7076.mp4',
          duration: 2 // 长度
        }, { // 碎片资源列表  这个是需要后端返回的
          src: 'https://img.kuaizi.co/vid/8/fc/fc5032b1580232a1f86276601de2129d.mp4',
          duration: 1 // 长度
        }, {
          src: 'https://img.kuaizi.co/vid/8/f1/f116e8750658890deb194a1647c3b31d.mp4',
          duration: 1
        }, {
          src: 'https://img.kuaizi.co/vid/8/a6/a6160efceabdbde053cb9bc0dcca339c.mp4',
          duration: 2
        }, {
          src: 'https://img.kuaizi.co/vid/8/53/532b008e011876c6b8eff771ba773915.mp4',
          duration: 2
        }]
      }, 1000)
    }
  }
}
</script>

<style>

</style>