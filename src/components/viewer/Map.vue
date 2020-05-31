<template>
  <div class="map-main">
    <GmapMap
      ref="mapRef"
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
import Vue from 'vue';

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
      ],
      distanceConstant: 0.0001
    };
  },
  async mounted() {
    const map = await this.$refs.mapRef.$mapPromise;
    const markers = this.markers;
    google.maps.event.addListener(map, 'click', (event) => {
      const sw = {
        lat: event.latLng.lat() - this.distanceConstant,
        lng: event.latLng.lng() - this.distanceConstant
      };
      const ne = {
        lat: event.latLng.lat() + this.distanceConstant,
        lng: event.latLng.lng() + this.distanceConstant
      };
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
