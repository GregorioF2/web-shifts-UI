<template>
  <div class="main-container">
    <sui-accordion exclusive class="accordion-container">
      <sui-accordion-title @click="clickOnAccordion" v-bind:class="{active: isActive}">
        <sui-icon v-if="!isActive" name="plus green" size="large" />
        <sui-icon v-else name="minus red" size="large" />
        <h2>Crear cola de espera</h2>
      </sui-accordion-title>
      <sui-accordion-content class="content-acordion" v-bind:class="{active: isActive}">
        <create-queue-form></create-queue-form>
      </sui-accordion-content>
    </sui-accordion>
  </div>
</template>

<script>
import CreateQueueForm from './CreateQueueForm';
export default {
  components: {
    CreateQueueForm
  },
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    clickOnAccordion() {
      this.isActive = !this.isActive;
      console.log('esto es un click en el accordion');
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 700px;
}
h2 {
  display: inline;
}
.accordion-container {
  margin: auto;
  width: 100%;
}
</style>
