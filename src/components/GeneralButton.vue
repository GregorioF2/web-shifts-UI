<template>
  <button class="ui primary basic button button-div" @click.prevent='clickButton()'>{{ title }}</button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Button'
    }
  },
  methods: {
    clickButton() {
      this.$emit('buttonClick');
    }
  }
};
</script>

<style scoped>
.button-div {
  margin: auto;
  height: 200px;
  width: 700px;
}
</style>
