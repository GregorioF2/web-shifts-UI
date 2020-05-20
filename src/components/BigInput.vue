<template>
  <div class="main-container">
    <input class="name-input" type="name" v-model="name" required :placeholder='placeholder' />
  </div>
</template>

<script>
import {UPDATE_USER_NAME} from '../store/mutations-types';
export default {
  props: {
    title: {
      type: String,
      default: 'Nombre'
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    }
  },
  data() {
    return {
      name: ''
    };
  },
  watch: {
    name: function(newVal) {
      this.$store.commit({
        type: UPDATE_USER_NAME,
        name: this.name
      });
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  margin: auto;
  height: 150px;
  width: 700px;
}
.name-input {
  height: 50%;
  width: 80%;
  margin: auto;
}
.name-title-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.name-title {
  text-align: center !important;
  margin: auto;
  font-weight: bold;
}
::placeholder {
  color: rgb(33, 33, 36);
  font-size: 30px;
  opacity: 0.5;
}

input[type='name'] {
  float: left;
  text-align: center;
  font-size: 30px;
}
</style>
