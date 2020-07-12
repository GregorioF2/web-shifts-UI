<template>
  <div class="list-section">
    <div class="list-item">
      <div class="circle green"></div>
      <p class="label-color">Colas de Rails</p>
    </div>
    <div class="list-item">
      <div class="circle blue"></div>
      <p class="label-color">Colas de Vue</p>
    </div>
    <div class="list-item">
      <div class="circle orange"></div>
      <p class="label-color">Colas de PHP</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.list-section {
  margin: auto;
}
.list-item {
  margin-top: 10px;
  min-width: 30px;
  text-align: center;
  display: flex;
}

.green {
  background-color: rgba(45, 157, 50, 0.5);
}
.blue {
  background-color: rgba(45, 50, 157, 0.5);
}
.orange {
  background-color: rgba(157, 50, 45, 0.5);
}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid black;
}
.label-color {
  font-family: 'Jazz LET', 'fantasy';
  font-weight: bold;
  padding-left: 10px;
}
</style>
