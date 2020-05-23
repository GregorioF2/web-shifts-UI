import Vue from 'vue';
import Vuex from 'vuex';
import {
  ADD_OWNER,
  REFRESH_USERS,
  UPDATE_USER_TYPE,
  UPDATE_USER_NAME,
  UPDATE_USER,
  UPDATE_QUEUES
} from './mutations-types';
import {OWNER_USER_TYPE, CLIENT_USER_TYPE} from '../configs';

import usersController from '../controllers/users';
import queuesController from '../controllers/queues';

import {isFalsy} from '../common/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    queues: [],
    user: {
      name: 'default',
      type: 'propietario'
    },
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
    },
    [UPDATE_QUEUES]: (state, payload) => {
      state.queues = payload.queues;
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
      const userRes = await usersController.registerUser(user);
      commit({
        type: UPDATE_USER,
        user: userRes
      });
    },
    getUserQueues: async ({commit}, user) => {
      const queues = await queuesController.getUserQueues(user);
      commit({
        type: UPDATE_QUEUES,
        queues: queues
      });
    },
    createQueue: async function(store, payload) {
      const queues = await queuesController.createQueue(payload.user, payload.queue);
      store.commit({
        type: UPDATE_QUEUES,
        queues: queues
      });
    },
    getImage: async function() {
      await queuesController.getImage();
    },
    removeQueue: async ({commit}, queue) => {
      const queues = await queuesController.removeQueue(queue);
      commit({
        type: UPDATE_QUEUES,
        queues: queues
      });
    }
  },
  modules: {}
});
