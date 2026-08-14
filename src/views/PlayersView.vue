<script setup>
    import { computed, watch } from 'vue'
    import {usePlayersStore} from '@/stores/playersStore'
    import {useSettingStore} from '@/stores/settingStore'
    import { useRouter } from 'vue-router'
    const playersStore=usePlayersStore()
    const settingStore=useSettingStore()
    const router=useRouter()

    const MODE_NEXT = {
        buzzer: { path: '/time', label: '時間計測　》' },
        mini: { path: '/mini-tournament', label: 'ミニ大会　》' },
        stopwatch: { path: '/stopwatch', label: 'ストップウォッチ　》' },
        timer: { path: '/personaltimer', label: 'タイマー　》' }
    }

    const nextMeta = computed(() => MODE_NEXT[settingStore.appMode] || MODE_NEXT.buzzer)
    const showTournamentOptions = computed(() => {
        return settingStore.appMode === 'buzzer' || settingStore.appMode === 'mini'
    })
    const showTournamentNameOption = computed(() => {
        return settingStore.appMode === 'buzzer'
    })

    // silentModeとdelayTimeModeの排他制御
    watch(() => settingStore.silentMode, (newValue) => {
        if (newValue) {
            settingStore.delayTimeMode = false
            settingStore.delayTime = 1.6
        }
    })

    watch(() => settingStore.delayTimeMode, (newValue) => {
        if (newValue) {
            settingStore.silentMode = false
        } else {
            // delayTimeModeをオフにしたときにdelayTimeを1.6に戻す
            settingStore.delayTime = 1.6
        }
    })

    const home = () => {
        router.push('/')
    }

    const next = () => {
        if (settingStore.appMode === 'stopwatch') {
            playersStore.initialize()
        }
        router.push(nextMeta.value.path)
    }
</script>

<template>
    <header class="row">
        <button class="btn btn-outline-info col-2" @click="home">《　ホーム</button>
        <button class="btn btn-outline-info col-2 offset-8" @click="next">{{ nextMeta.label }}</button>
    </header>
    <h2>選手情報</h2>
    <div class="row">
        <div class="col">
            <table class="player">
                <thead class="border-bottom">
                    <tr>
                        <th class="px-3">対応キー</th>
                        <th class="px-3">選手名</th>
                        <th class="px-3">学年</th>
                        <th class="px-3">所属</th>
                        <th class="px-3">使用可</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="player in playersStore.playersMaster">
                        <th v-text="player.keyCode" style="padding: 10px"></th>
                        <td>
                            <input class="form-control" type="text" maxlength="8" v-model="player.name" style="width:170px" :disabled="!player.available">
                        </td>
                        <td>
                            <input class="form-control" type="text" maxlength="3" v-model="player.grade" style="width:100px" :disabled="!player.available">
                        </td>
                        <td>
                            <input class="form-control" type="text" maxlength="6" v-model="player.school" style="width:150px" :disabled="!player.available">
                        </td>
                        <td><div class="form-check form-switch mx-3"><input type="checkbox" class="form-check-input" role="switch" v-model="player.available"></div></td>
                    </tr>
                </tbody>
            </table>
            <p>
                選手名：８文字以内　（必須）<br/>
                学　年：３文字以内　（任意）<br/>
                所　属：６文字以内　（任意）
            </p>
        </div>
        <div class="col option" v-if="showTournamentOptions">
            <h3>オプション</h3>
            <div class="form-check form-switch">
                <input type="checkbox" class="form-check-input" role="switch" v-model="settingStore.lastPlayerCountdown">
                <span class="ms-3" :class="{light:!settingStore.lastPlayerCountdown}">最後の選手は<input type="number" v-model="settingStore.lastLimitTime" style="width:60px;text-align:center" :disabled="!settingStore.lastPlayerCountdown">秒後に終了</span>
            </div>
            <div class="form-check form-switch">
                <input type="checkbox" class="form-check-input" role="switch" v-model="settingStore.silentMode">
                <span class="ms-3" :class="{light:!settingStore.silentMode}">「よーい、はじめ」の声を出さない</span>
            </div>
            <div class="form-check form-switch">
                <input type="checkbox" class="form-check-input" role="switch" v-model="settingStore.limitMode">
                <span class="ms-3" :class="{light:!settingStore.limitMode}">制限時間を<input type="number" min="0" v-model="settingStore.limitMin" style="width:60px;text-align:center" :disabled="!settingStore.limitMode">分<input type="number" max="59" min="0" v-model="settingStore.limitSec" style="width:60px;text-align:center" :disabled="!settingStore.limitMode">秒に設定する</span>
            </div>
            <div class="form-check form-switch">
                <input type="checkbox" class="form-check-input" role="switch" v-model="settingStore.delayTimeMode">
                <span class="ms-3" :class="{light:!settingStore.delayTimeMode}">計時は「よーいの<input type="number" v-model="settingStore.delayTime" step="0.1" style="width:80px;text-align:center" :disabled="!settingStore.delayTimeMode" min="0">秒後から」に変更する</span>
            </div>
            <div class="form-check form-switch" v-if="showTournamentNameOption">
                <input type="checkbox" class="form-check-input" role="switch" v-model="settingStore.showTournamentName">
                <span class="ms-3" :class="{light:!settingStore.showTournamentName}">大会名を表示する<input type="text" v-model="settingStore.tournamentName" maxlength="20" style="width:200px;text-align:center;margin-left:10px" :disabled="!settingStore.showTournamentName" placeholder="大会名">フォントサイズ<input type="number" v-model="settingStore.tournamentNameFontSize" min="30" max="150" style="width:60px;text-align:center;margin-left:10px" :disabled="!settingStore.showTournamentName">px</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    p{
        margin-left:130px;
    }
    table.player{
        min-width:620px;
    }
    h3{
        color:darkslategray;
        margin:0 0 20px;
        border-bottom: 2px solid;
        width:400px;
    }
    .light{
        color:gray;
    }
    .option{
        font-size:1.3rem;
        min-width:400px;
    }

</style>
