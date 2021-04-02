const http = require("http")
const baseUrl = 'https://api.douban.com'
const localServer = 'http://10.242.79.182:3000/cinema'

module.exports = {
  getComingList () {
    return http.getJSON(`${baseUrl}/v2/movie/coming_soon`)
  },
  getHotList () {
    return http.getJSON(`${baseUrl}/v2/movie/in_theaters`)
  },
  getMovieDetail (id) {
    return http.getJSON(`${baseUrl}/v2/movie/subject/${id}`)
  },
  getCinemas () {
    return http.getJSON(`${localServer}`)
  }
}
