/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import axios from 'axios';

// const url = 'http://localhost:5000/api/messages';
// const url = 'http://localhost/api/messages';
const url = 'https://praksans.dyndns.org:450/api/messages/';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  messages: [],
  controller: false,
};

const getters = {
  allMessages: (state) => state.messages,
  // eslint-disable-next-line no-const-assign
  controller: (state) => state.controller,
};

const actions = {
  async fetchMessages({ commit }, token) {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    commit('setMessages', response.data);
  },
  fetchController({ commit }) {
    if (state.controller === false) {
      commit('setController', true);
    } else {
      commit('setController', false);
    }
  },
};

const mutations = {
  setMessages: (state, messages) => (state.messages = messages),
  setController: (state, controller) => (state.controller = controller),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
