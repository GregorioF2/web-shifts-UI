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
            :name="'Anotades:'"
            :value="`${queue.queue.length}/${queue.capacity}`"
          ></form-display>
          <form-display-button
            @clickButton='signIn'
            :name="'Anotarme'"
            :color='"green"'
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
      isActive: false
    };
  },
  computed: mapState({
    user: (state) => state.user
  }),
  methods: {
    clickOnAccordion() {
      this.isActive = !this.isActive;
    },
    async signIn() {
      this.updateLoading({loading: true});
      await this.signIntoQueue({user: this.user, queue: this.queue});
      this.updateLoading({loading: false});
    },
    async removeQueueOfUser() {
      await this.removeQueue(this.queue);
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions(['removeQueue', 'signIntoQueue'])
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
