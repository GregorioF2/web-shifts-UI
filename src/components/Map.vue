<template>
  <div class="main-container">
    <GmapMap
      :center="{lat: -36.617969, lng: -56.702581}"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 100%;"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
export default {
  components: {
    VueGoogleMaps
  },
  data() {
    return {
      markers: [
        {
          position: {lat: -36.617969, lng: -56.702581}
        }
      ]
    };
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  margin: auto;
  height: 500px;
  width: 700px;
}
</style>
