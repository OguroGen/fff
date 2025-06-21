<script setup>
    import {ref,computed} from 'vue'
    import { onBeforeRouteLeave,useRouter } from 'vue-router'
    import {usePlayersStore} from '@/stores/playersStore'
    import {useSettingStore} from '@/stores/settingStore'
    import TimeDisplay from '@/components/TimeDisplay.vue'
    import PlayerTime from '@/components/PlayerTime.vue'

    const playersStore=usePlayersStore()
    const settingStore=useSettingStore()
    const router=useRouter()

    const pushSound = new Audio('./sounds/digital.mp3')
    const yooiSound = new Audio('./sounds/yooi.wav')
    const hajimeSound = new Audio('./sounds/hajime.wav')
    const yameSound = new Audio('./sounds/yame.wav')

    const time=ref(0)
    const startButton=ref(null)

    const lastLimitTime=settingStore.lastLimitTime*1000
    const silentMode=settingStore.silentMode;
    const limitMode=ref(settingStore.limitMode);
    const limitMin=ref(settingStore.limitMin);
    const limitSec=ref(settingStore.limitSec);

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
        let delayTime=0

        if(!silentMode){
            makeSound(yooiSound);
            time.value='よーい';
            delayTime=1600;
        }
        
        yooiDelay=setTimeout(()=>{
            startTime = new Date()
            displayTime = setInterval(() => {                   
                time.value = calculateTime()
            },5)
            if(!silentMode)makeSound(hajimeSound);        
        },delayTime)

        playersStore.players.forEach(player => {
            player.isRunning=true;
            player.time='_';
            player.timeRank='_';
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
            const i=playersStore.players.findIndex((element)=>element.keyCode==e.code)
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
        <div class="col-8">
            <div class="limitTime" v-if="limitMode">制限時間{{ limitMin }}分{{ limitSec }}秒</div>
        </div>
        <button class="btn btn-outline-info col-2" @click="next" :disabled="settingStore.startButtonCaption=='STOP'">得点入力　》</button>
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

    .limitTime{
        text-align: center;
        font-size: 1.6rem;
        color: brown;
    }

</style>