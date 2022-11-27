<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
  html{
    background-color: white;
    color:darkslategray;
  }
  h2{
    background-color:darkcyan;
    color:lightcyan;
    padding:5px 0 5px 30px;
    border-top: dotted 3px;
    border-bottom: dotted 3px;
    margin-bottom:30px !important;
  }
  header{
    padding:10px;
  }
  table{
        color:darkslategray;
        margin:0 30px;
  }
</style>
