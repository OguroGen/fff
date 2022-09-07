<script setup>
    import {PlayersStore} from '@/stores/players'
    import { useRouter } from 'vue-router'
    const playersStore=PlayersStore()
    const router=useRouter()

    //次のページへ
    const next=()=>{
        router.push('/time')
    }
</script>

<template>
    <header class="row">
        <button class="btn btn-outline-info col-1 offset-11" @click="next">時間計測　》</button>
    </header>
    <h2>選手情報</h2>
    <table>
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
            <tr v-for="player in playersStore.players_master">
                <th v-text="player.ck" style="padding: 10px"></th>
                <td>
                    <input class="form-control" type="text" maxlength="7" v-model="player.name" style="width:170px" :disabled="!player.available">
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
        選手名：７文字以内　（必須）<br/>
        学　年：３文字以内　（任意）<br/>
        所　属：６文字以内　（任意）
    </p>
</template>

<style scoped>
    p{
        margin-left:130px;
    }
</style>
