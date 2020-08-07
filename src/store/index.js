import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import Messages from './modules/Messages';
import Schedules from './modules/Schedules';
import Triggers from './modules/Triggers';
import Channels from './modules/Channels';
import Reports from './modules/Reports';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    Messages,
    Schedules,
    Triggers,
    Channels,
    Reports,
  },
});
