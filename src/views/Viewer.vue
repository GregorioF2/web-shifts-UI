<template>
  <div class="viewer">
    <div class="center">
      <div class="ui active inverted dimmer" v-if="loading">
        <div class="ui text loader">Loading</div>
      </div>
      <change-view-button @buttonClick="logout" :text="'Logout'"></change-view-button>
      <change-view-button @buttonClick="goToOwner" :text="'Ir a Dueño'"></change-view-button>
      <map-view></map-view>
      <list-queues></list-queues>
    </div>
  </div>
</template>

<script>
import MapView from '../components/viewer/Map';
import ListQueues from '../components/viewer/ListQueues';
import ChangeViewButton from '../elements/changeView';
import {isFalsy} from '../common/utils';
import {mapState} from 'vuex';
export default {
  components: {
    MapView,
    ListQueues,
    ChangeViewButton
  },
  computed: mapState({
    user: (state) => state.user,
    loading: (state) => state.loading
  }),
  methods: {
    goToOwner() {
      this.$router.push({name: 'Owner'});
    },
    logout() {
      this.$router.push({name: 'Login'});
    }
  },
  mounted() {
    if (JSON.stringify(this.user) === '{}') {
      this.$router.push({name: 'Login'});
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
  border-left: 5px solid rgba(0, 0, 0, 0.5);
  border-right: 5px solid rgba(0, 0, 0, 0.5);
  flex-direction: column;
  display: flex;
  min-height: 100%;
}
</style>
