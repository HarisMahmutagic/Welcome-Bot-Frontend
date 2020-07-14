import Vue from 'vue';
import Vuex from 'vuex';
import Messages from './modules/Messages';
import Schedules from './modules/Schedules';
import Triggers from './modules/Triggers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Messages,
    Schedules,
    Triggers,
  },
});
