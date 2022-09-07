<script setup>
    defineProps(['time'])
</script>

<template>
    <div class="text-center font-monospace pb-1" v-text="time"></div>
</template>

<style scoped>
  div {
    color:darkslategray;
    margin-top:-50px;
    font-size : 10rem;
  }
</style>
