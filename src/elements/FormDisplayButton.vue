<template>
  <div class="display-form-section">
    <sui-button
      class="form-button"
      v-bind:color="color"
      @click.prevent='clickButton()'
      v-bind:content="name"
      basic
    />
  </div>
</template>

<script>
export default {
  props: ['name', 'color'],
  methods: {
      clickButton() {
          this.$emit('clickButton');
      }
  }
};
</script>

<style scoped>
.display-form-section {
  margin-top: 4px;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.form-button {
  width: 100%
}
</style>
