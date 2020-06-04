<template>
  <div class="owner">
    <div class="center">
      <notifications></notifications>
      <div class="ui active inverted dimmer" v-if="loading">
        <div class="ui text loader">Loading</div>
      </div>
      <change-view-button @buttonClick="logout" :text="'Logout'"></change-view-button>
      <change-view-button @buttonClick="goToClient" :text="'Ir a Cliente'"></change-view-button>
      <create-queue-section></create-queue-section>
      <sui-divider />
      <list-queues-section></list-queues-section>
    </div>
  </div>
</template>

<script>
import CreateQueueSection from '../components/owner/CreateQueueSection';
import ListQueuesSection from '../components/owner/ListQueuesSection';
import ChangeViewButton from '../elements/changeView';
import {mapState, mapActions} from 'vuex';
import Notifications from '../elements/NotificationHandler';
export default {
  components: {
    CreateQueueSection,
    ListQueuesSection,
    ChangeViewButton,
    Notifications
  },
  data() {
    return {};
  },
  computed: mapState({
    user: (state) => state.user,
    loading: (state) => state.loading
  }),
  methods: {
    goToClient() {
     this.$router.push({name: 'Viewer'});
    },
    logout() {
      this.$router.push({name: 'Login'});
    },
    ...mapActions(['pushNotification'])
  },
  mounted() {
    if (JSON.stringify(this.user) === '{}') {
      this.$router.push({name: 'Login'});
    }
  }
};
</script>

<style scoped>
.owner {
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
  border-left: 5px solid rgba(0, 0, 0, 0.5);
  border-right: 5px solid rgba(0, 0, 0, 0.5);
  flex-direction: column;
  display: flex;
  min-height: 100%;
}
</style>
