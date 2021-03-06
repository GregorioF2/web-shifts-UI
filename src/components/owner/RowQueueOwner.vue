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
        <qr-generator :value="JSON.stringify({concepto_id: queue.id, sistema_id: queue.sourceId, tipo:'pedir'})" :size="150"></qr-generator>
        <div class="queue-summay">
          <form-display
            class="info-queue-display"
            :name="'Nombre:'"
            :value="queue.name"
          ></form-display>
          <form-display
            class="info-queue-display"
            :name="'Cantidad:'"
            :value="`${queue.entriesAmount}/${queue.capacity}`"
          ></form-display>
          <form-display
            class="info-queue-display"
            :name="'Cliente actual:'"
            :value="`${currentClient}`"
          ></form-display>
          <form-display-text :text="queue.description"> </form-display-text>
          <form-display-buttons
            @clickGreenButton="goNexUser"
            @clickRedButton="removeQueueOfUser"
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
import QrGenerator from '../../elements/QrGenerator';
import {mapActions, mapState, mapMutations} from 'vuex';
import {UPDATE_LOADING} from '../../store/mutations-types';
import FormDisplayText from '../../elements/FormDisplayText';
import {isFalsy}  from '../../common/utils';
export default {
  props: ['queue'],
  components: {
    FormDisplay,
    FormDisplayButtons,
    QrGenerator,
    FormDisplayText
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: mapState({
    currentClient: function(state) {
      const userIdx = state.users.findIndex((user) => user.id === this.queue.actualClientId);
      return userIdx < 0 ? 'Ninguno' : state.users[userIdx].name;
    },
    user: (state) => state.user
  }),
  methods: {
    clickOnAccordion() {
      this.isActive = !this.isActive;
    },
    async goNexUser() {
      if (this.queue.entriesAmount === 0 && isFalsy(this.queue.actualClientId)) {
        this.pushNotification({
          type: 'negative',
          title: 'No se pudo pasar al siguiente',
          message: 'No hay clientes en la cola'
        });
        return;
      }
      try {
        this.updateLoading({loading: true});
        await this.serveNext({
          queueId: this.queue.id
        });
        await this.getCreatedUserQueues(this.user);
        await this.refreshUsers();
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'No se pudo pasar al siguiente',
          message: err
        });
      } finally {
        this.updateLoading({loading: false});
      }
    },
    async removeQueueOfUser() {
        console.log('remove queue of user');

      try {
        this.updateLoading({loading: true});
        await this.removeQueue(this.queue);
        await this.getCreatedUserQueues(this.user);
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'No se pudo eliminar cola',
          message: err
        });
      } finally {
        this.updateLoading({loading: false});
      }
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions([
      'removeQueue',
      'serveNext',
      'pushNotification',
      'getCreatedUserQueues',
      'refreshUsers'
    ])
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
