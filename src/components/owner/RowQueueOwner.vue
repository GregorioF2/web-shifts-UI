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
        <sui-image class="qr-image" src="https://via.placeholder.com/300" size="small" />
        <div class="queue-summay">
          <form-display
            class="info-queue-display"
            :name="'Name:'"
            :value="queue.name"
          ></form-display>
          <form-display
            class="info-queue-display"
            :name="'Cantidad:'"
            :value="`${queue.queue.length}/${queue.capacity}`"
          ></form-display>
          <form-display-buttons
            @clickGreenButton='goNexUser'
            @clickRedButton='removeQueueOfUser'
            :name-green-button="'Siguiente cliente'"
            :name-red-button="'Eliminar'"
            class="info-queue-display"
          ></form-display-buttons>
        </div>
      </template>
    </sui-accordion-content>
  </div>
</template>

<script>
import FormDisplay from '../../elements/FormDisplayKV';
import FormDisplayButtons from '../../elements/FormDisplayButtons';
import {mapActions} from 'vuex';
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
  methods: {
    clickOnAccordion() {
      this.isActive = !this.isActive;
    },
    goNexUser() {
      console.log('Go next user');
    },
    async removeQueueOfUser() {
      await this.removeQueue(this.queue);
    },
    ...mapActions(['removeQueue'])
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

.info-queue-display {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
