<template>
  <div class="login">
    <div class="center">
      <big-input :placeholder="'Escribe tu nombre'"></big-input>
      <user-type-selection></user-type-selection>
      <general-button @buttonClick="submitUserInfo" :title="'Registrarme'"></general-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import GeneralButton from '../elements/GeneralButton';
import BigInput from '../components/login/BigInput';
import UserTypeSelection from '../components/login/UserTypeSelection';
import {UPDATE_USER} from '../store/mutations-types';
import {OWNER_USER_TYPE, CLIENT_USER_TYPE} from '../configs';
export default {
  name: 'Login',
  components: {
    BigInput,
    GeneralButton,
    UserTypeSelection
  },
  computed: mapState({
    user: (state) => state.user
  }),
  methods: {
    async submitUserInfo() {
      await this.registerUser(this.user);
      const redirect = this.user.type === OWNER_USER_TYPE ? 'Owner' : 'Viewer';
      this.$router.push({name: redirect});
    },
    ...mapActions(['registerUser'])
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
  border-left: 5px solid rgba(0, 0, 0, .5);
  border-right: 5px solid rgba(0, 0, 0, .5);
  flex-direction: column;
  display: flex;
}
</style>
