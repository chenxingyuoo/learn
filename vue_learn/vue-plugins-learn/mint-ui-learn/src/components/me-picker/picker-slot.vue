<template>
  <div class="picker-slot" :class="classNames" :style="flexStyle">
    <div v-if="!divider" ref="wrapper" class="picker-slot-wrapper" :class="{ dragging: dragging }"
         :style="{ height: contentHeight + 'px' }">
      <div class="picker-item" v-for="itemValue in mutatingValues"
           :class="{ 'picker-selected': itemValue === currentValue }">{{ itemValue }}
      </div>
    </div>
    <div v-if="divider">{{ content }}</div>
  </div>
</template>

<script>


  //拖动函数
  import draggable from './draggable';
  //偏移工具函数
  import translateUtil from './translate';
  //vue事件触发封装
  import emitter from './emitter';

  //common函数
  import '@/assets/js/common';
  //事件处理
  import {once} from '@/assets/js/event';
  //class处理
  import { addClass, removeClass } from '@/assets/js/class';



  //旋转元素
  var rotateElement = function(element, angle) {
    if (!element){
      return;
    }
    var transformProperty = translateUtil.transformProperty;

    //设置样式
    element.style[transformProperty] = element.style[transformProperty].replace(/rotateX\(.+?deg\)/gi, '') + ` rotateX(${angle}deg)`;
  };

  //每一个的高度
  const ITEM_HEIGHT = 36;
  //可见元素角度
  const VISIBLE_ITEMS_ANGLE_MAP = {
    3: -45,
    5: -20,
    7: -15
  };

  export default {
    //向父组件获取数据
    props: {
      //值的队列
      values: {
        type: Array,
        default() {
          return [];
        }
      },
      //当前值
      value: {},
      //可见元素数量
      visibleItemCount: {
        type: Number,
        default: 5
      },
      //旋转效果
      rotateEffect: {
        type: Boolean,
        default: false
      },
      //分割线
      divider: {
        type: Boolean,
        default: false
      },
      textAlign: {
        type: String,
        default: 'center'
      },
      flex: {},
      className: {},
      content: {}
    },
    //Mixin钩子按照传入顺序依次调用,并在调用组件自身的钩子之前被调用
    mixins: [emitter],

    data() {
      return {
        //当前值
        currentValue: this.value,
        //值的队列
        mutatingValues: this.values,
        //是否拖动
        dragging: false,
        //定时器id
        animationFrameId: null
      };
    },
    computed: {
      //设置 flex 样式
      flexStyle() {
        return {
          'flex': this.flex,
          '-webkit-box-flex': this.flex,
          '-moz-box-flex': this.flex,
          '-ms-flex': this.flex
        };
      },
      //设置className
      classNames() {
        const PREFIX = 'picker-slot-';
        let resultArray = [];

        //旋转就要加上定位
        if (this.rotateEffect) {
          resultArray.push(PREFIX + 'absolute');
        }

        //文本排列方向
        let textAlign = this.textAlign || 'center';
        resultArray.push(PREFIX + textAlign);

        //分割线
        if (this.divider) {
          resultArray.push(PREFIX + 'divider');
        }

        //其他className
        if (this.className) {
          resultArray.push(this.className);
        }

        return resultArray.join(' ');
      },
      //内容高度
      contentHeight() {
        return ITEM_HEIGHT * this.visibleItemCount;
      },
      //获取value的index值
      valueIndex() {
        return this.mutatingValues.indexOf(this.currentValue);
      },
      dragRange() {
        var values = this.mutatingValues;
        var visibleItemCount = this.visibleItemCount;

        return [-ITEM_HEIGHT * (values.length - Math.ceil(visibleItemCount / 2)), ITEM_HEIGHT * Math.floor(visibleItemCount / 2)];
      }
    },
    methods: {
      //偏移值2
      value2Translate(value) {
        var values = this.mutatingValues;
        var valueIndex = values.indexOf(value);
        var offset = Math.floor(this.visibleItemCount / 2);

        if (valueIndex !== -1) {
          return (valueIndex - offset) * -ITEM_HEIGHT;
        }
      },

      //第二次偏移( 也就是end 复位时) 获取当前选中的value
      translate2Value(translate) {
        translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
        var index = -(translate - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;

        return this.mutatingValues[index];
      },

      //value改变
      doOnValueChange() {
        var value = this.currentValue;
        var wrapper = this.$refs.wrapper;

        //设置偏移样式
        translateUtil.translateElement(wrapper, null, this.value2Translate(value));
      },

      //队列改变
      doOnValuesChange() {
        var el = this.$el;
        var items = el.querySelectorAll('.picker-item');
        [].forEach.call(items, (item, index) => {
          //设置片一样是
          translateUtil.translateElement(item, null, ITEM_HEIGHT * index);
        });

        if (this.rotateEffect) {
          //执行旋转更新
          this.planUpdateRotate();
        }
      },

      //循转更新
      updateRotate: function(currentTranslate, pickerItems) {
        //分割线
        if (this.divider) {
          return;
        }

        var dragRange = this.dragRange;
        var wrapper = this.$refs.wrapper;

        if (!pickerItems) {
          pickerItems = wrapper.querySelectorAll('.picker-item');
        }

        //获取当前偏移值
        if (currentTranslate === undefined) {
          currentTranslate = translateUtil.getElementTranslate(wrapper).top;
        }

        var itemsFit = Math.ceil(this.visibleItemCount / 2);
        var angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;

        //循环旋转元素
        [].forEach.call(pickerItems, (item, index) => {
          var itemOffsetTop = index * ITEM_HEIGHT;
          var translateOffset = dragRange[1] - currentTranslate;
          var itemOffset = itemOffsetTop - translateOffset;
          var percentage = itemOffset / ITEM_HEIGHT;

          //计算角度
          var angle = angleUnit * percentage;

          //角度容错
          if (angle > 180) {
            angle = 180;
          }
          if (angle < -180){
            angle = -180;
          }

          //旋转元素
          rotateElement(item, angle);

          //操作calssName
          if (Math.abs(percentage) > itemsFit) {
            addClass(item, 'picker-item-far');
          } else {
            removeClass(item, 'picker-item-far');
          }
        });
      },

      //执行旋转更新
      planUpdateRotate: function() {
        var el = this.$refs.wrapper;

        //清除定时器
        cancelAnimFrame(this.animationFrameId);

        this.animationFrameId = requestAnimFrame(() => {
          //旋转更新
          this.updateRotate();
        });

        //绑定一次事件 ， 过度动画结束事件
        once(el, translateUtil.transitionEndProperty, () => {
          //清除定时器
          this.animationFrameId = null;
          cancelAnimFrame(this.animationFrameId);
        });
      },

      //初始化事件
      initEvents() {
        var el = this.$refs.wrapper;
        //拖动状态
        var dragState = {};

        var velocityTranslate;
        //上一次的偏移值
        var prevTranslate;
        //保存子元素
        var pickerItems;

        //执行拖动函数，绑定事件
        draggable(el, {
          start: (event) => {
            //清除定时器
            cancelAnimFrame(this.animationFrameId);
            this.animationFrameId = null;

            //保存拖动状态
            dragState = {
              range: this.dragRange,
              start: new Date(),
              startLeft: event.pageX,
              startTop: event.pageY,
              startTranslateTop: translateUtil.getElementTranslate(el).top
            };

            //保存元素
            pickerItems = el.querySelectorAll('.picker-item');
          },
          drag: (event) => {
            this.dragging = true;

            //拖动的X Y坐标值
            dragState.left = event.pageX;
            dragState.top = event.pageY;

            //增量y值
            var deltaY = dragState.top - dragState.startTop;
            //当前的偏移值加上增量Y
            var translate = dragState.startTranslateTop + deltaY;

            //设置偏移样式
            translateUtil.translateElement(el, null, translate);

            velocityTranslate = translate - prevTranslate || translate;

            //保存上一次的偏移值
            prevTranslate = translate;

            //角度更新
            if (this.rotateEffect) {
              this.animationFrameId = requestAnimFrame(() => {
                //旋转更新
                this.updateRotate(prevTranslate, pickerItems);
              });
            }
          },
          end : (event) => {
            this.dragging = false;

            //动量百分比
            var momentumRatio = 7;
            //当前偏移值
            var currentTranslate = translateUtil.getElementTranslate(el).top;
            //持续时间
            var duration = new Date() - dragState.start;

            //动量偏移值
            var momentumTranslate;

            console.log(duration);

            if (duration < 300) {
              momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
            }

            console.log(momentumTranslate);

            var dragRange = dragState.range;

            //将回调延迟到下次 DOM 更新循环之后执行
            // 这里 DOM 还没有更新
            this.$nextTick(function () {
              //这里 DOM 现在更新了

              //计算偏移值
              var translate;
              if (momentumTranslate) {
                translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
              } else {
                translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
              }

              //取值
              translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);

              //设置偏移样式
              translateUtil.translateElement(el, null, translate);

              //改变当前选中的value
              this.currentValue = this.translate2Value(translate);

              //执行角度更新
              if (this.rotateEffect) {
                this.planUpdateRotate();
              }
            });
          }
        })
      }
    },
    mounted() {
      this.ready = true;

      //Vue2.0后prop不能双向绑定的解决办法 更新currentValue
      this.$emit('input', this.currentValue);

      //非分割线
      if (!this.divider) {
        //初始化时间
        this.initEvents();
        //value改变
        this.doOnValueChange();
      }

      //旋转效果
      if (this.rotateEffect) {
        this.doOnValuesChange();
      }
    },
    watch : {
      values(val) {
        this.mutatingValues = val;
      },
      mutatingValues(val) {
        if (this.valueIndex === -1) {
          this.currentValue = (val || [])[0];
        }
        if (this.rotateEffect) {
          this.$nextTick(() => {
            this.doOnValuesChange();
          });
        }
      },
      currentValue(val) {
        this.doOnValueChange();
        if (this.rotateEffect) {
          this.planUpdateRotate();
        }
        //Vue2.0后prop不能双向绑定的解决办法 更新currentValue
        this.$emit('input', val);
        //通过 mixins 传入的方法
        this.dispatch('picker', 'slotValueChange', this);
      }
    }
  };
</script>

<style>
  .picker-slot {
    font-size: 18px;
    overflow: hidden;
    position: relative;
    max-height: 100%
  }

  .picker-slot.picker-slot-left {
    text-align: left;
  }

  .picker-slot.picker-slot-center {
    text-align: center;
  }

  .picker-slot.picker-slot-right {
    text-align: right;
  }

  .picker-slot.picker-slot-divider {
    color: #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center
  }

  .picker-slot-wrapper {
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    backface-visibility: hidden;
  }

  .picker-slot-wrapper.dragging,
  .picker-slot-wrapper.dragging .picker-item {
    -webkit-transition-duration: 0s;
    transition-duration: 0s;
  }

  .picker-item {
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #707274;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    transition-duration: .3s;
    backface-visibility: hidden;
  }

  .picker-slot-absolute .picker-item {
    position: absolute;
  }

  .picker-item.picker-item-far {
    pointer-events: none
  }

  .picker-item.picker-selected {
    color: #000;
    -webkit-transform: translate3d(0, 0, 0) rotateX(0);
    transform: translate3d(0, 0, 0) rotateX(0);
  }

  .picker-3d .picker-items {
    overflow: hidden;
    -webkit-perspective: 700px;
    perspective: 700px;
  }

  .picker-3d .picker-item,
  .picker-3d .picker-slot,
  .picker-3d .picker-slot-wrapper {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d
  }

  .picker-3d .picker-slot {
    overflow: visible
  }

  .picker-3d .picker-item {
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out
  }
</style>
