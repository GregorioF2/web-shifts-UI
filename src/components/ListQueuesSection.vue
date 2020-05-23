<template>
  <div class="main-container">
    <sui-accordion exclusive class="accordion-container">
      <template v-for="(queue, id) in queues">
        <list-queue-row v-bind:key="id" :queue="queue"></list-queue-row>
      </template>
    </sui-accordion>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ListQueueRow from './ListQueueRow';
export default {
  components: {
    ListQueueRow
  },
  computed: mapState({
    queues: (state) => state.queues,
    user: (state) => state.user
  }),
  methods: {
    ...mapActions(['getUserQueues'])
  },
  mounted() {
    this.getUserQueues(this.user);
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  margin: auto;
  margin-top: 50px;
  width: 700px;
}

.accordion-container {
  margin: auto;
  width: 100%;
}
</style>
