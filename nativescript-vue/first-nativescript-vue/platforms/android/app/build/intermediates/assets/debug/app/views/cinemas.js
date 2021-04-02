const getCinemas = require('../api/api').getCinemas
const CinemaList = require('../components/cinema-list')

module.exports = {
  data: function () {
    return {
      cinemas: []
    }
  },
  components:{
    CinemaList
  },
  template: `
    <scroll-view>
      <cinema-list :cinemas="cinemas"/>
    </scroll-view>
  `,
  created () {
    getCinemas().then(res => {
      this.cinemas = res.result.list
    })
  }
};