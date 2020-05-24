<template>
  <div class="user-type-select-main">
    <div class="ui toggle checkbox checkbox-layout">
      <input type="checkbox" v-model="owner" @change="toogleType('propietario')">
      <label>Propietario</label>
    </div>

    <div class="ui toggle checkbox checkbox-layout">
      <input type="checkbox" v-model="client" @change="toogleType('cliente')">
      <label>Cliente</label>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {UPDATE_USER} from '../../store/mutations-types';
import {OWNER_USER_TYPE, CLIENT_USER_TYPE} from '../../configs';
export default {
  data() {
    return {
      owner: true,
      client: false
    };
  },
  methods: {
    toogleType(type) {
      this.client = type === CLIENT_USER_TYPE;
      this.owner = type === OWNER_USER_TYPE;
      this.$store.commit({
        type: UPDATE_USER,
        user: {type: type}
      });
    }
  },
  mounted() {
    console.log('this.$store: ', this.$store);
  }
};
</script>

<style scoped>
.user-type-select-main {
  display: flex;
  margin: auto;
  height: 50px;
  width: 700px;
}

.checkbox-layout {
  margin: auto;
}
</style>
