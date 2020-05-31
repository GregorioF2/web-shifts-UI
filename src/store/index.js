import Vue from 'vue';
import Vuex from 'vuex';
import {
  ADD_OWNER,
  REFRESH_USERS,
  UPDATE_USER_TYPE,
  UPDATE_USER_NAME,
  UPDATE_USER,
  UPDATE_QUEUES,
  UPDATE_CREATED_QUEUES,
  ENQUEUE_CLIENT
} from './mutations-types';
import {OWNER_USER_TYPE, CLIENT_USER_TYPE} from '../configs';

import usersController from '../controllers/users';
import queuesController from '../controllers/queues';

import {isFalsy} from '../common/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    queues: [],
    createdQueues: [],
    user: {},
    users: [],
    name: ''
  },
  getters: {
    propietarios: (state) => state.users.filter((user) => user.type === OWNER_USER_TYPE)
  },
  mutations: {
    [ADD_OWNER]: (state, payload) => {
      state.users.push(payload.user);
    },
    [REFRESH_USERS]: (state, payload) => {
      state.users = payload.users;
    },
    [UPDATE_USER]: (state, payload) => {
      if (!isFalsy(payload.user.name)) {
        Vue.set(state.user, 'name', payload.user.name);
      }
      if (!isFalsy(payload.user.id)) {
        Vue.set(state.user, 'id', payload.user.id);
      }
      if (!isFalsy(payload.user.type)) {
        Vue.set(state.user, 'type', payload.user.type);
      }
      if (!isFalsy(payload.user.shopQueues)) {
        Vue.set(state.user, 'shopQueues', payload.user.shopQueues);
      }
    },
    [ENQUEUE_CLIENT]: (state, payload) => {
      state.user.shopQueues.push(payload.queue.id);
    },
    [UPDATE_QUEUES]: (state, payload) => {
      state.queues = payload.queues;
    },
    [UPDATE_CREATED_QUEUES]: (state, payload) => {
      if (!isFalsy(payload.queue)) {
        state.createdQueues.push(payload.queue);
      }
      if (!isFalsy(payload.queues)) {
        state.createdQueues = payload.queues;
      }
    }
  },
  actions: {
    refreshUsers: async ({commit}) => {
      const users = await usersController.getUsers();
      commit({
        type: REFRESH_USERS,
        users: users
      });
    },
    registerUser: async ({commit}, user) => {
      console.log('register user');
      const userRes = await usersController.registerUser(user);
      console.log('UserRes: ', userRes);
      commit({
        type: UPDATE_USER,
        user: userRes
      });
    },
    getCreatedUserQueues: async ({commit}, user) => {
      const queues = await queuesController.getCreatedUserQueues(user);
      commit({
        type: UPDATE_CREATED_QUEUES,
        queues: queues
      });
    },
    createQueue: async function(store, payload) {
      const queue = await queuesController.createQueue(payload.user, payload.queue);
      store.commit({
        type: UPDATE_CREATED_QUEUES,
        queue: queue
      });
    },
    getImage: async function() {
      await queuesController.getImage();
    },
    getQueues: async function({commit}) {
      const queues = await queuesController.getQueues();
      commit({
        type: UPDATE_QUEUES,
        queues: queues
      });
    },
    removeQueue: async ({commit}, queue) => {
      const queues = await queuesController.removeQueue(queue);
      commit({
        type: UPDATE_QUEUES,
        queues: queues
      });
    },
    signIntoQueue: async ({commit}, payload) => {
      await queuesController.enqueueClient(payload.user, payload.queue);
      commit({
        type: ENQUEUE_CLIENT,
        queue: payload.queue
      })
    }
  },
  modules: {}
});
