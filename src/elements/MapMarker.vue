
<template>
</template>
<script>
let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
export default {
  props: ['map', 'marker'],
  mounted() {
    new mapboxgl.Marker()
    .setLngLat([this.marker.position.lng, this.marker.position.lat])
    .addTo(this.map);
  }
};
</script>

<style lang="scss" scoped></style>
