/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import axios from 'axios';

const url = 'http://localhost:5000/api/messages';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  messages: [],
};

const getters = {
  allMessages: (state) => state.messages,
};

const actions = {
  async fetchMessages({ commit }) {
    const response = await axios.get(url);

    commit('setMessages', response.data);
  },
};

const mutations = {
  setMessages: (state, messages) => (state.messages = messages),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
