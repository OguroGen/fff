<script setup>
    import {ref,computed} from 'vue'
    import {PlayersStore} from '@/stores/players'
    import { useRouter } from 'vue-router'

    const playersStore=PlayersStore()
    const router=useRouter()
    const nameFlag=ref(Array(10))
    const infoFlag=ref(Array(10))
    const sound1 = new Audio('./sounds/levelup.mp3')
    const sound2 = new Audio('./sounds/newstitle1.mp3')

    let rank=99

    const hrStyle=computed(()=>{
        let mg=40-(playersStore.players_ranked.length*5)
        let mgString=mg+'px'
        return {'margin-top':mgString,'margin-bottom':mgString}
    })

    const pointFlag=computed(()=>{
        return infoFlag.value[0]
    })

    //次の順位を表示
    const nextRankShow=()=>{
        if(rank==99){rank=playersStore.players_ranked.length}
        if(rank>0){
            infoFlag.value[rank]=true
            nameFlag.value[--rank]=true
            let se=(rank==0)?sound1:sound2
            se.currentTime = 0;
            se.play();  
        }
        console.log(pointFlag.value)  
        console.log(infoFlag.value[0])   
    }
    
    //選手の詳細を表示
    const infoShow=(i)=>{
        infoFlag.value[i]=true
    }
    //前のページへ
    const prev=()=>{
        router.push('/point')
    }

    //次のページへ
    const next=()=>{
        router.push('/players')
    }
</script>

<template>
    <div class="wrap">
        <div v-for="(player,i) in playersStore.players_ranked">
            <span :class="i==0?'rank1':'rank'" v-text="i+1+'位'"></span>
            <transition name="name-show" @after-enter="infoShow(i)">
                <span :class="i==0?'name1':'name'" v-text="player.name" v-show="nameFlag[i]"></span>
            </transition>
            <transition name="info-show">
                <span v-show="infoFlag[i]">
                    <span :class="i==0?'point1':'point'" v-text="player.point+'点'" v-if="pointFlag"></span>
                    <span :class="i==0?'time1':'time'" v-text="player.time+'秒'"></span>
                    <span :class="i==0?'grade1':'grade'" v-text="player.grade"></span>
                    <span :class="i==0?'school1':'school'" v-text="player.school"></span>
                </span>              
            </transition>
            <hr :style="hrStyle">
        </div>
        
        <div class="row">
            <button class="btn btn-outline-info col-2" @click="prev">《　得点入力</button>
            <button class="btn btn-outline-primary btn-lg col-2 offset-3" @click="nextRankShow">次を表示</button>
            <button class="btn btn-outline-danger col-2 offset-3" @click="next">選手情報</button>
        </div>
    </div>
</template>

<style scoped>
    button{
        margin-top:20px;
    }
    div.wrap{
        background-color:darkslategray;
        color:lightcyan;
        height:100vh;
    }
    span{
        display: inline-block;
        font-size: 2rem;
        /* border:solid; */
    }
    hr{
        border-width: 5px 0 0 0; /* 平面の線に指定 */
        width:95%;
        margin:auto;
        margin-top:-10px;
        margin-bottom:-10px;
    }
    span.rank1{
        width:120px;
        text-align: center;
        margin-left:20px;
        text-align:right;
        font-size:3rem;
        color:pink;
    }
    span.name1{
        width:80%;
        margin-bottom:-100px;
        text-align: center;
        font-size: 5rem;
        color:pink;
    }
    span.point1{
        width:300px;
        margin-left:130px;
        text-align:center;
        font-size: 3rem;
        color:pink;
    }
    span.time1{
        width:300px;
        text-align:center;
        font-size:3rem;
        color:pink;
    }
    span.grade1{
        width:220px;
        text-align:center;
        font-size:3rem;
        color:pink;
    }
    span.school1{
        font-size: 3rem;
        margin-left:30px;
        color:pink;
    }
    
    span.rank{
        width:120px;
        margin-left:20px;
        text-align:right;
        font-size:3rem;
    }
    span.name{
        width:360px;
        margin-left: 30px;
        font-size: 3rem;
    }
    span.point{
        width:150px;
        margin-left: 10px;
        text-align:center;
        color:pink;
    }
    span.time{
        width:200px;
        text-align:right;
    }
    span.grade{
        width:150px;
        margin-left:20px;
        text-align:center;
    }
    span.school{
        margin-left:20px;
    }
    .name-show-enter-active{
        transition:all 1s;
    }

    .name-show-enter-from{
        transform: translateX(100%);
        opacity: 0;
    }

    .name-show-enter-to{
        transform: translateX(0%);
        opacity: 1;
    }

    .info-show-enter-active{
        transition:opacity 0.5s;
    }

    .info-show-enter-from{
        opacity: 0;
    }

    .info-show-enter-to{
        opacity: 1;
    }
</style>
