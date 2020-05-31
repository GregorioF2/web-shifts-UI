<template>
  <button class="button-change-view" @click="buttonClick()">{{ text }}</button>
</template>

<script>
export default {
  props: ['text'],
  methods: {
      buttonClick() {
          this.$emit('buttonClick');
      }
  }
};
</script>

<style scoped>
.button-change-view {
  border: 1px solid black;
  border-radius: 0%;
  height: 40px;
  background-color: #8888d0;
  font-size: 30px;
}
</style>
