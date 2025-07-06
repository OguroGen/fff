<script setup>
  import {ref} from 'vue'
  import {usePlayersStore} from '@/stores/playersStore'
  import {useSettingStore} from '@/stores/settingStore'
  import { useRouter } from 'vue-router'

  const playersStore=usePlayersStore()
  const settingStore=useSettingStore()
  const router=useRouter()

  const inputShow=ref(false)

  // 正誤を設定
  const setCorrect = (player, isCorrect) => {
    player.isCorrect = isCorrect
  }

  //前のページへ
  const prev=()=>{
      router.push('/time')
  }

  //次のページへ
  const next=()=>{
    if (settingStore.inputMode === 'correctWrong') {
      router.push('/correct-wrong-ranking')
    } else {
      router.push('/ranking')
    }
  }
</script>

<template>
  <header class="row">
      <button class="btn btn-outline-info col-2" @click="prev">《　時間計測</button>
      <button class="btn btn-outline-info col-2 offset-8" @click="next">
        {{ settingStore.inputMode === 'correctWrong' ? '○×発表' : '順位発表' }}　》
      </button>
  </header>
  <h2>点数入力</h2>
  
  <!-- 入力方式選択 -->
  <div class="mb-4 ms-5">
    <h4>入力方式選択</h4>
    <div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="pointMode" value="point" v-model="settingStore.inputMode">
        <label class="form-check-label" for="pointMode">点数入力方式</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="correctWrongMode" value="correctWrong" v-model="settingStore.inputMode">
        <label class="form-check-label" for="correctWrongMode">○×方式</label>
      </div>
    </div>
  </div>

  <div class="m-5" v-if="!inputShow">
    <p>得点入力のページを表示します。</p>
    <p>プロジェクターの画面を閉じてください。</p>
    <p>（Windowsキー ＋ P でも切り替えができます）</p>
    <button class="btn btn-success" @click="inputShow='true'">準備OK</button>
  </div>
  
  <!-- 点数入力方式 -->
  <div v-if="inputShow && settingStore.inputMode === 'point'">
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
          <th v-text="player.keyCode"></th>
          <td class="text-start px-3" v-text="player.name"></td>
          <td><input type="number" max="9999" class="text-center" v-model="player.point">点</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <!-- ○×方式 -->
  <div v-if="inputShow && settingStore.inputMode === 'correctWrong'">
    <table>
      <thead class="border-bottom">
        <tr>
          <th class="px-3">対応キー</th>
          <th class="px-3">選手名</th>
          <th class="px-3">正誤</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="player in playersStore.players">
          <th v-text="player.keyCode"></th>
          <td class="text-start px-3" v-text="player.name"></td>
          <td>
            <button 
              class="btn me-2" 
              :class="player.isCorrect === true ? 'btn-success' : 'btn-outline-success'"
              @click="setCorrect(player, true)">
              ○
            </button>
            <button 
              class="btn" 
              :class="player.isCorrect === false ? 'btn-danger' : 'btn-outline-danger'"
              @click="setCorrect(player, false)">
              ×
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  input[type="number"]{
    width:100px;
  }
  
  .form-check-inline {
    display: inline-block;
    margin-right: 1rem;
  }
  
  .form-check-input {
    width: 18px !important;
    height: 18px !important;
  }
</style>
