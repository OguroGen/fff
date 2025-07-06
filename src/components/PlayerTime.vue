<script setup>
  import { computed } from 'vue'
  
  const props=defineProps(['player'])

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
  <div class="wrap col p-2 text-center">
    <div class="box">
      <div class="name" v-text="player.name"></div>
      <div class="time" v-text="player.time" :class="{lastPlayer:player.isLastPlayer}"></div>
      <div class="rank" v-text="rankText" :class="{lastPlayer:player.isLastPlayer}"></div>
      <div class="keycode" v-text="player.keyCode"></div>
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
