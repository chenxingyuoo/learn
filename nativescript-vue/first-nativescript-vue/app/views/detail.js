const getMovieDetail = require('../api/api').getMovieDetail

module.exports = {
  data: function () {
    return {
      detail: {},
      summary: '',
      loading: true,
      open: false,
      allowOpen: true
    }
  },
  computed: {
    ellipsisSummary: function () {
      if (this.summary.length > 150 && !this.open) {
        return `${this.summary.substr(0, 150)}....`
      }
      if (!this.open) {
        this.allowOpen = false
      }
      return this.summary
    }
  },
  template: `
  <scroll-view>
    <stack-layout v-if="!loading">
        <flexbox-layout justifyContent="center" style="background-color: rgba(0, 0, 0, 0.8)">
          <image style="height: 250; width: 200; margin-top: 20; margin-bottom: 20" :src="detail.images.small" />
        </flexbox-layout>
        <stack-layout style="padding-left: 20; padding-right: 20">
          <flexbox-layout justifyContent="space-between" alignItems="center">
            <label style="color: #000;font-size: 24; font-weight: bold; margin-top: 10; margin-bottom: 10;" :text="detail.title" />
            <button class="Redbutton" text="购票" @tap="handleCinema" />
          </flexbox-layout>
          <label style="font-size: 16" textWrap="true" :text="ellipsisSummary" />
          <label v-if="allowOpen" style="color: #32cd32; font-size: 16; text-align: right; padding-right: 20; padding-bottom: 20" :text="open ? '收起':'展开'"
          @tap=handleOpen />
        </stack-layout>
      </stack-layout>
      <loading v-else />
  </scroll-view>
  `,
  methods: {
    handleOpen () {
      this.open = !this.open
    },
    handleCinema () {
      this.$router.push('/cinemas')
    }
  },
  created () {
    getMovieDetail(this.$route.params.id).then(res => {
      this.detail = res;
      this.summary = res.summary;
      this.loading = false
    })
  }
};
