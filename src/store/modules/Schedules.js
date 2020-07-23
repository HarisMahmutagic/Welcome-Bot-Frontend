/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import axios from 'axios';

// const url = 'http://localhost:5000/api/schedules';
const url = 'https://welcome-bot-slack.herokuapp.com/api/schedules';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  schedules: [],
};

const getters = {
  allSchedules: (state) => state.schedules,
};

const actions = {
  async fetchSchedules({ commit }) {
    const response = await axios.get(url);

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
