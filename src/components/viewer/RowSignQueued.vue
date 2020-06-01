<template>
  <div>
    <sui-accordion-title @click="clickOnAccordion()" v-bind:class="{active: isActive}">
      <sui-icon name="dropdown" />
      <h2 class="id-h2">{{ queue.id }}</h2>
      -
      <h2 class="name-h2">{{ queue.name }}</h2>
    </sui-accordion-title>
    <sui-accordion-content class="accordion-content" v-bind:class="{active: isActive}">
      <template v-if="isActive">
        <div class="queue-summay">
          <form-display
            :name="'Name:'"
            :value="queue.name"
          ></form-display>
          <form-display
            :name="'Cantidad:'"
            :value="`${queue.queue.length}/${queue.capacity}`"
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
      isActive: false
    };
  },
  computed: mapState({
    user: (state) => state.user,
    position: function() {
      return this.queue.queue.map(client => client.id).indexOf(this.user.id) + 1;
    }
  }),
  methods: {
    clickOnAccordion() {
      this.isActive = !this.isActive;
    },
    async letThrough() {
      this.updateLoading({loading: true});
      await this.clientLetThroughInQueue({user: this.user, queue: this.queue});
      await this.getQueues();
      this.updateLoading({loading: false});
    },
    async removeQueueOfUser() {
      await this.removeQueue(this.queue);
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions(['removeQueue', 'clientLetThroughInQueue', 'getQueues'])
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
</style>
