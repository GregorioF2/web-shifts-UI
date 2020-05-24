<template>
<div>
  <sui-form>
    <sui-form-fields>
      <sui-form-field width="fourteen">
        <label>Nombre cola </label>
        <input type="text" v-model='newQueue.name' placeholder="Nombre" />
      </sui-form-field>
      <sui-form-field width="six">
        <label> Maxima cantidad </label>
        <input type="number" v-model='newQueue.limit' placeholder="Maxima cantidad" />
      </sui-form-field>
    </sui-form-fields>
    <sui-form-fields>
      <sui-form-field width="ten">
        <label>Longitud </label>
        <input type="number" v-model='newQueue.longitud' placeholder="Longitud" />
      </sui-form-field>
      <sui-form-field width="ten">
        <label>Latitud </label>
        <input type="number" v-model='newQueue.latitud' placeholder="Latitud" />
      </sui-form-field>
    </sui-form-fields>
  </sui-form>
  <sui-button class="submit-button" @click.prevent='submitQueue()' basic primary>Crear</sui-button>
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
export default {
  data() {
    return {
      newQueue: {
        name: null,
        limit: null,
        longitud: null,
        latitud: null
      }
    }
  },
  computed: mapState({
    queues: (state) => state.queues,
    user: (state) => state.user
  }),
  methods: {
    submitQueue() {
      this.createQueue({user: this.user, queue: {...this.newQueue}});
    },
    ...mapActions(['createQueue'])
  }
};
</script>

<style scoped>
.submit-button{
  width: 100%;
}
</style>
