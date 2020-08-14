/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import axios from 'axios';

const url = 'http://localhost:5000/api/reports';

const state = {
  labels: [],
  values: [[]],
  reports: [],
};

const getters = {
  labels: (state) => state.labels,
  values: (state) => state.values,
  reports: (state) => state.reports,
};

const actions = {
  async fetchUsage({ commit }, token) {
    const response = await axios.get(`${url}/usage`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    commit('setUsage', response.data);
  },
  async fetchReports({ commit }, token) {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    commit('setReports', response.data);
  },
};
const mutations = {
  setUsage: (state, data) => {
    // eslint-disable-next-line prefer-const
    let tempLabels = [];
    // eslint-disable-next-line prefer-const
    let tempValues = [[]];

    data.usage.forEach((element) => {
      tempLabels.push(element.date);
      tempValues[0].push(element.called);
    });

    state.labels = tempLabels;
    state.values = tempValues;
  },
  setReports: (state, data) => {
    state.reports = data.reports;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
