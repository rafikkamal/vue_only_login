import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    loggingIn: false,
    loginError: null,
    loginSuccessful: false,

    loggedIn: false,
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
      state.loginSuccessful = !errorMessage;
    },
    loggedIn: state => state.loggedIn = true,
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      axios.post('https://reqres.in/api/login', {
        ...loginData
      })
      .then(() => {
        commit('loginStop', null)
        commit('loggedIn')
      })
      .catch(error => {
        commit('loginStop', error.response.data.error)
      })
    }
  }
})