<script setup>
    import { ref } from 'vue'
    import { onBeforeRouteLeave,useRouter } from 'vue-router'
    import { usePlayersStore } from '@/stores/playersStore'
    import { usePlayerCardRows } from '@/composables/usePlayerCardRows'
    import PersonalTimer from '@/components/PersonalTimer.vue'

    const synth = window.speechSynthesis
    const vList=synth.getVoices()

    const router=useRouter()
    const playersStore=usePlayersStore()
    const players=playersStore.players

    const endSound = new Audio('./sounds/keikoku1.mp3')
    const yooiSound = new Audio('./sounds/yooi.wav')
    const hajimeSound = new Audio('./sounds/hajime.wav')
     
    const timers=[]
    const startTimes=[]
    const yooiDelays=[]
    let limitTimes=[]

    const cardsRoot = ref(null)
    const { topRow, bottomRow, isTwoRows, cardSlots } = usePlayerCardRows(
        () => playersStore.players,
        cardsRoot
    )

    //タイムの計算
    const calculateTime=(i)=>{
        let t = new Date()
        return (limitTimes[i]+(startTimes[i]-t))/1000
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
        limitTimes[i]=(players[i].limitMin*60+players[i].limitSec)*1000
        players[i].time=limitTimes[i]/1000
        const name=playersStore.players[i].name
        const utterName = new SpeechSynthesisUtterance(name)
        utterName.voice=vList.find(voice=>voice.lang=='ja-JP')
        synth.speak(utterName)
        utterName.onend=()=>{
            if(players[i].isRunning){
                makeSound(yooiSound)
                yooiDelays[i]=setTimeout(()=>{
                    startTimes[i] = new Date()
                    timers[i]=setInterval(()=>{
                        players[i].time=calculateTime(i)
                        if(players[i].time<0){
                            stopTimer(i)
                            callYame(name)
                        }
                    },5)
                    makeSound(hajimeSound)        
                },1600)
            }
        }
        players[i].isRunning=true
    }
    
    //選手のタイマーを止める
    const stopTimer=(i)=>{
        makeSound(endSound)
        players[i].isRunning = false
        clearInterval(timers[i])
        clearTimeout(yooiDelays[i])
    }

    //音を鳴らす
    const makeSound=(sound)=>{
        sound.currentTime = 0
        sound.play();    
    }

    
    //止めを３回鳴らす
    const callYame=(name)=>{
        const utterYame1 = new SpeechSynthesisUtterance(name+'やめ')
        const utterYame2 = new SpeechSynthesisUtterance(name+'やめー')
        const utterYame3 = new SpeechSynthesisUtterance(name+'やめーー')
        utterYame1.voice=vList.find(voice=>voice.lang=='ja-JP')
        utterYame2.voice=vList.find(voice=>voice.lang=='ja-JP')
        utterYame3.voice=vList.find(voice=>voice.lang=='ja-JP')
        synth.speak(utterYame1)
        utterYame1.onend=()=>synth.speak(utterYame2)
        utterYame2.onend=()=>synth.speak(utterYame3)
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
    <h2>個別タイマー</h2>
    <div
        ref="cardsRoot"
        class="player-cards"
        :style="{ '--card-slots': cardSlots }"
    >
        <div class="player-row">
            <PersonalTimer v-for="player in topRow" :key="player.keyCode" :player="player" />
        </div>
        <div v-if="isTwoRows" class="player-row">
            <PersonalTimer v-for="player in bottomRow" :key="player.keyCode" :player="player" />
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