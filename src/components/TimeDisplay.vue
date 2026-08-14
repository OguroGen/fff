<script setup>
    defineProps({
        time: { default: 0 },
        size: { type: String, default: '10rem' },
        compact: { type: Boolean, default: false }
    })
</script>

<template>
    <div
        class="clock text-center font-monospace pb-1"
        :class="{ compact }"
        :style="{ fontSize: size }"
        v-text="time"
    ></div>
</template>

<style scoped>
  .clock {
    color: #2c5f7c;
    margin-top: -30px;
    margin-bottom: -30px;
    font-family: 'RocknRoll One', sans-serif;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }
  .clock.compact {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.15;
    text-shadow: none;
  }
</style>
