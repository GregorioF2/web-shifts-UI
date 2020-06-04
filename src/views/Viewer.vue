<template>
  <div class="viewer">
    <div class="center">
      <div class="ui active inverted dimmer" v-if="loading">
        <div class="ui text loader">Loading</div>
      </div>
      <change-view-button @buttonClick="logout" :text="'Logout'"></change-view-button>
      <change-view-button @buttonClick="goToOwner" :text="'Ir a Dueño'"></change-view-button>
      <div class="map-container">
        <map-view :markers="markers" @clickMarker="selectQueue"></map-view>
      </div>
      <list-queues :queues="queues" :selected="selected"></list-queues>
    </div>
  </div>
</template>

<script>
import MapView from '../elements/Map';
import ListQueues from '../components/viewer/ListQueues';
import ChangeViewButton from '../elements/changeView';
import {isFalsy} from '../common/utils';
import {mapState, mapActions} from 'vuex';
export default {
  components: {
    MapView,
    ListQueues,
    ChangeViewButton
  },
  data() {
    return {
      selected: null
    };
  },
  computed: mapState({
    user: (state) => state.user,
    loading: (state) => state.loading,
    queues: (state) => state.queues,
    markers: (state) =>
      state.queues.map((queue) => {
        return {position: {lng: parseFloat(queue.longitude), lat: parseFloat(queue.latitude)}};
      })
  }),
  methods: {
    goToOwner() {
      this.$router.push({name: 'Owner'});
    },
    logout() {
      this.$router.push({name: 'Login'});
    },
    selectQueue(marker) {
      const queue = this.queues.find(
        (queue) =>
          queue.longitude.toString() === marker.position.lng.toString() &&
          queue.latitude.toString() === marker.position.lat.toString()
      );
      this.selected = queue;
    },
    pollQueues() {
      this.pollTimeout = setTimeout(async() => {
        await this.getQueues(this.user);
        await this.getSignedQueuesOfClient(this.user.id);
        this.pollQueues();
      }, 10000);
    },
    ...mapActions(['getQueues', 'getSignedQueuesOfClient'])
  },
  mounted() {
    if (JSON.stringify(this.user) === '{}') {
      this.$router.push({name: 'Login'});
    }
    this.getQueues(this.user);
    this.pollQueues();
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
  border-left: 5px solid rgba(0, 0, 0, 0.5);
  border-right: 5px solid rgba(0, 0, 0, 0.5);
  flex-direction: column;
  display: flex;
  min-height: 100%;
}

.map-container {
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 30px;
  border: 3px solid black;
}
</style>
