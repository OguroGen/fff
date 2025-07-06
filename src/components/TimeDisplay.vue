<script setup>
    defineProps(['time'])
</script>

<template>
    <div class="text-center font-monospace pb-1" v-text="time"></div>
</template>

<style scoped>
  div {
    color: #2c5f7c;
    margin-top: -30px;
    margin-bottom: -30px;
    font-size: 10rem;
    font-family: 'RocknRoll One', sans-serif;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
</style>
