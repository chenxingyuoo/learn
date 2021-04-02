export default {

  navigator: {
    doc: '文档',
    demo: '示例',
    started: '起步'
  },

  features: {
    userExperience: {
      title: '体验优化',
      desc: '为了让滚动体验更加流畅，我们提供了惯性滚动、边界回弹、滚动条淡入淡出等效果的灵活配置，能够明显地优化 Web 滚动体验。'
    },
    application: {
      title: '应用丰富',
      desc: '其应用场景包括了滚动列表、选择器、轮播图、索引列表、开屏引导，并且能够轻松实现下拉刷新、上拉加载等功能。'
    },
    dependence: {
      title: '零依赖',
      desc: '不依赖任何框架，既可以原生 JS 引用，也可以与任意前端 MVVM 框架结合使用，比如官方 DEMO 就是与 Vue 的结合示例。'
    }
  },

  examples: {
    normalScrollList: '普通 Scroll 组件',
    indexList: '索引列表',
    picker: 'Picker 组件',
    slide: 'Slide 组件',
    startGuidance: '开屏引导',
    fullPageVerticalSlide: '全屏纵向slide',
    freeScroll: '自由滚动',
    formList: '表单列表',
    goodsList: '商品列表',
    navList: '导航列表',
    infinity: '无限滚动',
    verticalScrollImg: 'vertical-scroll.jpeg',
    indexListImg: 'index-list.jpeg',
    pickerImg: 'picker.jpeg',
    slideImg: 'slide.jpeg',
    startGuidanceImg: 'full-page-slide.jpeg',
    freeScrollImg: 'free-scroll.jpeg',
    formListImg: 'form-list.jpeg',
    goodsListImg: 'goods-list.jpeg',
    navListImg: 'navigator-zh.jpg',
    infinityScrollImg: 'infinity-scroll.png'
  },

  normalScrollListPage: {
    desc: '基于 BScroll 实现垂直滚动列表组件',
    scrollbar: '滚动条',
    pullDownRefresh: '下拉刷新',
    pullUpLoad: '上拉加载',
    previousTxt: '我是第 ',
    followingTxt: ' 行',
    newDataTxt: '我是新数据: '
  },

  scrollComponent: {
    defaultLoadTxtMore: '加载更多',
    defaultLoadTxtNoMore: '没有更多数据了',
    defaultRefreshTxt: '刷新成功'
  },

  indexListPage: {
    title: '当前城市: 北京市'
  },

  pickerPage: {
    desc: 'picker 组件是移动端常见的选择器组件，支持单列和多列；可以动态改变 picker 某列的数据，实现级联的效果。',
    picker: '选择器',
    pickerDemo: '选择器示例 ...',
    oneColumn: '单列',
    twoColumn: '两列',
    threeColumn: '三列',
    linkage: '级联',
    confirmTxt: '确定 | 好的',
    cancelTxt: '取消 | 关闭'
  },

  slidePage: {
    desc: '轮播图是移动端常见的需求，支持左右滑动。',
    click: '点击',
    isAutoPlayTip: '自动播放',
    isLoopTip: '循环播放',
    isShowDotTip: '显示dots',
    changeData: '改变数据',
    pageTurn: '翻页'
  },

  fullPageSlideComponent: {
    buttonTxt: '开始使用'
  },

  freeScrollPage: {
    desc: '自由滚动，可支持横向和纵向同时滚动。'
  },

  formListPage: {
    desc: '由于当 click 选项为 true 时 better-scroll 会阻止一些原生组件行为，所以在滚动列表中使用一些原生表单组件时，click 选项必须为false，并且此时推荐用监听 tap 事件来做点击处理。',
    previousTxt: '第 ',
    followingTxt: ' 项'
  },
  navigatorPage: {
    desc: '导航支持左右滑动;根据你所选择的菜单选项，可以渲染相对应的内容',
    txtPart1: '这里可以展示 ',
    txtPart2: ' 相应的内容'
  }
}
