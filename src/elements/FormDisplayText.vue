<template>
  <div class="display-form-section">
    <h2 class="text-title">{{ title }}:</h2>
    <span class="text-value">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: ['title', 'text']
};
</script>

<style scoped>
.text-title {
  color: brown;
  left: 0;
  margin: auto;
  margin-left: 0px;
}

.text-value {
  font-weight: bold;
  font-size: 20px;
}

.display-form-section {
  margin: 3px;
}
</style>
