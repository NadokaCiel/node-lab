import Vue from 'vue'
export default {
  state: {
    bus: new Vue(),
    appName: 'node-lab',
  },
  getters: {
    bus: state => state.bus,
    appName: state => state.appName,
  },
  mutations: {
    SET_APP_NAME(state, name) {
      state.appName = name;
    },
  },
  actions: {
    setAppName({
      commit
    }, name) {
      commit('SET_APP_NAME', name)
    }
  }
}
