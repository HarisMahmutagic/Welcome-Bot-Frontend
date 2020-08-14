/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import axios from 'axios';

const url = 'http://localhost:5000/api/channels/';
// const url = 'http://localhost/api/channels/';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  channels: [],
};

const getters = {
  allChannels: (state) => state.channels,
};

const actions = {
  async fetchChannels({ commit }, token) {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    commit('setChannels', response.data);
  },
};

const mutations = {
  setChannels: (state, channels) => (state.channels = channels),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
