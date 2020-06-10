<template>
  <div class="display-form-section">
    <sui-button
      class="display-form-button"
      color="green"
      @click.prevent="clickGreenButton()"
      v-bind:content="nameGreenButton"
      basic
    />
    <sui-button
      color="red"
      class="display-form-button"
      @click.prevent="clickRedButton()"
      v-bind:content="nameRedButton"
      basic
    />
  </div>
</template>

<script>
export default {
  props: ['nameGreenButton', 'nameRedButton'],
  methods: {
    clickGreenButton() {
      this.$emit('clickGreenButton');
    },
    clickRedButton() {
      this.$emit('clickRedButton');
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
}
.display-form-button {
  width: 40%;
}
</style>
