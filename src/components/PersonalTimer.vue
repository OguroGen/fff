<script setup>
  import {computed} from 'vue'
  const props=defineProps(['player'])

  let limitMin,limitSec

  const min=computed(()=>{
    return Math.floor(props.player.time/60)
  })

  const sec=computed(()=>{
    return Math.floor(props.player.time%60)
  })

</script>

<template>
<div class="wrap col p-2 text-center">
  <div class="box">
    <div class="name" v-text="player.name"></div>
    <div class="row align-items-end">
      <input type="number" class="form-control offset-1 col-4 timeInput" v-model="player.limitMin" v-if="!player.isRunning" max="60" min="0">
      <div class="offset-1 col-3 time" v-text="min" v-if="player.isRunning"></div>
      <div class="col-2">分</div>
      <input type="number" class="form-control col-4 timeInput" v-model="player.limitSec" v-if="!player.isRunning" max="60" min="0">
      <div class="col-3 time" v-text="sec" v-if="player.isRunning"></div>
      <div class="col-1">秒</div>
    </div>  
    <div class="text-end m-1" v-text="player.ck"></div>
  </div>
</div>
</template>

<style scoped>
  div{
    color:#ff4733;
    font-family: 'RocknRoll One', sans-serif;
  }
  .box{
    border: 10px solid#ffd1cc;
    border-radius: 10px;
    background-color: mistyrose;
  }
  .name{
    font-size:2rem;
    margin: 3px 0;
  }
  .time{
    text-align:right;
    font-size:3rem;
  }
  .timeInput{
    color:#ff4733;
    text-align:right;
    font-size:2rem;
    width:30%;
    border-color:#ff4733;
  }
</style>
