export default {

  navigator: {
    doc: 'Docs',
    demo: 'Demo',
    started: 'Get Started'
  },

  features: {
    userExperience: {
      title: 'Optimize Experience',
      desc: 'To make scroll more smoothly, We support flexible configurations about inertial scrolling, rebound, fade scrollbar, etc. which could optimize user experience obviously.'
    },
    application: {
      title: 'Rich Features',
      desc: 'It can be applied to normal scroll list, picker, slide, index list, start guidance, etc. What\'s more, some complicated needs like pull down refresh and pull up load can be implemented much easier.'
    },
    dependence: {
      title: 'Dependence Free',
      desc: 'As a plain JavaScript library, BetterScroll doesn\'t depend on any framework, you could use it alone, or with any other MVVM frameworks.'
    }
  },

  examples: {
    normalScrollList: 'Normal Scroll List',
    indexList: 'Index List',
    picker: 'Picker',
    slide: 'Slide',
    startGuidance: 'Start Guidance',
    fullPageVerticalSlide: 'Vertical Slide',
    freeScroll: 'Free Scroll',
    formList: 'Form List',
    goodsList: 'Goods List',
    navList: 'Navigation List',
    infinity: 'Infinity Scroll',
    verticalScrollImg: 'vertical-scroll-en.jpeg',
    indexListImg: 'index-list.jpeg',
    pickerImg: 'picker-en.jpeg',
    slideImg: 'slide.jpeg',
    startGuidanceImg: 'full-page-slide.jpeg',
    freeScrollImg: 'free-scroll.jpeg',
    formListImg: 'form-list-en.jpeg',
    goodsListImg: 'goods-list.jpeg',
    navListImg: 'navigator-en.jpg',
    infinityScrollImg: 'infinity-scroll.png'
  },

  normalScrollListPage: {
    desc: 'Nomal scroll list based on BetterScroll',
    scrollbar: 'Scrollbar',
    pullDownRefresh: 'Pull Down Refresh',
    pullUpLoad: 'Pull Up Load',
    previousTxt: 'I am the No.',
    followingTxt: ' line',
    newDataTxt: 'I am new data: '
  },

  scrollComponent: {
    defaultLoadTxtMore: 'Load more',
    defaultLoadTxtNoMore: 'There is no more data',
    defaultRefreshTxt: 'Refresh success'
  },

  indexListPage: {
    title: 'Current City: Beijing'
  },

  pickerPage: {
    desc: 'Picker is a typical choose component at mobile end. And it could dynamic change the data of every column to realize linkage picker.',
    picker: ' picker',
    pickerDemo: ' picker demo ...',
    oneColumn: 'One column',
    twoColumn: 'Two column',
    threeColumn: 'Three column',
    linkage: 'Linkage',
    confirmTxt: 'confirm | ok',
    cancelTxt: 'cancel | close'
  },

  slidePage: {
    desc: 'Slide is a typical component at mobile end, support horizontal move.',
    click: 'click',
    isAutoPlayTip: 'auto play',
    isLoopTip: 'loop',
    isShowDotTip: 'show dots',
    changeData: 'change data',
    pageTurn: 'page turn'
  },

  fullPageSlideComponent: {
    buttonTxt: 'Start Use'
  },

  freeScrollPage: {
    desc: 'Free scroll supports horizontal and vertical move at the same time.'
  },

  formListPage: {
    desc: 'To use form in better-scroll, you need to make sure the option click is configured as false, since some native element events will be prevented when click is true. And in this situation, we recommend to handle click by listening tap event.',
    previousTxt: 'No.',
    followingTxt: ' option'
  },
  navigatorPage: {
    desc: 'Navigator supports horizontal move. According to the menu tab which your choice，contents what you want to render can be shown in \n' +
    'the blank area',
    txtPart1: 'The corresponding contents of the ',
    txtPart2: ' can be shown in this area'
  }
}
