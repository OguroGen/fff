<script setup>
    import {ref,computed} from 'vue'
    import { onBeforeRouteLeave,useRouter } from 'vue-router'
    import {PlayersStore} from '@/stores/players'
    import {SettingStore} from '@/stores/setting'
    import TimeDisplay from '@/components/TimeDisplay.vue'
    import PlayerTime from '@/components/PlayerTime.vue'

    const playersStore=PlayersStore()
    const settingStore=SettingStore()
    const router=useRouter()

    const pushSound = new Audio('./sounds/digital.mp3')
    const yooiSound = new Audio('./sounds/yooi.wav')
    const hajimeSound = new Audio('./sounds/hajime.wav')
    const yameSound = new Audio('./sounds/yame.wav')

    const time=ref(0)
    const startButton=ref(null)

    const lastLimitTime=settingStore.lastLimitTime*1000

    let startTime,displayTime,yooiDelay,lastTime,ranking

    //ユーザー数が６人以上の場合は二列にする
    const playersCol=computed(()=>{
        return playersStore.players.length>5 ? 'row row-cols-5':'row';
    })

    //スタートボタンの見た目を変更
    const startButtonClass=computed(()=>{
        switch(settingStore.startButtonCaption){
            case'START':
                return 'btn-primary'
                break
            case'STOP':
                return 'btn-danger'
                break
            case'RESET':
                return 'btn-secondary'
                break
        }
    })

    //スタートボタンをクリック
    const start=()=>{
    startButton.value.blur()

    if(settingStore.startButtonCaption=='START'){      //スタート処理
        
        makeSound(yooiSound)
        time.value='よーい'
        
        yooiDelay=setTimeout(()=>{
            startTime = new Date()
            displayTime = setInterval(() => {                   
                time.value = calculateTime()
            },5)
            makeSound(hajimeSound)        
        },1600)

        playersStore.players.forEach(e => {
            e.isRunning=true;
            e.time='_';
            e.timeRank='_';
        });

        ranking = 1

        settingStore.startButtonCaption='STOP'

    } else if(settingStore.startButtonCaption=='STOP'){  //ストップ処理
        stopTimer();

    } else {                                      //リセット処理
        time.value=0
        settingStore.startButtonCaption='START'
        
        playersStore.initialize()
    }
    }

    //ストップ
    const stopTimer=()=>{
        clearTimeout(yooiDelay)
        clearInterval(displayTime)
        clearInterval(lastTime)
        displayTime=false
        time.value='終了';
        settingStore.startButtonCaption='RESET'
    }

    //タイムの計算
    const calculateTime=()=>{
        let t = new Date()
        return(((t - startTime)/1000).toFixed(3));
    }

    //キーが押された時
    const onKeyDown=(e)=>{
        if(displayTime){        
            const i=playersStore.players.findIndex((element)=>element.ck==e.code)
            if(i!=-1){stopPlayerTimer(i)}        
        } 
    }

    //選手のタイマーを止める
    const stopPlayerTimer=(i)=>{
        const players=playersStore.players

        if(players[i].isRunning==true){
            players[i].time = calculateTime()
            makeSound(pushSound)
            players[i].isRunning = false
            players[i].timeRank = ranking++
            players[i].isLastPlayer=false
            //計測中のプレイヤーを数える
            countPlayer()
        }           
    }

    //選手が終わった時の処理
    const countPlayer=()=>{
        //計測中のプレイヤーを検索
        const runningPlayer=playersStore.players.filter(element=>element.isRunning)
        const runningCount=runningPlayer.length

        //計測中のプレイヤー数により処理をする
        if(runningCount==0){
            stopTimer()
        }else if(runningCount==1&&!runningPlayer[0].isLastPlayer&&settingStore.lastPlayerCountdown){
            const lastPlayer=runningPlayer[0]
            
            lastPlayer.isLastPlayer=true

            const t= new Date()

            lastTime=setInterval(()=>{
                let nowTime=new Date()
                let countDownTime=t-nowTime+lastLimitTime
                lastPlayer.time=(countDownTime/1000).toFixed(1)
                if(countDownTime<0){
                    lastPlayer.time=calculateTime()
                    makeSound(yameSound)
                    stopTimer()
                }
            },10)
        }
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

    //次のページへ
    const next=()=>{
        router.push('/point')
    }

    //イベントリスナーの追加 
    window.addEventListener('keydown', onKeyDown)

    //イベントリスナーの削除
    onBeforeRouteLeave((to, from) => {
      window.removeEventListener('keydown', onKeyDown)
    })
</script>

<template>
    <header class="row">
        <button class="btn btn-outline-info col-2" @click="prev" :disabled="settingStore.startButtonCaption=='STOP'">《　選手情報</button>
        <button class="btn btn-outline-info col-2 offset-8" @click="next" :disabled="settingStore.startButtonCaption=='STOP'">得点入力　》</button>
    </header>
    <TimeDisplay :time="time" />
    <div :class="playersCol">
        <PlayerTime :player="player" v-for="player in playersStore.players"/>
    </div>
    <button id="startButton" ref="startButton" class="btn btn-lg py-3 px-5" :class="startButtonClass" @click="start()">{{settingStore.startButtonCaption}}</button>
</template>

<style scoped>
    #startButton{
        display:block;
        margin: 0 auto;
        margin-top:30px;
    }

</style>