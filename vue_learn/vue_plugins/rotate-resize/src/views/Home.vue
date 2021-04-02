<template>
  <div class="home">
    <rotate-resize
      :width="state.width"
      :height="state.height"
      :top="state.top"
      :left="state.left"
      :rotateAngle="state.rotateAngle"
      :onResize="handleResize"
      :onRotate="handleRotate"
      :onDrag="handleDrag"
    ></rotate-resize>
  </div>
</template>

<script>
// @ is an alias to /src
import rotateResize from '@/components/rotate-resize/'

export default {
  name: 'home',
  data () {
    return {
      state: {
        width: 100,
        height: 100,
        top: 100,
        left: 100,
        rotateAngle: 0
      }
    }
  },
  components: {
    rotateResize
  },
  methods: {
    handleRotate (rotateAngle) {
      this.state.rotateAngle = rotateAngle
    },
    handleResize ({ top, left, width, height }, isShiftKey, type) {
      this.state = {
        top: Math.round(top),
        left: Math.round(left),
        width: Math.round(width),
        height: Math.round(height),
        rotateAngle: this.state.rotateAngle
      }

      console.log('this.state', this.state)
    },
    handleDrag (deltaX, deltaY) {
      this.state.top = this.state.top + deltaY
      this.state.left = this.state.left + deltaX
    }
  }
}
</script>
