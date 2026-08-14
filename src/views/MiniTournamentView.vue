<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { usePlayersStore } from '@/stores/playersStore'
import { useMiniTournamentStore } from '@/stores/miniTournamentStore'
import { usePlayerCardRows } from '@/composables/usePlayerCardRows'
import { useSyncedBuzzerTimer } from '@/composables/useSyncedBuzzerTimer'
import { formatNumber } from '@/utils/problemGenerator'
import TimeDisplay from '@/components/TimeDisplay.vue'
import PlayerTime from '@/components/PlayerTime.vue'

const playersStore = usePlayersStore()
const miniStore = useMiniTournamentStore()
const router = useRouter()

const { time, isActive, problemsVisible, startTimer, stopTimer, resetTimer, limitMode, limitMin, limitSec } =
  useSyncedBuzzerTimer({
    onAllFinished() {
      if (miniStore.phase === 'play') {
        miniStore.phase = 'answerConfirm'
      }
    }
  })

const cardsRoot = ref(null)
const pageRoot = ref(null)
const { topRow, bottomRow, isTwoRows, cardSlots } = usePlayerCardRows(
  () => playersStore.players,
  cardsRoot,
  160
)

const nameFlag = ref([])
const infoFlag = ref([])
let revealRank = 99
const rankSound1 = new Audio('./sounds/levelup.mp3')
const rankSound2 = new Audio('./sounds/newstitle1.mp3')

const players = computed(() => playersStore.players)

const finalRanking = computed(() => {
  return [...players.value]
    .map((player) => ({
      ...player,
      total: miniStore.totals[player.keyCode] || 0
    }))
    .sort((a, b) => b.total - a.total)
})

watch(
  () => players.value.length,
  (n) => {
    if (miniStore.phase === 'setup') {
      miniStore.syncRankPoints(n)
    }
  }
)

watch(
  () => miniStore.phase,
  () => {
    nextTick(() => {
      window.scrollTo(0, 0)
      pageRoot.value?.scrollTo?.(0, 0)
    })
  }
)

onMounted(() => {
  miniStore.resetSession()
  miniStore.syncRankPoints(players.value.length)
})

const abort = () => {
  if (isActive.value) {
    if (!confirm('ミニ大会を中断しますか？')) return
  }
  stopTimer({ silent: true })
  playersStore.initialize()
  router.push('/players')
}

const startPlay = async () => {
  playersStore.initialize()
  resetTimer()
  await nextTick()
  startTimer()
}

const startFromSetup = async () => {
  if (!players.value.length) return
  miniStore.startSession(players.value)
  await startPlay()
}

const showAnswers = () => {
  miniStore.phase = 'answer'
}

const goScore = () => {
  miniStore.phase = 'score'
  miniStore.inputShow = false
}

const backToAnswers = () => {
  miniStore.phase = 'answer'
}

const confirmScores = async () => {
  miniStore.applyRoundScores(players.value)
  miniStore.nextRoundOrFinal()
  if (miniStore.phase === 'play') {
    await startPlay()
    return
  }
  nameFlag.value = Array(players.value.length)
  infoFlag.value = Array(players.value.length)
  revealRank = 99
}

const nextRankShow = () => {
  const list = finalRanking.value
  if (revealRank === 99) revealRank = list.length
  if (revealRank > 0) {
    infoFlag.value[revealRank] = true
    nameFlag.value[--revealRank] = true
    const se = revealRank === 0 ? rankSound1 : rankSound2
    se.currentTime = 0
    se.play()
  }
}

const infoShow = (i) => {
  infoFlag.value[i] = true
}

const finish = () => {
  playersStore.initialize()
  router.push('/players')
}

onBeforeRouteLeave(() => {
  stopTimer({ silent: true })
  miniStore.resetSession()
})
</script>

<template>
  <div ref="pageRoot" class="mini-page" :class="{ 'is-final': miniStore.phase === 'final' }">
  <header v-if="miniStore.phase !== 'final'" class="row">
    <button class="btn btn-outline-info col-2" type="button" @click="abort">
      《　中断
    </button>
    <div class="text-center col-8">
      <div v-if="miniStore.phase !== 'setup' && miniStore.phase !== 'final'" class="round-label">
        第{{ miniStore.currentRound }}ラウンド / {{ miniStore.totalRounds }}
      </div>
      <div v-if="limitMode && miniStore.phase === 'play'" class="limitTime">
        制限時間{{ limitMin }}分{{ limitSec }}秒
      </div>
    </div>
  </header>

  <!-- setup -->
  <div v-if="miniStore.phase === 'setup'" class="setup">
    <h2>ミニ大会 設定</h2>
    <div class="setup-grid">
      <div>
        <h3>種目</h3>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="typeMul" value="multiply" v-model="miniStore.problemType">
          <label class="form-check-label" for="typeMul">かけ算</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="typeDiv" value="divide" v-model="miniStore.problemType">
          <label class="form-check-label" for="typeDiv">わり算</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="typeAbacus" value="abacus" v-model="miniStore.problemType">
          <label class="form-check-label" for="typeAbacus">見取算</label>
        </div>

        <div v-if="miniStore.problemType === 'multiply'" class="mt-3">
          <input type="number" min="1" max="6" v-model.number="miniStore.mulDigitsA" class="form-control digit">桁
          ×
          <input type="number" min="1" max="6" v-model.number="miniStore.mulDigitsB" class="form-control digit">桁
        </div>
        <div v-if="miniStore.problemType === 'divide'" class="mt-3">
          ÷
          <input type="number" min="1" max="6" v-model.number="miniStore.divDivisorDigits" class="form-control digit">桁
          ＝
          <input type="number" min="1" max="6" v-model.number="miniStore.divQuotientDigits" class="form-control digit">桁
        </div>
        <div v-if="miniStore.problemType === 'abacus'" class="mt-3">
          <input type="number" min="1" max="6" v-model.number="miniStore.abacusDigits" class="form-control digit">桁
          <input type="number" min="2" max="10" v-model.number="miniStore.abacusTerms" class="form-control digit">口
          <select v-model="miniStore.abacusMode" class="form-select d-inline-block ms-2" style="width:140px">
            <option value="add">加算</option>
            <option value="addSub">加減算</option>
          </select>
        </div>

        <div class="rules">
          <h3>大会のルール（使い方）</h3>
          <ol>
            <li>START でラウンド開始。</li>
            <li>解き終わったら早押しボタンを押します。（解答用紙は各自でご準備ください）</li>
            <li>全員終了後、解答を表示します。</li>
            <li>「点数入力」で、用紙の点数を入力します。</li>
            <li>点数の高い順に順位ポイントを加算します。点数が同じときは、タイムが早いほうが上です。（各ラウンドの順位は表示しません）</li>
            <li>規定ラウンドまで繰り返し、最後に累計の順位ポイントで発表します。</li>
            <li>STOP は緊急停止のみ。途中でやめるときは「中断」から選手情報へ戻れます。</li>
          </ol>
        </div>
      </div>

      <div>
        <h3>ラウンド</h3>
        <p>
          問題数
          <input type="number" min="1" max="5" v-model.number="miniStore.problemCount" class="form-control digit">
          （最大5）
        </p>
        <p>
          規定ラウンド
          <input type="number" min="1" max="20" v-model.number="miniStore.totalRounds" class="form-control digit">
        </p>
        <h3 class="mt-4">順位ポイント</h3>
        <p class="hint">初期値は人数分（1位が{{ players.length }}ポイント）。変更できます。</p>
        <div class="rank-grid">
          <div v-for="(_, i) in miniStore.rankPoints" :key="i" class="rank-edit">
            {{ i + 1 }}位
            <input type="number" min="0" max="99" v-model.number="miniStore.rankPoints[i]" class="form-control digit">
            ポイント
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="miniStore.phase === 'setup'" class="setup-footer">
    <button
      class="btn btn-primary btn-lg px-5 start-btn"
      type="button"
      :disabled="!players.length"
      @click="startFromSetup"
    >
      START
    </button>
  </div>

  <!-- play / answers share problem display -->
  <div
    v-if="miniStore.phase === 'play' || miniStore.phase === 'answer'"
    :class="miniStore.phase === 'play' ? 'play-screen' : 'answer-screen'"
  >
    <div
      class="stage"
      :class="{ 'problems-hidden': miniStore.phase === 'play' && !problemsVisible }"
    >
      <div v-if="miniStore.problemType === 'abacus'" class="abacus-row">
        <div v-for="problem in miniStore.problems" :key="problem.index" class="problem-box">
          <div class="eq-num">{{ problem.index + 1 }}</div>
          <div
            v-for="(term, ti) in problem.terms"
            :key="ti"
            class="abacus-term"
          >
            <span class="sign">{{ term.sign < 0 ? '-' : '' }}</span>
            <span class="val">{{ formatNumber(term.value) }}</span>
          </div>
          <div v-if="miniStore.phase === 'answer'" class="abacus-answer">
            {{ formatNumber(problem.answer) }}
          </div>
        </div>
      </div>
      <div v-else class="eq-list">
        <div v-for="problem in miniStore.problems" :key="problem.index" class="problem-box eq-box">
          <span class="eq-num">{{ problem.index + 1 }}</span>
          <span class="eq-body">
            <template v-if="problem.type === 'divide'">
              {{ formatNumber(problem.dividend) }} ÷ {{ formatNumber(problem.divisor) }} ＝<template v-if="miniStore.phase === 'answer'"> {{ formatNumber(problem.answer) }}</template>
            </template>
            <template v-else>
              {{ formatNumber(problem.a) }} × {{ formatNumber(problem.b) }} ＝<template v-if="miniStore.phase === 'answer'"> {{ formatNumber(problem.answer) }}</template>
            </template>
          </span>
        </div>
      </div>
    </div>

    <div v-if="miniStore.phase === 'play'" class="play-bottom">
      <div class="clock-wrap">
        <TimeDisplay :time="time" size="clamp(5rem, 12vh, 7.5rem)" compact />
      </div>
      <div
        ref="cardsRoot"
        class="player-cards"
        :style="{ '--card-slots': cardSlots }"
      >
        <div class="player-row">
          <PlayerTime
            v-for="player in topRow"
            :key="player.keyCode"
            :player="player"
            compact
          />
        </div>
        <div v-if="isTwoRows" class="player-row">
          <PlayerTime
            v-for="player in bottomRow"
            :key="player.keyCode"
            :player="player"
            compact
          />
        </div>
      </div>
      <button
        v-if="isActive"
        class="btn btn-danger btn-sm emergency-stop"
        type="button"
        @click="stopTimer({ silent: true })"
      >
        STOP
      </button>
      <button
        v-else-if="time === '終了'"
        class="btn btn-outline-success emergency-stop"
        type="button"
        @click="miniStore.phase = 'answerConfirm'"
      >
        解答へ
      </button>
    </div>

    <div v-if="miniStore.phase === 'answer'" class="answer-footer">
      <button class="btn btn-outline-info btn-lg px-5" type="button" @click="goScore">点数入力　》</button>
    </div>
  </div>

  <div v-if="miniStore.phase === 'answerConfirm'" class="center-msg">
    <p>解答を表示します</p>
    <button class="btn btn-success btn-lg px-5" type="button" @click="showAnswers">表示</button>
  </div>

  <div v-if="miniStore.phase === 'score'" class="score">
    <h2>点数入力</h2>
    <div v-if="!miniStore.inputShow" class="m-5">
      <p>点数入力のページを表示します。</p>
      <p>プロジェクターの画面を閉じてください。</p>
      <p>（Windowsキー ＋ P でも切り替えができます）</p>
      <div class="score-nav">
        <button class="btn btn-outline-info" type="button" @click="backToAnswers">《　解答表示</button>
        <button class="btn btn-success" type="button" @click="miniStore.inputShow = true">準備OK</button>
      </div>
    </div>
    <div v-else>
      <table>
        <thead class="border-bottom">
          <tr>
            <th class="px-3">対応キー</th>
            <th class="px-3">選手名</th>
            <th class="px-3">タイム</th>
            <th class="px-3">点数</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="player in players" :key="player.keyCode">
            <th v-text="player.keyCode"></th>
            <td class="text-start px-3" v-text="player.name"></td>
            <td>{{ player.time }}</td>
            <td>
              <input
                type="number"
                max="9999"
                class="text-center"
                v-model="miniStore.paperScores[player.keyCode]"
              >点
            </td>
          </tr>
        </tbody>
      </table>
      <div class="score-nav">
        <button class="btn btn-outline-info btn-lg px-4" type="button" @click="backToAnswers">
          《　解答表示
        </button>
        <button class="btn btn-primary btn-lg px-5" type="button" @click="confirmScores">
          {{ miniStore.isLastRound ? '最終発表　》' : '次のラウンド　》' }}
        </button>
      </div>
    </div>
  </div>

  <div v-if="miniStore.phase === 'final'" class="final-wrap">
    <div v-for="(player, i) in finalRanking" :key="player.keyCode">
      <span :class="i == 0 ? 'rank1' : 'rank'" v-text="i + 1 + '位'"></span>
      <transition name="name-show" @after-enter="infoShow(i)">
        <span :class="i == 0 ? 'name1' : 'name'" v-text="player.name" v-show="nameFlag[i]"></span>
      </transition>
      <transition name="info-show">
        <span v-show="infoFlag[i]">
          <span :class="i == 0 ? 'point1' : 'point'" v-text="player.total + 'ポイント'"></span>
        </span>
      </transition>
      <hr>
    </div>
    <div class="row final-nav">
      <button class="btn btn-outline-primary btn-lg col-2 offset-3" type="button" @click="nextRankShow">
        次を表示
      </button>
      <button class="btn btn-outline-danger col-2 offset-3" type="button" @click="finish">
        選手情報
      </button>
    </div>
  </div>
  </div>
</template>

<style scoped>
.mini-page {
  height: 100dvh;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}
.mini-page.is-final {
  overflow: auto;
}
header.row {
  flex-shrink: 0;
  margin-left: 0;
  margin-right: 0;
}
header .btn {
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.round-label {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2c5f7c;
}
.limitTime {
  text-align: center;
  font-size: 1.1rem;
  color: #d2691e;
  font-family: "RocknRoll One", sans-serif;
  font-weight: bold;
}
.setup {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0 40px 24px;
}
.setup-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 40px;
  align-items: start;
}
.setup h3 {
  color: darkslategray;
  border-bottom: 2px solid;
  width: 280px;
  margin-bottom: 12px;
}
.rules {
  margin-top: 28px;
  padding: 12px 16px;
  background: #f7fbfd;
  border: 1px solid #c5e4f0;
  border-radius: 10px;
  max-width: 420px;
}
.rules h3 {
  width: auto;
  margin-bottom: 10px;
  font-size: 1.15rem;
}
.rules ol {
  margin: 0;
  padding-left: 1.4em;
  font-size: 0.95rem;
  line-height: 1.55;
  color: #2c5f7c;
}
.rules li {
  margin-bottom: 0.45em;
}
.digit {
  display: inline-block;
  width: 70px;
  text-align: center;
  margin: 0 6px;
}
.hint {
  color: gray;
  font-size: 0.95rem;
}
.rank-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
}
.rank-edit {
  margin: 4px 0;
  font-size: 1.1rem;
  white-space: nowrap;
}
.setup-footer {
  flex-shrink: 0;
  background: #fff;
  padding: 8px 0 12px;
  border-top: 1px solid #d9e8ef;
  z-index: 2;
}
.start-btn {
  display: block;
  margin: 0 auto;
}
.setup :deep(h2) {
  margin-bottom: 16px !important;
}
.play-screen,
.answer-screen {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.stage {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 8px 16px 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.stage.problems-hidden .eq-list,
.stage.problems-hidden .abacus-row {
  visibility: hidden;
}
.eq-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: min(720px, 92%);
  margin: 0 auto;
}
.problem-box {
  border: 2px solid #87ceeb;
  border-radius: 10px;
  background: #f0f8ff;
  padding: 6px 18px 10px;
  box-sizing: border-box;
  overflow: visible;
}
.eq-box {
  display: grid;
  grid-template-columns: 2.4em 1fr;
  align-items: center;
  column-gap: 12px;
  width: 100%;
  font-size: clamp(1.2rem, 3vh, 2rem);
  color: #2c5f7c;
}
.eq-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.7em;
  height: 1.7em;
  border: 2px solid #2c5f7c;
  border-radius: 50%;
  font-size: 0.8em;
  font-weight: bold;
  line-height: 1;
  flex-shrink: 0;
}
.eq-body {
  font-family: "RocknRoll One", sans-serif;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.abacus-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 12px;
  width: 100%;
  padding-bottom: 12px;
}
.abacus-row .eq-num {
  margin: 0 auto 6px;
}
.abacus-term {
  display: grid;
  grid-template-columns: 1.2ch 8ch;
  font-variant-numeric: tabular-nums;
  font-size: clamp(1rem, 2.2vh, 1.5rem);
  font-family: "RocknRoll One", sans-serif;
  color: #2c5f7c;
}
.abacus-term .sign {
  text-align: right;
}
.abacus-term .val {
  text-align: right;
}
.abacus-answer {
  margin-top: 6px;
  padding-top: 6px;
  padding-bottom: 2px;
  border-top: 2px solid #87ceeb;
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
  color: #2c5f7c;
}
.answer-footer {
  flex-shrink: 0;
  text-align: center;
  padding: 12px 0 16px;
  background: #fff;
}
.play-bottom {
  flex-shrink: 0;
  padding-bottom: 8px;
  background: #fff;
}
.clock-wrap :deep(div) {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.1;
}
.player-cards {
  width: 100%;
}
.player-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  width: 100%;
}
.player-row > * {
  flex: 0 0 calc(100% / var(--card-slots));
  max-width: calc(100% / var(--card-slots));
  min-width: 0;
  box-sizing: border-box;
}
.emergency-stop {
  display: block;
  margin: 4px auto 0;
  opacity: 0.85;
}
.center-msg {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}
.score {
  flex: 1;
  min-height: 0;
  overflow: auto;
}
.score-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 1.5rem 0;
}
.score table {
  margin-top: 12px;
}
.final-wrap {
  flex: 1;
  background-color: darkslategray;
  color: lightcyan;
  min-height: 0;
  overflow: auto;
}
.final-wrap span {
  display: inline-block;
  font-size: 2rem;
}
.final-wrap hr {
  border-width: 5px 0 0 0;
  width: 95%;
  margin: 8px auto;
}
.rank1 {
  width: 120px;
  margin-left: 20px;
  text-align: right;
  font-size: 3rem;
  color: pink;
}
.name1 {
  width: 80%;
  text-align: center;
  font-size: 5rem;
  color: pink;
}
.point1 {
  width: 360px;
  margin-left: 130px;
  text-align: center;
  font-size: 3rem;
  color: pink;
}
.rank {
  width: 120px;
  margin-left: 20px;
  text-align: right;
  font-size: 3rem;
}
.name {
  width: 360px;
  margin-left: 30px;
  font-size: 3rem;
}
.point {
  width: 220px;
  margin-left: 10px;
  text-align: center;
  color: pink;
}
.final-nav {
  padding: 20px;
}
.name-show-enter-active {
  transition: all 1s;
}
.name-show-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.name-show-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.info-show-enter-active {
  transition: opacity 0.5s;
}
.info-show-enter-from {
  opacity: 0;
}
.info-show-enter-to {
  opacity: 1;
}
</style>
