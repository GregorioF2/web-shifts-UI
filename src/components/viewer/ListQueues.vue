<template>
  <div class="list-queue-viewer-main">
    <div class="sub-list-section">
      <h1>Colas Disponibles</h1>
      <sui-divider />
      <sui-accordion exclusive class="accordion-container">
        <template v-for="(queue, id) in queues">
          <row-sign-queued v-bind:key="id" :queue="queue"></row-sign-queued>
        </template>
      </sui-accordion>
    </div>
    <div class="sub-list-section">
      <h1>Colas anotadas</h1>
      <sui-divider />
      <sui-accordion exclusive class="accordion-container">
        <template v-for="(queue, id) in queues">
          <row-sign-queued v-bind:key="id" :queue="queue"></row-sign-queued>
        </template>
      </sui-accordion>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import RowSignQueued from './RowSignQueued';
export default {
  components: {
    RowSignQueued
  },
  computed: mapState({
    queues: (state) => state.queues,
    user: (state) => state.user
  }),
  methods: {
    pollQueues() {
      this.pollTimeout = setTimeout(() => {
        this.getUserQueues(this.user);
        this.pollQueues();
      }, 5000);
    },
    ...mapActions(['getUserQueues'])
  },
  mounted() {
    this.getUserQueues(this.user);
  }
};
</script>

<style scoped>
.accordion-container {
  margin: auto;
  width: 100%;
}
.list-queue-viewer-main {
  display: flex;
  margin: auto;
  margin-top: 50px;
  width: 1000px;
}
.sub-list-section {
  display: flex;
  flex-direction: column;
  margin: auto;
}
</style>
