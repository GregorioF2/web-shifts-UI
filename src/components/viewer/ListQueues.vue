<template>
  <div class="list-queue-viewer-main">
    <div class="sub-list-section">
      <h1>Colas Disponibles</h1>
      <sui-divider />
      <sui-accordion exclusive class="accordion-container">
        <template v-for="(queue, id) in availableQueues">
          <row-available-queue v-bind:key="id" :queue="queue"></row-available-queue>
        </template>
      </sui-accordion>
    </div>
    <div class="sub-list-section">
      <h1>Colas anotadas</h1>
      <sui-divider />
      <sui-accordion exclusive class="accordion-container">
        <template v-for="(queue, id) in signedQueues">
          <row-sign-queued v-bind:key="id" :queue="queue"></row-sign-queued>
        </template>
      </sui-accordion>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import RowSignQueued from './RowSignQueued';
import RowAvailableQueue from './RowAvailableQueued';
export default {
  components: {
    RowSignQueued,
    RowAvailableQueue
  },
  computed: mapState({
    user: (state) => state.user,
    signedQueues: (state) =>
      state.queues.filter(queue => state.user.shopQueues.includes(queue.id)),
    availableQueues: (state) =>
      state.queues.filter(queue => !state.user.shopQueues.includes(queue.id)),
  }),
  methods: {
    pollQueues() {
      this.pollTimeout = setTimeout(() => {
        this.getQueues(this.user);
        this.pollQueues();
      }, 5000);
    },
    ...mapActions(['getQueues'])
  },
  mounted() {
    this.getQueues(this.user);
    this.pollQueues();
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
  margin-top: 20px;
}
</style>
