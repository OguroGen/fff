<script setup>
    import {ref} from 'vue'
    let ranking=ref(1)

    const rankup=()=>{
        ranking.value++
        console.log(ranking.value)
    }

    let timer=setInterval
</script>

<template>
    <button @click="rankup()">ランクアップ</button>
    <div v-text="ranking"></div>
</template>