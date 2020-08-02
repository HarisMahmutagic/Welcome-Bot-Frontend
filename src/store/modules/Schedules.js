/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import axios from 'axios';

// const url = 'http://localhost:5000/api/schedules';
const url = 'http://localhost/api/schedules';
// const url = 'https://welcome-bot-slack.herokuapp.com/api/schedules';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  schedules: [],
};

const getters = {
  allSchedules: (state) => state.schedules,
};

const actions = {
  async fetchSchedules({ commit }, token) {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    commit('setSchedules', response.data);
  },
};

const mutations = {
  setSchedules: (state, schedules) => (state.schedules = schedules),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
