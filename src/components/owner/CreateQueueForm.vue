<template>
  <div>
    <sui-form>
      <sui-form-fields>
        <sui-form-field width="fourteen">
          <label>Nombre cola </label>
          <input type="text" v-model="newQueue.name" placeholder="Nombre" />
        </sui-form-field>
        <sui-form-field width="six">
          <label> Maxima cantidad </label>
          <input type="number" v-model="newQueue.capacity" placeholder="Maxima cantidad" />
        </sui-form-field>
      </sui-form-fields>
      <sui-form-field>
        <label>Descripción</label>
        <textarea v-model="newQueue.description" class='description-input'></textarea>
      </sui-form-field>
      <sui-form-fields>
        <sui-form-field width="ten">
          <label>Longitud </label>
          <input type="number" v-model="newQueue.longitude" placeholder="Longitud" />
        </sui-form-field>
        <sui-form-field width="ten">
          <label>Latitud </label>
          <input type="number" v-model="newQueue.latitude" placeholder="Latitud" />
        </sui-form-field>
      </sui-form-fields>
    </sui-form>
    <sui-button class="submit-button" @click.prevent="submitQueue()" basic primary
      >Crear</sui-button
    >

    <p class="expand-map" @click="toggleMap()">{{ `Ver mapa [${showMap ? '-' : '+'}]` }}</p>
    <div class="map-container" v-if="showMap">
      <map-view :markers="markers" :center="mapCenter" @clickOnMap="setLongLat"></map-view>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import {UPDATE_LOADING} from '../../store/mutations-types';
import MapView from '../../elements/Map';
export default {
  components: {
    MapView
  },
  data() {
    return {
      newQueue: {
        name: null,
        capacity: null,
        longitude: null,
        latitude: null,
        description: null
      },
      showMap: false
    };
  },
  computed: mapState({
    queues: (state) => state.createdQueues,
    user: (state) => state.user,
    mapCenter: (state) => state.mapCenter,
    markers: function() {
      if (this.newQueue.longitude && this.newQueue.latitude) {
        return [{position: {lng: this.newQueue.longitude, lat: this.newQueue.latitude}}];
      }
      return [];
    }
  }),
  methods: {
    resetForm() {
      this.newQueue = {
        name: null,
        capacity: null,
        longitude: null,
        latitude: null
      };
    },
    setLongLat(lng, lat) {
      this.newQueue.longitude = lng;
      this.newQueue.latitude = lat;
    },
    toggleMap() {
      this.showMap = !this.showMap;
    },
    async submitQueue() {
      try {
        this.updateLoading({loading: true});
        await this.createQueue({user: this.user, queue: {...this.newQueue}});
        this.resetForm();
        this.pushNotification({
          type: 'success',
          title: 'Cola creada'
        });
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'Error creando cola',
          message: err
        });
      } finally {
        this.updateLoading({loading: false});
      }
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions(['createQueue', 'pushNotification'])
  }
};
</script>

<style scoped>
.submit-button {
  width: 100%;
  margin-top: 10px;
}
.expand-map {
  margin-top: 10px;
  opacity: 0.9;
  color: grey;
}
.map-container {
  border: 3px solid black;
}
.description-input {
  height: 120px;
}
</style>
