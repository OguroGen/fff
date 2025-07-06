<script setup>
    import {ref,computed,onMounted} from 'vue'
    import {usePlayersStore} from '@/stores/playersStore'
    import { useRouter } from 'vue-router'

    const playersStore=usePlayersStore()
    const router=useRouter()
    const correctWrongFlag=ref(Array(10).fill(false))
    const sound1 = new Audio('./sounds/levelup.mp3')
    const sound2 = new Audio('./sounds/newstitle1.mp3')

    let currentIndex = 0
    const isAllRevealed = ref(false)
    const isTransitioning = ref(false)
    const isCompleted = ref(false)
    const currentPlayers = ref([])

    const hrStyle=computed(()=>{        
        const playerCount = currentPlayers.value.length
        // 人数のみに応じた行間（状態に関係なく一定）
        const baseMargin = playerCount >= 10 ? 8 : 10
        let mg = Math.max(baseMargin, 30 - (playerCount * 2))
        let mgString = mg + 'px'
        return {'margin-top': mgString, 'margin-bottom': mgString}
    })
    
    // 名前のフォントサイズ（人数のみに応じて一定）
    const dynamicNameFontSize = computed(() => {
        const playerCount = currentPlayers.value.length
        // 人数のみで決定（状態に関係なく一定）
        if (playerCount >= 10) return '1.9rem'
        if (playerCount >= 8) return '2.1rem'
        if (playerCount >= 6) return '2.3rem'
        return '2.4rem'
    })
    
    // 順位のフォントサイズ（人数のみに応じて一定）
    const dynamicRankFontSize = computed(() => {
        const playerCount = currentPlayers.value.length
        // 人数のみで決定（状態に関係なく一定）
        if (playerCount >= 10) return '2rem'
        if (playerCount >= 8) return '2.2rem'
        if (playerCount >= 6) return '2.4rem'
        return '2.5rem'
    })
    
    // その他のフォントサイズ（人数のみに応じて一定）
    const dynamicFontSize = computed(() => {
        const playerCount = currentPlayers.value.length
        // 人数のみで決定（状態に関係なく一定）
        if (playerCount >= 10) return '1.6rem'
        if (playerCount >= 8) return '1.8rem'
        if (playerCount >= 6) return '1.9rem'
        return '2rem'
    })

    // 初期表示：時間順にすべての選手を表示
    onMounted(() => {
        currentPlayers.value = [...playersStore.playersTimeOrder]
        console.log('Players loaded:', currentPlayers.value.length, currentPlayers.value)
        console.log('correctWrongFlag initial:', correctWrongFlag.value)
        // 時間は最初から表示
        // 正誤のみ順次表示
    })

    // 次の正誤を表示（下位から）
    const nextCorrectWrongShow = () => {
        if (isTransitioning.value) return
        
        if (!isAllRevealed.value) {
            // 下位（時間の遅い選手）から順番に正誤発表
            const nextIndex = currentPlayers.value.length - 1 - currentIndex
            console.log('currentIndex:', currentIndex, 'nextIndex:', nextIndex, 'total:', currentPlayers.value.length)
            
            if (nextIndex >= 0 && nextIndex < currentPlayers.value.length) {
                correctWrongFlag.value[nextIndex] = true
                console.log('Showing correct/wrong for index:', nextIndex, 'player:', currentPlayers.value[nextIndex]?.name)
                sound2.currentTime = 0
                sound2.play()
            }
            
            currentIndex++
            
            // 全員発表完了チェック
            if (currentIndex >= currentPlayers.value.length) {
                isAllRevealed.value = true
            }
        } else if (!isCompleted.value) {
            // 全員発表完了後の「順位発表」で暗転→ズーム表示
            showFinalRanking()
        }
    }

    // ズーム表示で最終順位発表
    const showFinalRanking = () => {
        isTransitioning.value = true
        
        // データを最終順位に更新
        currentPlayers.value = [...playersStore.playersCorrectWrongRanked]
        correctWrongFlag.value = Array(10).fill(true)
        
        // 少し待ってからズームイン開始
        setTimeout(() => {
            isTransitioning.value = false
            isCompleted.value = true
            
            // 効果音再生
            sound1.currentTime = 0
            sound1.play()
        }, 50) // データ更新後の短い遅延
    }

    // 前のページへ
    const prev = () => {
        router.push('/point')
    }

    // 次のページへ
    const next = () => {
        router.push('/players')
    }
</script>

<template>
    <div class="wrap">
        <!-- メインコンテンツ -->
        <div class="content" :class="{ 'zoom-in': isCompleted && !isTransitioning }">
            <div v-for="(player,i) in currentPlayers" :key="player.keyCode" class="player-row">
                <span class="rank" :style="{fontSize: dynamicRankFontSize}" v-text="isCompleted ? (player.isCorrect ? (i+1+'位') : '＊＊') : (i+1+'番手')"></span>
                <span class="name" :style="{fontSize: dynamicNameFontSize}" v-text="player.name"></span>
                
                <!-- 正誤表示（名前と時間の間） -->
                <transition name="correct-wrong-show">
                    <span v-show="correctWrongFlag[i]" class="correct-wrong-icon" 
                          :style="{width: currentPlayers.length >= 10 ? '40px' : currentPlayers.length >= 8 ? '45px' : '50px', height: currentPlayers.length >= 10 ? '40px' : currentPlayers.length >= 8 ? '45px' : '50px'}">
                        <!-- 正解アイコン -->
                        <svg v-if="player.isCorrect" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#28a745" stroke-width="3" fill="none"/>
                        </svg>
                        <!-- 不正解アイコン -->
                        <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="18" y1="6" x2="6" y2="18" stroke="#dc3545" stroke-width="3" stroke-linecap="round"/>
                            <line x1="6" y1="6" x2="18" y2="18" stroke="#dc3545" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </span>
                </transition>
                
                <!-- 時間表示（最初から表示） -->
                <span class="time" :style="{fontSize: dynamicFontSize}" v-text="player.time+'秒'"></span>
                
                <!-- 学年と所属（最初から表示） -->
                <span class="grade" :style="{fontSize: dynamicFontSize}" v-text="player.grade"></span>
                <span class="school" :style="{fontSize: dynamicFontSize}" v-text="player.school"></span>
                
                <hr :style="hrStyle">
            </div>
            
            <div class="row">
                <button class="btn btn-outline-info col-2" @click="prev">《　得点入力</button>
                <button 
                    class="btn btn-outline-primary btn-lg col-2 offset-3" 
                    @click="nextCorrectWrongShow"
                    :disabled="isTransitioning || isCompleted">
                    {{ isCompleted ? '発表完了' : (isAllRevealed ? '順位発表' : '次を表示') }}
                </button>
                <button class="btn btn-outline-danger col-2 offset-3" @click="next">選手情報</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .wrap {
        background-color: darkslategray;
        color: lightcyan;
        height: 100vh;
        font-family: 'RocknRoll One', sans-serif;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    
    .content {
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        flex: 1;
        overflow-y: auto;
        padding-bottom: 120px; /* ボタンエリアの分だけ余裕をもっと作る */
        padding-top: 30px; /* 1位の上にスペースをあける */
    }
    
    .content.zoom-in {
        animation: zoomInFinal 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        transform-origin: center 10%; /* ズームの中心をもっと上に */
    }
    
    .player-row {
        position: relative;
    }
    
    .row {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        margin: 0 20px;
    }
    
    button {
        margin-top: 0;
    }
    
    span {
        display: inline-block;
        font-size: 2rem;
    }
    
    hr {
        border-width: 5px 0 0 0;
        width: 95%;
        margin: auto;
        margin-top: -10px;
        margin-bottom: -10px;
    }
    
    .rank {
        width: 120px;
        margin-left: 20px;
        text-align: right;
        font-size: 2.5rem;
    }
    
    .name {
        width: 300px;
        margin-left: 30px;
        font-size: 2.5rem;
    }
    
    .correct-wrong-icon {
        display: inline-block;
        text-align: center;
        margin: 0 10px -5px 10px; /* 下マージンを-5pxに */
    }
    
    .correct-wrong-icon svg {
        width: 100%;
        height: 100%;
        display: block;
    }
    
    .details {
        margin-left: 20px;
    }
    
    .time {
        width: 200px;
        text-align: right;
        color: lightblue;
    }
    
    .grade {
        width: 150px;
        margin-left: 20px;
        text-align: center;
    }
    
    .school {
        margin-left: 20px;
    }
    
    /* ズームイン最終表示アニメーション */
    @keyframes zoomInFinal {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    /* 正誤表示アニメーション */
    .correct-wrong-show-enter-active {
        transition: all 0.5s ease-out;
    }
    
    .correct-wrong-show-enter-from {
        transform: scale(0) rotate(180deg);
        opacity: 0;
    }
    
    .correct-wrong-show-enter-to {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
</style>