<template>
  <div class="display-form-section">
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
  font-size: 15px;
  margin: auto;
  text-align: center;
}
.first-row {
  display: flex;
}

.display-form-section {
  text-align: center;
  margin: 3px;
}
</style>
