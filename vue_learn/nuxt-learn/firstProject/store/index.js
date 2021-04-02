
import Vuex from 'vuex'

const mutations = {
  increment(state) {
    state.counter++
  }
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0
    },
    mutations
  })
}

export default createStore
