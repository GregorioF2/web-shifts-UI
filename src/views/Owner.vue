<template>
    <div class="owner">
        <big-input :placeholder='"Escribe tu nombre"'></big-input>
    </div>
</template>

<script>
import BigInput from '../components/BigInput';
    export default {
        components: {
            BigInput
        }
        
    }
</script>

<style scoped>
.owner {
  height: 100%;
  width: 100%;
  overflow: auto;
  flex-direction: column;
  display: flex;
}
</style>