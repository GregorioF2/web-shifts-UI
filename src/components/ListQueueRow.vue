<template>
  <div>
    <sui-accordion-title @click="clickOnAccordion()" v-bind:class="{active: isActive}">
      <sui-icon name="dropdown" />
      <h2 class="id-h2">{{ queue.id }}</h2>
      -
      <h2 class="name-h2">{{ queue.name }}</h2>
    </sui-accordion-title>
    <sui-accordion-content v-bind:class="{active: isActive}">
      <p>
       DESCRIPTION  DE LA FILA Y ESAS COSAS
      </p>
    </sui-accordion-content>
  </div>
</template>

<script>
export default {
  props: ['queue'],
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    clickOnAccordion() {
      this.isActive = !this.isActive;
    }
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
</style>
