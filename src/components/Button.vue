<template>
    <b-button class="button-div" variant="outline-primary">{{title}}</b-button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Button",
    }
  },
};
</script>

<style scoped>
.main-container {
  
}
.button-div {
  margin: auto;
  height: 300px;
  width: 700px;
}
</style>
