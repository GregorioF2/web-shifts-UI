<template>
  <div class="sign_queue_main">
    <sui-accordion-title @click="clickOnAccordion()" v-bind:class="{active: isActive, queue_title: true}">
      <sui-icon name="dropdown" class="margin-vertical" />
      <h2 class="id-h2">{{ queue.id }}</h2>
      <span class="margin-vertical">-</span>
      <h2 class="name-h2">{{ queue.name }}</h2>
      <div
        v-bind:class="{
          'queue-type': true,
          system_one: queue.sourceId === 1,
          system_two: queue.sourceId === 2,
          system_three: queue.sourceId === 3
        }"
      ></div>
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
          <form-display-button
            v-if="queue.sourceId === 1 && this.position === 1 "
            @clickButton="confirmTurn"
            :name="'Confirmar'"
            :color="'black'"
          ></form-display-button>
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
import FormDisplayButton from '../../elements/FormDisplayButton';
export default {
  props: ['queue'],
  components: {
    FormDisplay,
    FormDisplayButtons,
    FormDisplayButton,
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
        await this.getSignedQueuesOfClient(this.user.id);
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
    async confirmTurn() {
      try {
        this.updateLoading({loading: true});
        await this.userConfirmTurn({queue: this.queue, user: this.user});
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
      'pushNotification',
      'userConfirmTurn'
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

.system_one {
  background-color: rgba(45, 157, 50, 0.5);
}
.system_two {
  background-color: rgba(45, 50, 157, 0.5);
}
.system_three {
  background-color: rgba(157, 50, 45, 0.5);
}
.mask-top {
  height: 50%;
  width: 50%;
  position: absolute;
  top: 0%;
  left: 50%;
}
.sign_queue_main {
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
}
.queue-type {
  right: 0%;
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid black;
}
.queue_title {
  display: flex;
}
.id-h2 {
  margin: 0px;
}
.name-h2 {
  margin: 0px;
}

.margin-vertical {
  margin-top: auto !important;
  margin-bottom: auto !important;
}
</style>
