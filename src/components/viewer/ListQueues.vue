<template>
  <div class="list-queue-viewer-main">
    <div class="sub-list-section">
      <h1 class="sub-list-title">Colas Disponibles</h1>
      <sui-divider />
      <sui-accordion exclusive class="accordion-container">
        <template v-for="(queue, id) in availableQueues">
          <row-available-queue v-bind:key="id" :queue="queue" :ref="`queue-${queue.id}`">
          </row-available-queue>
          <sui-divider v-bind:key="id + '-divide'" />
        </template>
      </sui-accordion>
    </div>
    <div class="sub-list-section">
      <h1 class="sub-list-title">Colas anotadas</h1>
      <sui-divider />
      <sui-accordion exclusive class="accordion-container">
        <template v-for="(queue, id) in signedQueues">
          <row-sign-queued v-bind:key="id" :queue="queue" :ref="`queue-${queue.id}`">
          </row-sign-queued>
          <sui-divider v-bind:key="id + '-divide'" />
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
    signedQueues: function(state) {
      return state.signedQueues.map((queue) =>
        this.queues.find((q) => q.id === queue.id && q.sourceId == queue.sourceId)
      );
    },
    availableQueues: function(state) {
      return this.queues.filter((queue) => {
        const filteredQueues = this.signedQueues.filter(
          (queue2) => queue2.sourceId === queue.sourceId && queue.id === queue2.id
        );
        return filteredQueues.length === 0;
      });
    }
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
