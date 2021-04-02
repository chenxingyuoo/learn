<template>
  <div class='border-line J_borderLine' :style='divStyle' ref="rectBox" @mousedown="startDrag">
    <div v-for="(item, i) in direction" class="scale" :class="zoomableMap[item]" @mousedown.stop="(e) => startResize(e, zoomableMap[item])" :style="[{cursor: getCursorStyle(item)}, reverseScaleStyle]" :key="i"></div>
    <!--<div class='r scale scale-right-center J_scale_center border-primary bg-white'  @mousedown.stop='(e) => startResize(e, "right-center")' :style="[reverseScaleStyle, cursor[0]]"></div>-->
    <!--<div class='l scale scale-left-center J_scale_center border-primary bg-white' @mousedown.stop='(e) => startResize(e, "left-center")' :style="[reverseScaleStyle, cursor[2]]"></div>-->
    <!--<div class='b scale scale-bottom-center J_scale_center border-primary bg-white' @mousedown.stop='(e) => startResize(e, "bottom-center")' :style="[reverseScaleStyle, cursor[1]]"></div>-->
    <!--<div class='t scale scale-top-center J_scale_center border-primary bg-white' @mousedown.stop='(e) => startResize(e, "top-center")' :style="[reverseScaleStyle, cursor[3]]"></div>-->
    <!--<div class='tl scale scale-top-left J_scale border-primary bg-white' @mousedown.stop='(e) => startResize(e, "top-left")' :style="[reverseScaleStyle, cursor[7]]"></div>-->
    <!--<div class='tr scale scale-top-right J_scale border-primary bg-white' @mousedown.stop='(e) => startResize(e, "top-right")' :style="[reverseScaleStyle, cursor[4]]"></div>-->
    <!--<div class='bl scale scale-bottom-left J_scale border-primary bg-white' @mousedown.stop='(e) => startResize(e, "bottom-left")' :style="[reverseScaleStyle, cursor[6]]"></div>-->
    <!--<div class='br scale scale-bottom-right J_scale border-primary bg-white' @mousedown.stop='(e) => startResize(e, "bottom-right")' :style="[reverseScaleStyle, cursor[5]]"></div>-->
    <!--<div class='rotate icon iconfont icon-xuanzhuan1 bg-primary text-white border-placeholder' @mousedown.stop='startRotate' :style="[{top: '-26px'}]"></div>-->
    <div class="rotate" @mousedown.stop="startRotate" v-show="isShowRotate">
      <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.536 3.464A5 5 0 1 0 11 10l1.424 1.425a7 7 0 1 1-.475-9.374L13.659.34A.2.2 0 0 1 14 .483V5.5a.5.5 0 0 1-.5.5H8.483a.2.2 0 0 1-.142-.341l2.195-2.195z"
          fill="#0999AA"
          fillRule="nonzero"
        />
      </svg>
    </div>
  </div>
</template>

<script>
'use strict'
import VueTypes from 'vue-types'
import { getLength, getAngle, getCursor } from './utils'

export default {
  props: {
    styles: VueTypes.object,
    zoomable: VueTypes.string,
    rotatable: VueTypes.bool,
    onResizeStart: VueTypes.func,
    onResize: VueTypes.func,
    onResizeEnd: VueTypes.func,
    onRotateStart: VueTypes.func,
    onRotate: VueTypes.func,
    onRotateEnd: VueTypes.func,
    onDragStart: VueTypes.func,
    onDrag: VueTypes.func,
    onDragEnd: VueTypes.func,
    parentScaleNum: VueTypes.number.def(1),
    parentRotateAngle: VueTypes.number
  },
  name: 'rect-box',
  data () {
    return {
      locals: 1,
      cursor: [],
      isShowRotate: this.rotatable,
      zoomableMap: {
        'n': 't',
        's': 'b',
        'e': 'r',
        'w': 'l',
        'ne': 'tr',
        'nw': 'tl',
        'se': 'br',
        'sw': 'bl'
      },
      direction: this.zoomable.split(',').map(d => d.trim()).filter(d => d)
    }
  },
  components: {},
  computed: {
    reverseScaleStyle () {
      return {
        transform: `scale(${1 / this.parentScaleNum})`
      }
    },
    divStyle () {
      console.log('this.styles', this.styles)
      let { position, size, transform } = this.styles

      let style = {
        width: Math.abs(size.width) + 'px',
        height: Math.abs(size.height) + 'px',
        transform: `rotate(${transform.rotateAngle}deg)`,
        left: position.centerX - Math.abs(size.width) / 2 + 'px',
        top: position.centerY - Math.abs(size.height) / 2 + 'px'
      }

      return style
    }
  },
  beforeMount () {
  },
  mounted () {
    this.setElementRef(this.$refs.rectBox)
  },
  filters: {

  },
  methods: {
    setElementRef (ref) {
      this.$element = ref
    },
    getCursorStyle (d) {
      let { position, size, transform } = this.styles
      const cursor = `${getCursor(transform.rotateAngle + this.parentRotateAngle, d)}-resize`
      return cursor
    },
    // Drag
    startDrag  (e) {
      let { clientX: startX, clientY: startY } = e
      this.onDragStart && this.onDragStart()
      this._isMouseDown = true
      const onMove = (e) => {
        if (!this._isMouseDown) return // patch: fix windows press win key during mouseup issue
        e.stopImmediatePropagation()
        const { clientX, clientY } = e
        const deltaX = clientX - startX
        const deltaY = clientY - startY
        this.onDrag(deltaX, deltaY)
        startX = clientX
        startY = clientY
      }
      const onUp = () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
        if (!this._isMouseDown) return
        this._isMouseDown = false
        this.onDragEnd && this.onDragEnd()
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    },

    // Rotate
    startRotate  (e) {
      if (e.button !== 0) return
      const { clientX, clientY } = e
      const { styles: { transform: { rotateAngle: startAngle } } } = this
      const rect = this.$element.getBoundingClientRect()
      const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
      const startVector = {
        x: clientX - center.x,
        y: clientY - center.y
      }
      this.onRotateStart && this.onRotateStart()
      this._isMouseDown = true
      const onMove = (e) => {
        if (!this._isMouseDown) return // patch: fix windows press win key during mouseup issue
        e.stopImmediatePropagation()
        const { clientX, clientY } = e
        const rotateVector = {
          x: clientX - center.x,
          y: clientY - center.y
        }
        const angle = getAngle(startVector, rotateVector)
        this.onRotate(angle, startAngle)
      }
      const onUp = () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
        if (!this._isMouseDown) return
        this._isMouseDown = false
        this.onRotateEnd && this.onRotateEnd()
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    },

    // Resize
    startResize (e, type, cursor) {
      if (e.button !== 0) return
      // document.body.style.cursor = cursor
      const styles = this.styles
      const { centerX, centerY } = styles.position
      const { width, height } = styles.size
      const { rotateAngle } = styles.transform
      // const { styles: { position: { centerX, centerY }, size: { width, height }, transform: { rotateAngle } } } = this
      // const { clientX: startX, clientY: startY } = e
      // debugger
      const startX = e.clientX
      const startY = e.clientY
      const rect = { width, height, centerX, centerY, rotateAngle }
      // const type = e.target.getAttribute('class').split(' ')[ 0 ]
      this.onResizeStart && this.onResizeStart()
      this._isMouseDown = true

      const onMove = (e) => {
        if (!this._isMouseDown) return // patch: fix windows press win key during mouseup issue
        e.stopImmediatePropagation()
        const { clientX, clientY } = e
        console.log('startX', startX)
        console.log('clientX', clientX)
        const deltaX = clientX - startX
        const deltaY = clientY - startY
        const alpha = Math.atan2(deltaY, deltaX)
        const deltaL = getLength(deltaX, deltaY)
        const isShiftKey = e.shiftKey
        this.onResize(deltaL, alpha, rect, type, isShiftKey)
      }

      const onUp = () => {
        document.body.style.cursor = 'auto'
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
        if (!this._isMouseDown) return
        this._isMouseDown = false
        this.onResizeEnd && this.onResizeEnd()
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    }
  }
}
</script>

<style lang="scss">
  .border-line {
    position: absolute;
    // pointer-events: none;
    &.locked {
      > div {
        display: none;
      }
      &:before {
        outline-color: #ff3d67;
      }
      &:after {
        outline-color: #ff3d67;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      outline: 1px solid hsla(0,0%,100%,.67);
      // outline-offset: 1px;
    }
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      outline: 1px dashed rgba(0,0,0,.5);
      // outline-offset: 1px;
    }
  }
  .rotate {
    position: absolute;
    pointer-events: all;
    width: 20px;
    height: 20px;
    border-width: 1px;
    border-style: solid;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    /*font-size: 20px;*/
    left: 50%;
    margin-left: -10px;
    top: -26px;
    box-sizing: border-box;
    cursor: alias !important;
    &:before {
      position: relative;
      left: -1px;
      top: -1px;
    }
  }
  .scale {
    pointer-events: all;
    position: absolute;
    width: 6px;
    height: 6px;
    border-width: 1px;
    border-style: solid;
    background-position: bottom right;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
    z-index: 11;
    transform: none;
    border-color: #0999AA;
    background-color: #fff;
  }
  .scale-top-left {
    cursor: nwse-resize;
    top: -3px;
    left: -3px;
  }
  .scale-top-right {
    cursor: nesw-resize;
    top: -3px;
    right: -3px;
  }
  .scale-right-center {
    cursor: ew-resize;
    top: 50%;
    margin-top: -3px;
    right: -3px;
  }
  .scale-left-center {
    cursor: ew-resize;
    top: 50%;
    margin-top: -3px;
    left: -3px;
  }
  .scale-bottom-center {
    cursor: ns-resize;
    right: 50%;
    margin-right: -3px;
    bottom: -3px;
  }
  .scale-top-center {
    cursor: ns-resize;
    right: 50%;
    margin-right: -3px;
    top: -3px;
  }
  .scale-bottom-left {
    bottom: -3px;
    left: -3px;
    cursor: nesw-resize;
  }
  .scale-bottom-right {
    bottom: -3px;
    right: -3px;
    cursor: nwse-resize;
  }

  .t,
  .tl,
  .tr {
    top: -3px;
  }

  .b,
  .bl,
  .br {
    bottom: -3px;
  }

  .r,
  .tr,
  .br {
    right: -3px;
  }

  .tl,
  .l,
  .bl {
    left: -3px;
  }

  .l,
  .r {
    top: 50%;
    margin-top: -3px;
  }

  .t,
  .b {
    left: 50%;
    margin-left: -3px;
  }
</style>
