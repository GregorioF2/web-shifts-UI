<template>
  <div class="map-main" id="map-container"></div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import {mapState} from 'vuex';
let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

export default {
  components: {
    VueGoogleMaps
  },
  props: ['markers'],
  data() {
    return {
      map: null,
      createdMarkers: []
    };
  },
  computed: mapState({
    center: (state) => state.mapCenter
  }),
  watch: {
    center: function(newVal) {
      this.map.setCenter(newVal);
    },
    markers: function(newVal) {
      this.createdMarkers.forEach((marker) => marker.remove());
      this.createdMarkers = newVal.map((marker) => {
        const iconSize = [60, 60];
        const sourceId = marker.queue.sourceId;
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(/store_${sourceId}_small.png)`;
        el.style.width = '60px';
        el.style.height = '60px';
        return new mapboxgl.Marker(el)
          .setLngLat([marker.position.lng, marker.position.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h2 class="marker-pop-up">${marker.queue.id} - ${marker.queue.name}</h1>`))
          .addTo(this.map);
      });
    }
  },
  methods: {
    clickMarker(marker) {
      this.$emit('clickMarker', marker);
    }
  },
  async mounted() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ3JlZ29yaW9mIiwiYSI6ImNqcndlaDl1ZzBieXc0YW8za2V1a3J6Z3cifQ.aU-G3eL1QTwDakRsDc63dQ';
    const map = new mapboxgl.Map({
      center: [this.center.lng, this.center.lat],
      zoom: 12,
      container: 'map-container',
      style: 'mapbox://styles/mapbox/bright-v9'
    });
    this.map = map;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    });
    this.map.addControl(geocoder);
    this.map.addControl(new mapboxgl.NavigationControl());

    map.on('click', (e) => {
      this.$emit('clickOnMap', e.lngLat.lng, e.lngLat.lat);
    });
  }
};
</script>

<style>
.map-main {
  display: flex;
  margin: auto;
  height: 400px;
  width: 100%;
}
.marker-pop-up {
  font-family: 'Jazz LET', 'fantasy';
  padding: 0px;
  margin: 0px;
}
</style>
