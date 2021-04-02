<template>
  <rectBox
    :styles="styles"
    :zoomable="zoomable"
    :onDrag="handleDrag"
    :onResize="handleResize"
    :onRotate="handleRotate"
  ></rectBox>
</template>

<script>
'use strict'
import VueTypes from 'vue-types'
import { centerToTL, tLToCenter, getNewStyle, degToRadian } from './utils'
import rectBox from './rect-box.vue'

export default {
  props: {
    top: VueTypes.number.isRequired,
    left: VueTypes.number.isRequired,
    width: VueTypes.number.isRequired,
    height: VueTypes.number.isRequired,
    rotateAngle: VueTypes.number.def(0),
    zoomable: VueTypes.string.def('n, w, s, e, nw, ne, se, sw'),
    rotatable: VueTypes.bool.def(true),
    parentRotateAngle: VueTypes.number.def(0),
    minWidth: VueTypes.number.def(-Infinity),
    minHeight: VueTypes.number.def(-Infinity),
    aspectRatio: VueTypes.number,
    onRotateStart: VueTypes.func,
    onRotate: VueTypes.func,
    onRotateEnd: VueTypes.func,
    onResizeStart: VueTypes.func,
    onResize: VueTypes.func,
    onResizeEnd: VueTypes.func,
    onDragStart: VueTypes.func,
    onDrag: VueTypes.func,
    onDragEnd: VueTypes.func,
  },
  name: 'resizer',
  data () {
    return {

    }
  },
  components: {
    rectBox
  },
  computed: {
    styles () {
      return tLToCenter({ top: this.top, left: this.left, width: this.width, height: this.height, rotateAngle: this.rotateAngle })
    }
  },
  beforeMount () {
    console.log('mylog', this)
  },
  mounted () {

  },
  methods: {
    handleDrag (deltaX, deltaY) {
      this.onDrag && this.onDrag(deltaX, deltaY)
    },
    handleRotate (angle, startAngle) {
      if (!this.onRotate) return
      let rotateAngle = Math.round(startAngle + angle)
      if (rotateAngle >= 360) {
        rotateAngle -= 360
      } else if (rotateAngle < 0) {
        rotateAngle += 360
      }
      if (rotateAngle > 356 || rotateAngle < 4) {
        rotateAngle = 0
      } else if (rotateAngle > 86 && rotateAngle < 94) {
        rotateAngle = 90
      } else if (rotateAngle > 176 && rotateAngle < 184) {
        rotateAngle = 180
      } else if (rotateAngle > 266 && rotateAngle < 274) {
        rotateAngle = 270
      }
      this.onRotate(rotateAngle)
    },
    handleResize (length, alpha, rect, type, isShiftKey) {
      if (!this.onResize) return
      const { rotateAngle, aspectRatio, minWidth, minHeight, parentRotateAngle } = this
      const beta = alpha - degToRadian(rotateAngle + parentRotateAngle)
      const deltaW = length * Math.cos(beta)
      const deltaH = length * Math.sin(beta)
      const ratio = isShiftKey && !aspectRatio ? rect.width / rect.height : aspectRatio
      const newStyle = getNewStyle(type, { ...rect, rotateAngle }, deltaW, deltaH, ratio, minWidth, minHeight)
      console.log('newStyle', newStyle)
      const { centerX, centerY } = newStyle.position
      const { width, height } = newStyle.size

      this.onResize(centerToTL({ centerX, centerY, width, height, rotateAngle }), isShiftKey, type)
    }
  }
}
</script>

<style lang="scss">

</style>
