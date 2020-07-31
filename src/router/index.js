import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import MessagesView from '../views/MessagesView.vue';
import SchedulesView from '../views/SchedulesView.vue';
import TriggerView from '../views/TriggerView.vue';
import ErrorView from '../views/ErrorView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/MessagesView',
    name: 'MessagesView',
    component: MessagesView,
  },
  {
    path: '/SchedulesView',
    name: 'SchedulesView',
    component: SchedulesView,
  },
  {
    path: '/TriggerView',
    name: 'TriggerView',
    component: TriggerView,
  },
  {
    path: '/ErrorView',
    name: 'ErrorView',
    component: ErrorView,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
