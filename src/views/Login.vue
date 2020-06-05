<template>
  <div class="login">
    <div class="center">
      <notifications></notifications>
      <div class="ui active inverted dimmer" v-if="loading">
        <div class="ui text loader">Loading</div>
      </div>
      <big-input :placeholder="'Escribe tu nombre'"></big-input>
      <user-type-selection></user-type-selection>
      <general-button @buttonClick="submitUserInfo" :title="'Registrarme'"></general-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import GeneralButton from '../elements/GeneralButton';
import BigInput from '../components/login/BigInput';
import UserTypeSelection from '../components/login/UserTypeSelection';
import Notifications from '../elements/NotificationHandler';
import {UPDATE_USER, UPDATE_LOADING} from '../store/mutations-types';
import {OWNER_USER_TYPE, CLIENT_USER_TYPE} from '../configs';
export default {
  name: 'Login',
  components: {
    BigInput,
    GeneralButton,
    UserTypeSelection,
    Notifications
  },
  computed: mapState({
    user: (state) => state.user,
    loading: (state) => state.loading
  }),
  methods: {
    async submitUserInfo() {
      try {
        this.updateLoading({loading: true});
        await this.registerUser(this.user);
        const redirect = this.user.type === CLIENT_USER_TYPE ? 'Viewer' : 'Owner';
        this.$router.push({name: redirect});
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'Error registrando usuario',
          message: err
        });
      } finally {
        this.updateLoading({loading: false});
      }
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions(['registerUser', 'pushNotification'])
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #f5f5f5;
}
.name-input {
  margin: auto;
  height: 200px;
  width: 700px;
}
.center {
  margin: auto;
  margin-top: 0px;
  margin-bottom: 0px;
  width: calc(1300px - 20%);
  height: 100%;
  border-left: 5px solid rgba(0, 0, 0, 0.5);
  border-right: 5px solid rgba(0, 0, 0, 0.5);
  flex-direction: column;
  display: flex;
}
</style>
