import Vue from 'vue';
import Vuex from 'vuex';
import {ADD_OWNER, REFRESH_USERS, UPDATE_USER_TYPE, UPDATE_USER_NAME} from './mutations-types';
import usersController from '../controllers/users';
import {OWNER_USER_TYPE, CLIENT_USER_TYPE} from '../configs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userType: OWNER_USER_TYPE,
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
    [UPDATE_USER_TYPE]: (state, payload) => {
      state.userType = payload.userType;
    },
    [UPDATE_USER_NAME]: (state, payload) => {
      state.name = payload.name;
    }
  },
  actions: {
    refreshUsers: async ({commit}) => {
      const users = await usersController.getUsers();
      commit({
        type: REFRESH_USERS,
        users: users
      })
    },
    registerUser: async({commit}, user) => {
      return usersController.registerUser();
    }
  },
  modules: {}
});
