/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import axios from 'axios';

const url = 'http://localhost:5000/api/triggers/';
// const url = 'http://localhost/api/triggers/';
// const url = 'https://welcome-bot-slack.herokuapp.com/api/triggers';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  triggers: [],
};

const getters = {
  allTriggers: (state) => state.triggers,
};

const actions = {
  async fetchTriggers({ commit }, token) {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    commit('setTriggers', response.data);
  },
};

const mutations = {
  setTriggers: (state, triggers) => (state.triggers = triggers),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
