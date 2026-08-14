import { onBeforeUnmount, ref } from 'vue'
import { usePlayersStore } from '@/stores/playersStore'
import { useSettingStore } from '@/stores/settingStore'

/**
 * 同期早押し計測（よーい・キー・制限時間・最後の1人）。
 * startButtonCaption は触らない。TimeView 側で START/STOP/RESET を付ける。
 */
export function useSyncedBuzzerTimer(options = {}) {
  const playersStore = usePlayersStore()
  const settingStore = useSettingStore()

  const pushSound = new Audio('./sounds/digital.mp3')
  const yooiSound = new Audio('./sounds/yooi.wav')
  const hajimeSound = new Audio('./sounds/hajime.wav')
  const yameSound = new Audio('./sounds/yame.wav')

  const time = ref(0)
  const isActive = ref(false)
  // ミニ大会向け: よーい中は false、「はじめ」と同時に true
  const problemsVisible = ref(false)

  const lastLimitTime = settingStore.lastLimitTime * 1000
  const silentMode = settingStore.silentMode
  const limitMode = ref(settingStore.limitMode)
  const limitMin = ref(settingStore.limitMin)
  const limitSec = ref(settingStore.limitSec)

  let delayTime = settingStore.delayTime * 1000

  let startTime
  let displayTime
  let yooiDelay
  let hajimeDelay
  let lastTime
  let limitTime
  let ranking

  const makeSound = (sound) => {
    sound.currentTime = 0
    sound.play()
  }

  const calculateTime = () => {
    const t = new Date()
    return ((t - startTime) / 1000).toFixed(3)
  }

  const revealProblems = () => {
    problemsVisible.value = true
  }

  const stopTimer = (opts = {}) => {
    clearTimeout(yooiDelay)
    clearTimeout(hajimeDelay)
    clearInterval(displayTime)
    clearInterval(lastTime)
    clearTimeout(limitTime)
    displayTime = false
    const shouldNotify = isActive.value
    isActive.value = false
    time.value = '終了'
    if (shouldNotify && !opts.silent) {
      options.onStopped?.()
      options.onAllFinished?.()
    }
  }

  const countPlayer = () => {
    const runningPlayer = playersStore.players.filter((element) => element.isRunning)
    const runningCount = runningPlayer.length

    if (runningCount == 0) {
      stopTimer()
    } else if (
      runningCount == 1 &&
      !runningPlayer[0].isLastPlayer &&
      settingStore.lastPlayerCountdown
    ) {
      const lastPlayer = runningPlayer[0]
      lastPlayer.isLastPlayer = true
      const t = new Date()

      lastTime = setInterval(() => {
        const nowTime = new Date()
        const countDownTime = t - nowTime + lastLimitTime
        lastPlayer.time = (countDownTime / 1000).toFixed(1)
        if (countDownTime < 0) {
          lastPlayer.time = calculateTime()
          makeSound(yameSound)
          stopTimer()
        }
      }, 10)
    }
  }

  const stopPlayerTimer = (i) => {
    const players = playersStore.players
    if (players[i].isRunning == true) {
      players[i].time = calculateTime()
      makeSound(pushSound)
      players[i].isRunning = false
      players[i].timeRank = ranking++
      players[i].isLastPlayer = false
      countPlayer()
    }
  }

  const onKeyDown = (e) => {
    if (displayTime) {
      const i = playersStore.players.findIndex((element) => element.keyCode == e.code)
      if (i != -1) {
        stopPlayerTimer(i)
      }
    }
  }

  const startTimer = () => {
    isActive.value = true
    problemsVisible.value = false

    if (silentMode) {
      delayTime = 0
    } else {
      makeSound(yooiSound)
      time.value = 'よーい'
    }

    yooiDelay = setTimeout(() => {
      startTime = new Date()
      displayTime = setInterval(() => {
        time.value = calculateTime()
      }, 5)

      // 無音モードは「はじめ」が無いので、計時開始と同時に問題を出す
      if (silentMode) {
        revealProblems()
      }

      if (limitMode.value) {
        const totalLimitSeconds = limitMin.value * 60 + limitSec.value
        limitTime = setTimeout(() => {
          if (!silentMode) makeSound(yameSound)
          stopTimer()
        }, totalLimitSeconds * 1000)
      }
    }, delayTime)

    if (!silentMode) {
      hajimeDelay = setTimeout(() => {
        makeSound(hajimeSound)
        revealProblems()
      }, Math.max(delayTime, 800))
    }

    playersStore.players.forEach((player) => {
      player.isRunning = true
      player.time = '_'
      player.timeRank = '_'
    })

    ranking = 1
  }

  const resetTimer = () => {
    time.value = 0
    isActive.value = false
    problemsVisible.value = false
  }

  window.addEventListener('keydown', onKeyDown)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown)
    clearTimeout(yooiDelay)
    clearTimeout(hajimeDelay)
    clearInterval(displayTime)
    clearInterval(lastTime)
    clearTimeout(limitTime)
  })

  return {
    time,
    isActive,
    problemsVisible,
    limitMode,
    limitMin,
    limitSec,
    startTimer,
    stopTimer,
    resetTimer
  }
}
