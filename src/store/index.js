import Vue from 'vue';
import Vuex from 'vuex';
import shortid from 'shortid';
import {
  ADD_OWNER,
  REFRESH_USERS,
  UPDATE_USER_TYPE,
  UPDATE_USER_NAME,
  UPDATE_USER,
  UPDATE_QUEUES,
  UPDATE_CREATED_QUEUES,
  ENQUEUE_CLIENT,
  UPDATE_LOADING,
  PUSH_NOTIFICATION,
  DELETE_NOTIFICATION,
  UPDATE_SIGNED_QUEUES,
  REMOVE_SIGNED_QUEUE,
  CHANGE_MAP_CENTER
} from './mutations-types';
import {OWNER_USER_TYPE, CLIENT_USER_TYPE} from '../configs';

import usersController from '../controllers/users';
import queuesController from '../controllers/queues';

import {isFalsy} from '../common/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    queues: [],
    signedQueues: [],
    createdQueues: [],
    user: {},
    users: [],
    name: '',
    loading: false,
    notifications: [],
    mapCenter: {lat: -34.559282, lng: -58.458943}
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
      if (!isFalsy(payload.queuesIds)) {
        state.createdQueues = state.queues.filter((queue) => payload.queuesIds.includes(queue.id));
      }
    },
    [UPDATE_SIGNED_QUEUES]: (state, payload) => {
      state.signedQueues = payload.queues;
    },
    [UPDATE_LOADING]: (state, payload) => {
      state.loading = payload.loading;
    },
    [PUSH_NOTIFICATION]: (state, payload) => {
      state.notifications.push(payload.notification);
    },
    [DELETE_NOTIFICATION]: (state, payload) => {
      const id = payload.id;
      const notificationsClone = state.notifications.slice();
      const index = notificationsClone.findIndex((notification) => notification.id === id);
      state.notifications = notificationsClone
        .slice(0, index)
        .concat(notificationsClone.slice(index + 1, notificationsClone.length));
    },
    [REMOVE_SIGNED_QUEUE]: (state, payload) => {
      const indexQueue = state.signedQueues.findIndex((queue) => queue.id === payload.queue.id);
      const signedClone = state.signedQueues.slice();
      state.signedQueues = signedClone
        .slice(0, indexQueue)
        .concat(signedClone.slice(indexQueue + 1, signedClone.length));
    },
    [CHANGE_MAP_CENTER]: (state, payload) => {
      state.mapCenter = payload.center;
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
    getCreatedUserQueues: async function({commit, dispatch}, user) {
      const queuesIds = (await queuesController.getCreatedUserQueues(user)).owned_queues;
      await dispatch('getQueues');
      commit({
        type: UPDATE_CREATED_QUEUES,
        queuesIds: queuesIds
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
    getQueuesAndRefreshUsers: async function({commit, dispatch}) {
      await dispatch('refreshUsers');
      await dispatch('getQueues');
    },
    getQueues: async function({commit, dispatch}) {
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
    signIntoQueue: async ({commit, dispatch}, payload) => {
      await queuesController.enqueueClient(payload.user, payload.queue);
      await dispatch('getQueues');
      await dispatch('getSignedQueuesOfClient', payload.user.id);
      commit({
        type: ENQUEUE_CLIENT,
        queue: payload.queue
      });
    },
    clientLetThroughInQueue: async ({commit}, payload) => {
      return usersController.letThrough(payload.user, payload.queue);
    },
    serveNext: async ({commit, dispatch}, payload) => {
      await queuesController.serveNext(payload.queueId);
    },
    pushNotification: async ({commit}, notification) => {
      notification.id = shortid.generate();
      commit({
        type: PUSH_NOTIFICATION,
        notification: notification
      });
      if (notification.type !== 'negative') {
        setTimeout(() => {
          commit({
            type: DELETE_NOTIFICATION,
            id: notification.id
          });
        }, 5000);
      }
    },
    deleteNotification: async ({commit}, id) => {
      commit({
        type: DELETE_NOTIFICATION,
        id: id
      });
    },
    getSignedQueuesOfClient: async ({commit}, userId) => {
      const queues = await usersController.getSignedQueues(userId);
      commit({
        type: UPDATE_SIGNED_QUEUES,
        queues: queues
      });
    },
    userLeaveQueue: async ({commit}, payload) => {
      const user = payload.user;
      const queue = payload.queue;
      await usersController.leaveQueue(user, queue);
    },
    changeMapCenter: async ({commit}, center) => {
      commit({
        type: CHANGE_MAP_CENTER,
        center: center
      })
    }
  },
  modules: {}
});
