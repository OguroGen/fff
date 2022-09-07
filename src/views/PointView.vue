<script setup>
  import {ref} from 'vue'
  import {PlayersStore} from '@/stores/players'
  import { useRouter } from 'vue-router'

  const playersStore=PlayersStore()
  const router=useRouter()

  const inputShow=ref(false)

  //前のページへ
  const prev=()=>{
      router.push('/time')
  }

  //次のページへ
  const next=()=>{
      router.push('/ranking')
  }
</script>

<template>
  <header class="row">
      <button class="btn btn-outline-info col-1" @click="prev">《　時間計測</button>
      <button class="btn btn-outline-info col-1 offset-10" @click="next">順位発表　》</button>
  </header>
  <h2>点数入力</h2>
  <div class="m-5" v-if="!inputShow">
    <p>得点入力のページを表示します。</p>
    <p>プロジェクターの画面を閉じてください。</p>
    <p>（Windowsキー ＋ P でも切り替えができます）</p>
    <button class="btn btn-success" @click="inputShow='true'">準備OK</button>
  </div>
  <div v-if="inputShow">
    <table>
      <thead class="border-bottom">
        <tr>
          <th class="px-3">対応キー</th>
          <th class="px-3">選手名</th>
          <th class="px-3">得点</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="player in playersStore.players">
          <th v-text="player.ck"></th>
          <td class="text-start px-3" v-text="player.name"></td>
          <td><input type="number" max="9999" class="text-center" v-model="player.point">点</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  input{
    width:100px;
  }

</style>
