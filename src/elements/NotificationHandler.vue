<template>
  <div class="notifications">
    <template v-for="(notification, index) in notifications">
      <div
        v-bind:key="index"
        class="notification ui message"
        :class="{
          negative: notification.type === 'negative',
          success: notification.type === 'success'
        }"
      >
        <i class="close icon cross" @click.prevent="removeNotification(notification.id)"></i>
        <div class="header">{{ notification.title }}</div>
        <p v-html="notification.message"></p>
      </div>
    </template>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
  computed: mapState({
    notifications: (state) => state.notifications
  }),
  methods: {
    removeNotification(id) {
      this.deleteNotification(id)
    },
    ...mapActions(['deleteNotification'])
  }
};
</script>

<style>
.notifications {
  position: absolute;
  top: 55px;
  left: 70px;
  z-index: 99999;
  max-width: 400px;
}
</style>
