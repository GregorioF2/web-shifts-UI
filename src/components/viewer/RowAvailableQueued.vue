<template>
  <div
    v-bind:class="{
      highlited: highlit,
      system_one: queue.source_id === 1,
      system_two: queue.source_id === 2,
      system_three: queue.source_id === 3
    }"
  >
    <sui-accordion-title @click="clickOnAccordion()" v-bind:class="{active: isActive}">
      <sui-icon name="dropdown" />
      <h2 class="id-h2">{{ queue.id }}</h2>
      -
      <h2 class="name-h2">{{ queue.name }}</h2>
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

.system_one {
  border: 2px solid green;
}
.system_two {
  border: 2px solid rgba(45, 50, 157, 0.5);
  border-top-right-radius: 15px;
  margin-top: 30px;
}
.system_three {
  border: 2px solid orange;
}
</style>
