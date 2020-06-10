<template>
  <div v-bind:class="{highlited: highlit, rowqueue: true}">
    <sui-accordion-title @click="clickOnAccordion()" v-bind:class="{active: isActive}">
      <sui-icon name="dropdown" />
      <h2 class="id-h2">{{ queue.id }}</h2>
      -
      <h2 class="name-h2">{{ queue.name }}</h2>
    </sui-accordion-title>
    <sui-accordion-content @click="setCenter()" class="accordion-content" v-bind:class="{active: isActive}">
      <template v-if="isActive">
        <div class="queue-summay">
          <form-display :name="'Nombre:'" :value="queue.name"></form-display>
          <form-display
            :name="'Cantidad:'"
            :value="`${queue.entriesAmount}/${queue.capacity}`"
          ></form-display>
          <form-display :name="'Posición:'" :value="displayPosition"></form-display>
          <form-display-text :text="queue.description"> </form-display-text>
          <form-display-buttons
            @clickGreenButton="letThrough"
            @clickRedButton="leaveQueue"
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
import FormDisplayText from '../../elements/FormDisplayText';
export default {
  props: ['queue'],
  components: {
    FormDisplay,
    FormDisplayButtons,
    FormDisplayText
  },
  data() {
    return {
      highlit: false,
      isActive: false
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      signedQueues: (state) => state.signedQueues
    }),
    position: function() {
      const signedQueue = this.signedQueues.find((queue) => queue.id === this.queue.id);

      return signedQueue.position;
    },
    displayPosition: function() {
      return this.position != 0 ?  this.position : 'Tu turno';
    }
  },
  methods: {
    highlight() {
      this.highlit = true;
      this.isActive = true;
      setTimeout(() => {
        this.highlit = false;
      }, 300);
    },
    clickOnAccordion() {
      if (!this.isActive) {
        this.setCenter();
      }
      this.isActive = !this.isActive;
    },
    async letThrough() {
      if (this.position == 0) {
        this.pushNotification({
          type: 'negative',
          title: 'Error al dejar pasar',
          message: 'Estas siendo atendido, no podés dejar pasar'
        });
        return;
      }
      if (this.position == this.queue.entriesAmount) {
        this.pushNotification({
          type: 'negative',
          title: 'Error al dejar pasar',
          message: 'Siendo el último, no podés dejar pasar'
        });
        return;
      }

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
    async leaveQueue() {
      try {
        this.updateLoading({loading: true});
        await this.userLeaveQueue({queue: this.queue, user: this.user});
        await this.getQueues();
        await this.getSignedQueuesOfClient(this.user.id);
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'Error al dejar la cola',
          message: err
        });
      } finally {
        this.updateLoading({loading: false});
      }
    },
    setCenter() {
      this.changeMapCenter({lat: this.queue.latitude, lng: this.queue.longitude});
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions([
      'userLeaveQueue',
      'clientLetThroughInQueue',
      'getQueues',
      'changeMapCenter',
      'getSignedQueuesOfClient',
      'pushNotification'
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

.highlited {
  border: 3px solid red;
}
</style>
