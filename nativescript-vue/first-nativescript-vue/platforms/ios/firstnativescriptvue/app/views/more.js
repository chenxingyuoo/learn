const MoreList = require('../components/more-list')

module.exports = {
  data: function() {
    return { allMovies: [] }
  },
  components : {
    MoreList
  },
  template: `
    <scroll-view v-if="allMovies.length">
      <more-list :movies="allMovies" />
    </scroll-view>
    <loading v-else />
  `,
  created () {
    this.allMovies = this.$route.params.allMovies
  }
};
