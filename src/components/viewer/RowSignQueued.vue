<template>
  <div v-bind:class="{highlited: highlit, rowqueue: true}">
    <sui-accordion-title @click="clickOnAccordion()" v-bind:class="{active: isActive}">
      <sui-icon name="dropdown" />
      <h2 class="id-h2">{{ queue.id }}</h2>
      -
      <h2 class="name-h2">{{ queue.name }}</h2>
    </sui-accordion-title>
    <sui-accordion-content class="accordion-content" v-bind:class="{active: isActive}">
      <template v-if="isActive">
        <div class="queue-summay">
          <form-display :name="'Name:'" :value="queue.name"></form-display>
          <form-display
            :name="'Cantidad:'"
            :value="`${queue.entriesAmount}/${queue.capacity}`"
          ></form-display>
          <form-display :name="'posicion:'" :value="position"></form-display>
          <form-display-buttons
            @clickGreenButton="letThrough"
            @clickRedButton="removeQueueOfUser"
            :name-green-button="'Dejar pasar'"
            :name-red-button="'Salirme'"
          ></form-display-buttons>
        </div>
      </template>
    </sui-accordion-content>
  </div>
</template>

<script>
import FormDisplay from '../../elements/FormDisplayKV';
import FormDisplayButtons from '../../elements/FormDisplayButtons';
import {mapActions, mapState, mapMutations} from 'vuex';
import {UPDATE_LOADING} from '../../store/mutations-types';
export default {
  props: ['queue'],
  components: {
    FormDisplay,
    FormDisplayButtons
  },
  data() {
    return {
      highlit: false,
      isActive: false
    };
  },
  computed: mapState({
    user: (state) => state.user,
    position: function(state) {
      const signedQueue = state.signedQueues.find((queue) => this.queue.id);
      return signedQueue.position;
    }
  }),
  methods: {
    highlight() {
      console.log('highlit queue: ', this.queue.id);
      this.highlit = true;
      this.isActive = true;
      setTimeout(() => {
        this.highlit = false;
      }, 300);
    },
    clickOnAccordion() {
      this.isActive = !this.isActive;
    },
    async letThrough() {
      try {
        this.updateLoading({loading: true});
        await this.clientLetThroughInQueue({user: this.user, queue: this.queue});
        await this.getQueues();
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'Error al dejar pasar',
          message: err
        });
      } finally {
        this.updateLoading({loading: false});
      }
    },
    async removeQueueOfUser() {
      await this.removeQueue(this.queue);
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions(['removeQueue', 'clientLetThroughInQueue', 'getQueues', 'pushNotification'])
  }
};
</script>

<style scoped>
.id-h2 {
  color: rgb(94, 13, 13);
  font-family: 'Jazz LET', 'fantasy';
}
.name-h2 {
  font-family: 'Jazz LET', 'fantasy';
}

h2 {
  display: inline;
}

.accordion-content {
  display: flex !important;
  padding: 20px !important;
}

.queue-summay {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.qr-image {
  display: inline;
}

.highlited {
  border: 3px solid red;
}
</style>
