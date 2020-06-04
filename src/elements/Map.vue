<template>
  <div class="map-main">
    <GmapMap
      ref="mapRef"
      :center="{lat: -34.559282, lng: -58.458943}"
      :zoom="14"
      map-type-id="terrain"
      style="width: 100%; height: 100%;"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="clickMarker(m)"
      />
    </GmapMap>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

export default {
  components: {
    VueGoogleMaps
  },
  props: ['markers'],
  data() {
    return {};
  },
  methods: {
    clickMarker(marker) {
      this.$emit('clickMarker', marker);
    }
  },
  async mounted() {
    const map = await this.$refs.mapRef.$mapPromise;
    google.maps.event.addListener(map, 'click', (event) => {
      const lng = event.latLng.lng();
      const lat = event.latLng.lat();
      this.$emit('clickOnMap', lng, lat);
    });
  }
};
</script>

<style scoped>
.map-main {
  display: flex;
  margin: auto;
  height: 400px;
  width: 100%;
}
</style>
