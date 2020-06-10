<template>
  <div class="list-queue-viewer-main">
    <div class="sub-list-section">
      <h1 class= 'sub-list-title'>Colas Disponibles</h1>
      <sui-divider />
      <sui-accordion exclusive class="accordion-container">
        <template v-for="(queue, id) in availableQueues">
          <row-available-queue 
            v-bind:key="id"
            :queue="queue"
            :ref="`queue-${queue.id}`">
          </row-available-queue>
        </template>
      </sui-accordion>
    </div>
    <div class="sub-list-section">
      <h1 class= 'sub-list-title'>Colas anotadas</h1>
      <sui-divider />
      <sui-accordion exclusive class="accordion-container">
        <template v-for="(queue, id) in queuesSigned">
          <row-sign-queued
            v-bind:key="id"
            :queue="queue"
            :ref="`queue-${queue.id}`">
          </row-sign-queued>
        </template>
      </sui-accordion>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import RowSignQueued from './RowSignQueued';
import RowAvailableQueue from './RowAvailableQueued';
import {isFalsy} from '../../common/utils';
export default {
  components: {
    RowSignQueued,
    RowAvailableQueue
  },
  props: ['queues', 'selected'],
  computed: mapState({
    user: (state) => state.user,
    signedQueues: (state)  => state.signedQueues,
    signedQueuesIds: (state) => state.signedQueues.map((queue) => queue.id),
    queuesSigned: function(state) {
      return this.queues.filter(queue => this.signedQueuesIds.includes(queue.id))
    },
    availableQueues: function(state) {
      return this.queues.filter(queue => !this.signedQueuesIds.includes(queue.id))
    },
  }),
  watch: {
    selected: function(queue) {
      if (isFalsy(queue)) {
        return;
      }
      const key = `queue-${queue.id}`;
      const acordion = this.$refs[key];
      acordion[0].highlight();
      this.selected = undefined;
    }
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
  width: 40%;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 20px;
}
.sub-list-title {
  margin: auto;
}
</style>
