<template>
  <div class="list-queue-main">
    <h1> Colas creadas </h1>
    <sui-divider />
    <sui-accordion exclusive class="accordion-container">
      <template v-for="(queue, id) in queues">
        <row-queue-owner v-bind:key="id" :queue="queue"></row-queue-owner>
      </template>
    </sui-accordion>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import RowQueueOwner from './RowQueueOwner';
export default {
  components: {
    RowQueueOwner
  },
  computed: mapState({
    queues: (state) => state.createdQueues,
    user: (state) => state.user
  }),
  methods: {
    pollQueues() {
      this.pollTimeout = setTimeout(() => {
        this.getCreatedUserQueues(this.user);
        this.pollQueues();
      }, 5000);
    },
    ...mapActions(['getCreatedUserQueues'])
  },
  mounted() {
    this.getCreatedUserQueues(this.user);
    this.pollQueues();
  }
};
</script>

<style scoped>
.list-queue-main {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 50px;
  width: 700px;
}

.accordion-container {
  margin: auto;
  width: 100%;
}
</style>
