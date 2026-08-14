<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    player: { type: Object, required: true },
    compact: { type: Boolean, default: false }
  })

  const hasRank = computed(() => {
    const tr = props.player.timeRank
    return tr >= 1 && tr <= 10
  })

  const rankText=computed(() =>{
    let tr=props.player.timeRank
    if(tr>=1 && tr<=10){
      return tr+"番手"
    }else{
      return tr
    }
  })
</script>

<template>
  <div class="wrap text-center" :class="compact ? 'compact' : 'col p-2'">
    <div class="box">
      <div class="name" v-text="player.name"></div>
      <div class="time" v-text="player.time" :class="{lastPlayer:player.isLastPlayer}"></div>
      <div class="rank" v-if="!compact || hasRank" v-text="rankText" :class="{lastPlayer:player.isLastPlayer}"></div>
      <div class="keycode" v-if="!compact" v-text="player.keyCode"></div>
    </div>
  </div>
</template>

<style scoped>
  div {
    color: #4a90a4;
    font-family: 'RocknRoll One', sans-serif;
  }
  .box {
    border: 10px solid #87ceeb;
    border-radius: 15px;
    background-color: #f0f8ff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .name {
    font-size: 1.8rem;
    margin: 5px 0;
    color: #2c5f7c;
    font-weight: bold;
  }
  .time {
    font-size: 2.5rem;
    margin: 8px 0;
    font-weight: bold;
  }
  .rank {
    font-size: 1.3rem;
    margin: 3px 0;
    color: #6ba3b8;
  }
  .keycode {
    text-align: right;
    margin: 5px;
    font-size: 0.9rem;
    color: #87ceeb;
  }
  .compact {
    padding: 2px 4px !important;
    width: 100%;
  }
  .compact .box {
    border-width: 4px;
    border-radius: 8px;
    box-shadow: none;
    width: 100%;
    box-sizing: border-box;
  }
  .compact .name {
    font-size: 1rem;
    margin: 1px 0;
  }
  .compact .time {
    font-size: 1.3rem;
    margin: 1px 0;
  }
  .compact .rank {
    font-size: 0.85rem;
    margin: 0;
  }
  .compact .keycode {
    margin: 0 4px 2px;
    font-size: 0.7rem;
  }
  .lastPlayer {
    background-color: #ffe4e1 !important;
    color: #d2691e !important;
    animation: pulse 1s infinite;
  }
  .box .lastPlayer {
    border-color: #ffa07a;
  }
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
</style>
