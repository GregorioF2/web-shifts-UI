<template>
    <div class="owner">
        <create-queue-section></create-queue-section>
        <sui-divider />
        <list-queues-section></list-queues-section>
    </div>
</template>

<script>
import CreateQueueSection from '../components/CreateQueueSection';
import ListQueuesSection from '../components/ListQueuesSection';
import BigInput from '../components/BigInput';
    export default {
        components: {
            BigInput,
            CreateQueueSection,
            ListQueuesSection
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