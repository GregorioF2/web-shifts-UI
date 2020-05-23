<template>
  <div class="login">
    <big-input :placeholder='"Escribe tu nombre"'></big-input>
    <user-type-selection></user-type-selection>
    <general-button @buttonClick='submitUserInfo' :title="'Registrarme'"></general-button>    
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import GeneralButton from '../elements/GeneralButton';
import BigInput from '../components/BigInput';
import UserTypeSelection from '../components/UserTypeSelection';
import {UPDATE_USER} from '../store/mutations-types';
export default {
  name: 'Login',
  components: {
    BigInput,
    GeneralButton,
    UserTypeSelection
  },
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    async submitUserInfo() {
      await this.registerUser(this.user);
      this.$router.push({name: 'Owner'})
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
  flex-direction: column;
  display: flex;
}

.name-input {
  margin: auto;
  height: 200px;
  width: 700px;
}
</style>
