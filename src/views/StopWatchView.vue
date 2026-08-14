<script setup>
    import { ref } from 'vue'
    import { onBeforeRouteLeave,useRouter } from 'vue-router'
    import { usePlayersStore } from '@/stores/playersStore'
    import { usePlayerCardRows } from '@/composables/usePlayerCardRows'
    import StopWatch from '@/components/StopWatch.vue'

    const synth = window.speechSynthesis;
    const router=useRouter()
    const playersStore=usePlayersStore()
    const players=playersStore.players

    const pushSound = new Audio('./sounds/digital.mp3')
    const yooiSound = new Audio('./sounds/yooi.wav')
    const hajimeSound = new Audio('./sounds/hajime.wav')
    
    const timers=[]
    const startTimes=[]
    const yooiDelays=[]

    const cardsRoot = ref(null)
    const { topRow, bottomRow, isTwoRows, cardSlots } = usePlayerCardRows(
        () => playersStore.players,
        cardsRoot
    )

    //プレイヤーのタイムを全て0に
    players.forEach((player)=>player.time=0)

    //タイムの計算
    const calculateTime=(i)=>{
        let t = new Date()
        return(((t - startTimes[i])/1000).toFixed(3));
    }

    //キーが押された時
    const onKeyDown=(e)=>{
        const i=players.findIndex((element)=>element.keyCode==e.code)
        if(i!=-1){
            if(players[i].isRunning){
                stopTimer(i)
            }else{
                startTimer(i)
            }
        }
    }

    //選手のタイマーを動かす
    const startTimer=(i)=>{
        players[i].time=0
        const vList=synth.getVoices()
        const utterName = new SpeechSynthesisUtterance(playersStore.players[i].name);
        utterName.voice=vList.find(voice=>voice.lang=='ja-JP')
        synth.speak(utterName)
        utterName.onend=()=>{
            if(players[i].isRunning){
                makeSound(yooiSound)
                yooiDelays[i]=setTimeout(()=>{
                    startTimes[i] = new Date()
                    timers[i]=setInterval(()=>{
                        players[i].time=calculateTime(i)
                    },5)
                    makeSound(hajimeSound)        
                },1600)
            }
        }
        players[i].isRunning=true
    }
    
    //選手のタイマーを止める
    const stopTimer=(i)=>{
        makeSound(pushSound)
        players[i].isRunning = false
        clearInterval(timers[i])
        clearTimeout(yooiDelays[i])
    }

    //音を鳴らす
    const makeSound=(sound)=>{
        sound.currentTime = 0
        sound.play();    
    }

    //前のページへ
    const prev=()=>{
        router.push('/players')       
    }

    //イベントリスナーの追加
    window.addEventListener('keydown', onKeyDown)

    //イベントリスナーの削除
    onBeforeRouteLeave((to, from) => {
        window.removeEventListener('keydown', onKeyDown)
        timers.forEach((timer)=>clearInterval(timer))
        yooiDelays.forEach((delay)=>clearTimeout(delay))
        playersStore.initialize()
    })
</script>

<template>
    <header class="row">
        <button class="btn btn-outline-info col-2" @click="prev">《　選手情報</button>
    </header>
    <h2>個別ストップウォッチ</h2>
    <div
        ref="cardsRoot"
        class="player-cards"
        :style="{ '--card-slots': cardSlots }"
    >
        <div class="player-row">
            <StopWatch v-for="player in topRow" :key="player.keyCode" :player="player" />
        </div>
        <div v-if="isTwoRows" class="player-row">
            <StopWatch v-for="player in bottomRow" :key="player.keyCode" :player="player" />
        </div>
    </div>
</template>

<style scoped>
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
}
</style>