<template>
  <div class="home">
    <qr-button :title="'button 1'"></qr-button>
    <qr-button :title="'button 2'"></qr-button>
  </div>
</template>

<script>
import QrButton from "../components/Button";
export default {
  name: "Home",
  components: {
    QrButton,
  },
};
</script>

<style scoped>
.home {
  display: flex;
  height: 100vh;
  width: 100vw;
}
</style>
