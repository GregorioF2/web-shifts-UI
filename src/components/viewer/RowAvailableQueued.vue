<template>
  <div v-bind:class="{highlited: highlit}">
    <sui-accordion-title @click="clickOnAccordion()" v-bind:class="{active: isActive}">
      <sui-icon name="dropdown" />
      <h2 class="id-h2">{{ queue.id }}</h2>
      -
      <h2 class="name-h2">{{ queue.name }}</h2>
    </sui-accordion-title>
    <sui-accordion-content @click="setCenter()" class="accordion-content" v-bind:class="{active: isActive}">
      <template v-if="isActive">
        <div class="queue-summay">
          <form-display :name="'Name:'" :value="queue.name"></form-display>
          <form-display
            :name="'Anotades:'"
            :value="`${queue.entriesAmount}/${queue.capacity}`"
          ></form-display>
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
export default {
  props: ['queue'],
  components: {
    FormDisplay,
    FormDisplayButton
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
      this.changeMapCenter({lat: this.queue.latitude, lng: this.queue.longitude})
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions(['removeQueue', 'signIntoQueue', 'getQueues', 'pushNotification', 'changeMapCenter'])
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
