<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <nav>
    <RouterLink to="/">Home</RouterLink>｜
    <RouterLink to="/players">選手情報</RouterLink>｜
    <RouterLink to="/time">時間計測</RouterLink>｜
    <RouterLink to="/point">得点入力</RouterLink>｜
    <RouterLink to="/ranking">順位発表</RouterLink>｜｜
    <RouterLink to="/setting">設定</RouterLink>
  </nav> -->

  <RouterView />
</template>

<style>
html{
  background-color:white;
}
  h2{
    background-color:darkcyan;
    color:lightcyan;
    padding:5px 0 5px 30px;
    border-top: dotted 3px;
    border-bottom: dotted 3px;
  }
  header{
    padding:10px;
  }
  table{
        color:darkslategray;
        margin:30px
  }
</style>
