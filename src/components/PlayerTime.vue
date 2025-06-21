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
  <div class="col card p-3 text-center" :class="{lastPlayer:player.isLastPlayer}">
    <h3 class="card-title" v-text="player.name"></h3>
    <div class="card-text display-3" v-text="player.time" :class="{lastPlayer:player.isLastPlayer}"></div>
    <div class="card-text display-5" v-text="rankText" :class="{lastPlayer:player.isLastPlayer}"></div>
    <div class="card-text text-end text-secondary" style="margin-bottom:-20px" v-text="player.keyCode"></div>
  </div>
</template>

<style scoped>
  div{
    color:darkslategray;
  }
  .lastPlayer{
    background-color:mistyrose;
    color:red;
  }
</style>
