const state = {
  token: '',
};

const getters = {
  // eslint-disable-next-line no-shadow
  tokenTest: (state) => state.token,
};

const actions = {
  getToken(context, payload) {
    context.commit('getToken', payload);
  },
};
const mutations = {
  // eslint-disable-next-line no-shadow
  getToken(state, token) {
    // eslint-disable-next-line no-param-reassign
    state.token = token;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
