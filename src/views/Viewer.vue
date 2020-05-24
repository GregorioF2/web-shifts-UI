<template>
  <div class="viewer">
    <div class="center">
      <map-view></map-view>
    </div>
  </div>
</template>

<script>
import MapView from '../components/Map';
export default {
  components: {
    MapView
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
  width: calc(1300px - 20%);
  border-left: 5px solid rgba(0, 0, 0, .5);
  border-right: 5px solid rgba(0, 0, 0, .5);
  flex-direction: column;
  display: flex;
  min-height: 100%;
}
</style>
