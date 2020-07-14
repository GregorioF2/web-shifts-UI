<template>
  <div class="available_queue_main">
    <sui-accordion-title
      @click="clickOnAccordion()"
      v-bind:class="{active: isActive, queue_title: true}"
    >
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
    <sui-accordion-content
      @click="setCenter()"
      class="accordion-content"
      v-bind:class="{active: isActive}"
    >
      <template v-if="isActive">
        <div class="queue-summay">
          <form-display :name="'Nombre:'" :value="queue.name"></form-display>
          <form-display
            v-if='queue.sourceId !== 3'
            :name="'Anotades:'"
            :value="`${queue.entriesAmount}/${queue.capacity}`"
          ></form-display>
          <form-display-text :text="queue.description"> </form-display-text>

          <form-display-button
            @clickButton="signIn"
            :name="'Anotarme'"
            :color="'green'"
          ></form-display-button>
        </div>
      </template>
    </sui-accordion-content>
  </div>
</template>

<script>
import FormDisplay from '../../elements/FormDisplayKV';
import FormDisplayButton from '../../elements/FormDisplayButton';
import {UPDATE_LOADING} from '../../store/mutations-types';
import {mapActions, mapState, mapMutations} from 'vuex';
import FormDisplayText from '../../elements/FormDisplayText';
export default {
  props: ['queue'],
  components: {
    FormDisplay,
    FormDisplayButton,
    FormDisplayText
  },
  data() {
    return {
      isActive: false,
      highlit: false
    };
  },
  computed: mapState({
    user: (state) => state.user
  }),
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
    async signIn() {
      try {
        this.updateLoading({loading: true});
        await this.signIntoQueue({user: this.user, queue: this.queue});
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'Error anotandose a cola',
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
      'removeQueue',
      'signIntoQueue',
      'getQueues',
      'pushNotification',
      'changeMapCenter'
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

.mask-bottom.system_one {
  border-bottom: 2px solid rgba(45, 157, 50, 0.5);
  border-left: 2px solid rgba(45, 157, 50, 0.5);
}
.mask-bottom.system_two {
  border-bottom: 2px solid rgba(45, 50, 157, 0.5);
  border-left: 2px solid rgba(45, 50, 157, 0.5);
}
.mask-bottom.system_three {
  border-bottom: 2px solid rgba(157, 50, 45, 0.5);
  border-left: 2px solid rgba(157, 50, 45, 0.5);
}
.mask-bottom {
  height: 50%;
  width: 50%;
  position: absolute;
  top: 50%;
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
.available_queue_main {
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
