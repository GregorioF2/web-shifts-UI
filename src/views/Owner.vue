<template>
  <div class="owner">
    <div class="center">
      <button @click="goToClient()">GO VIEWER</button>
      <create-queue-section></create-queue-section>
      <sui-divider />
      <list-queues-section></list-queues-section>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import CreateQueueSection from '../components/owner/CreateQueueSection';
import ListQueuesSection from '../components/owner/ListQueuesSection';
export default {
  components: {
    CreateQueueSection,
    ListQueuesSection
  },
  methods: {
    goToClient(){
      this.$router.push({name: 'Viewer'});
    }
  }
};
</script>

<style scoped>
.owner {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #f5f5f5;
}

.center {
  margin: auto;
  margin-top: 0px;
  margin-bottom: 0px;
  width: calc(1300px - 20%);
  border-left: 5px solid rgba(0, 0, 0, .5);
  border-right: 5px solid rgba(0, 0, 0, .5);
  flex-direction: column;
  display: flex;
  min-height: 100%;
}
</style>
