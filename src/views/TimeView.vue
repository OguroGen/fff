<script setup>
    import {ref,computed} from 'vue'
    import { onBeforeRouteLeave,useRouter } from 'vue-router'
    import {PlayersStore} from '@/stores/players'
    import TimeDisplay from '@/components/TimeDisplay.vue'
    import PlayerTime from '@/components/PlayerTime.vue'

    const playersStore=PlayersStore()
    const router=useRouter()
    const pushSound = new Audio('./sounds/digital.mp3')
    const yooiSound = new Audio('./sounds/yooi.wav')
    const hajimeSound = new Audio('./sounds/hajime.wav')
    const time=ref(0)
    const startButton=ref(null)

    let startTime,displayTime,yooiDelay,ranking

    //ユーザー数が６人以上の場合は二列にする
    const playersCol=computed(()=>{
        return playersStore.players.length>5 ? 'row row-cols-5':'row';
    })

    //スタートボタンの見た目を変更
    const startButtonClass=computed(()=>{
        switch(playersStore.startButtonCaption){
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

    if(playersStore.startButtonCaption=='START'){      //スタート処理
        
        yooiSound.currentTime = 0
        yooiSound.play()
        time.value='よーい'
        
        yooiDelay=setTimeout(()=>{
            startTime = new Date()
            displayTime = setInterval(() => {                   
                time.value = calculateTime()
            },5)
            hajimeSound.currentTime = 0
            hajimeSound.play();           
        },1600)

        playersStore.players.forEach(e => {
            e.isRunning=true;
            e.time='_';
            e.timeRank='_';
        });

        ranking = 1

        playersStore.startButtonCaption='STOP'

    } else if(playersStore.startButtonCaption=='STOP'){  //ストップ処理
        stopTimer();
    } else {                                      //リセット処理
        time.value=0
        playersStore.startButtonCaption='START'
        
        playersStore.initialize()
    }
    }

    //ストップ
    const stopTimer=()=>{
        clearTimeout(yooiDelay)
        clearInterval(displayTime)
        displayTime=false
        time.value='終了';
        playersStore.startButtonCaption='RESET'
    }

    //タイムの計算
    const calculateTime=()=>{
        let t = new Date();
        return(((t - startTime)/1000).toFixed(3));
    }

    //キーが押された時
    const onKeyDown=(e)=>{
        if(displayTime){
        
            let i=playersStore.players.findIndex((element)=>element.ck==e.code)
            
            if(i!=-1 && playersStore.players[i].isRunning==true){
                playersStore.players[i].time = calculateTime()
                pushSound.currentTime = 0
                pushSound.play()
                playersStore.players[i].isRunning = false
                playersStore.players[i].timeRank = ranking++
            }

            //計測中のプレイヤーを検索
            let f=playersStore.players.findIndex((element)=>element.isRunning==true)
            // const runningPlayer=playersStore.players.filter(element=>element.isRunning)
            // const runningCount=runningPlayer.length

            //計測中のプレイヤー数により処理をする
            if(f==-1){stopTimer()}
            // if(runningCount==0){
            //     stopTimer()
            // }else if(runningCount==1){
            //     console.log('残り一人になりました')
            // }
        } 
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
        <button class="btn btn-outline-info col-1" @click="prev" :disabled="playersStore.startButtonCaption=='STOP'">《　選手情報</button>
        <button class="btn btn-outline-info col-1 offset-10" @click="next" :disabled="playersStore.startButtonCaption=='STOP'">得点入力　》</button>
    </header>
    <TimeDisplay :time="time" />
    <div :class="playersCol">
        <PlayerTime :player="player" v-for="player in playersStore.players"/>
    </div>
    <button id="startButton" ref="startButton" class="btn btn-lg py-3 px-5" :class="startButtonClass" @click="start()">{{playersStore.startButtonCaption}}</button>
</template>

<style scoped>
    #startButton{
        display:block;
        margin: 0 auto;
        margin-top:30px;
    }
    

</style>