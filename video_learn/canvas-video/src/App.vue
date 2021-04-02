<template>
  <div id="app">
    <VideoPreview></VideoPreview>
  </div>
</template>

<script>
import VideoPreview from './views/VideoPreview';
export default {
  data() {
    return {};
  },
  components: {
    VideoPreview
  },
  computed: {},
  beforeDestroy() {},
  methods: {}
}
</script>

<style>
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>


