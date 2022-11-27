<script setup>
  const props=defineProps(['player'])

</script>

<template>
<div class="wrap col p-2 text-center">
  <div class="box">
    <div class="name" v-text="player.name"></div>
    <div class="time" v-text="player.time"></div>
    <div class="text-end m-1" v-text="player.ck"></div>
  </div>
</div>
</template>

<style scoped>
  div{
    color:#006666;
    font-family: 'RocknRoll One', sans-serif;
  }
  .box{
    border: 10px solid#99ffff;
    border-radius: 10px;
    background-color:azure;
  }
  .name{
    font-size:2rem;
    margin: 3px 0;
  }
  .time{
    font-size:3rem;
    margin: 5px 0;
  }
</style>
