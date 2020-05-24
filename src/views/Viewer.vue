<template>
  <div class="viewer">
    <div class="center">
      <button @click="goToOwner()">GO ONWER</button>
      <map-view></map-view>
      <list-queues></list-queues>
    </div>
  </div>
</template>

<script>
import MapView from '../components/viewer/Map';
import ListQueues from '../components/viewer/ListQueues';
export default {
  components: {
    MapView,
    ListQueues
  },
  methods: {
    goToOwner() {
      this.$router.push({name: 'Owner'});
    }
  }
};
</script>

<style scoped>
.viewer {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #f5f5f5;
}

.center {
  margin: auto;
  margin-top: 0px;
  margin-bottom: 0px;
  width: calc(1400px - 20%);
  border-left: 5px solid rgba(0, 0, 0, .5);
  border-right: 5px solid rgba(0, 0, 0, .5);
  flex-direction: column;
  display: flex;
  min-height: 100%;
}
</style>
