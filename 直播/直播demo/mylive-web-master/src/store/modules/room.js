/*
 * @description:
 * @author: 小羽
 * @github: https://github.com/sulgweb
 * @lastEditors: 小羽
 * @Date: 2020-09-03 00:52:35
 * @LastEditTime: 2022-09-03 01:13:42
 * @Copyright: 1.0.0
 */
import api from '@/api/index.js'
const state = {
  roomList: []
}
const actions = {
  async setRoomList({ commit }, data) {
    await api.livingRoomApi.addRoom({
      title: 'LOL联赛',
      user_id: '3yQtH4qqeQPrPBUEQm0BgN87ulRAuw9K',
      type: '英雄联盟'
    })
    let res = await api.livingRoomApi.getRoomList(data)
    commit('updateRoomList', res)
  }
}
const mutations = {
  updateRoomList(state, data) {
    state.roomList = data
  }
}
const getters = {}

export default {
  namespace: 'livingRoom',
  state,
  actions,
  mutations,
  getters
}
