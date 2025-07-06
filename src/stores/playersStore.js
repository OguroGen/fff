import { defineStore } from 'pinia'

export const usePlayersStore = defineStore('PlayersStore',{
  state: () => ({
    playersMaster:[
      {keyCode:'KeyA',name:'選手A',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyB',name:'選手B',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyC',name:'選手C',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyD',name:'選手D',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyE',name:'選手E',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyF',name:'選手F',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyG',name:'選手G',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyH',name:'選手H',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyI',name:'選手I',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false},
      {keyCode:'KeyJ',name:'選手J',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0,isCorrect:false}
    ]
  }),
  getters: {
    players(){
      return this.playersMaster.filter((player)=>player.available)
    },
    playersRanked(){
      this.playersMaster.forEach((player)=>{
        let r=(player.timeRank=='_')?0:10-player.timeRank
        player.rank=player.point+r.toString()
      })
      return JSON.parse(JSON.stringify(this.players)).sort((a,b)=>b.rank-a.rank)
    },
    playersTimeOrder(){
      return JSON.parse(JSON.stringify(this.players)).sort((a,b)=>{
        if(a.timeRank === '_' && b.timeRank === '_') return 0
        if(a.timeRank === '_') return 1
        if(b.timeRank === '_') return -1
        return a.timeRank - b.timeRank
      })
    },
    playersCorrectWrongRanked(){
      const players = JSON.parse(JSON.stringify(this.players))
      const correct = players.filter(p => p.isCorrect === true).sort((a,b) => {
        if(a.timeRank === '_' && b.timeRank === '_') return 0
        if(a.timeRank === '_') return 1
        if(b.timeRank === '_') return -1
        return a.timeRank - b.timeRank
      })
      const wrong = players.filter(p => p.isCorrect === false).sort((a,b) => {
        if(a.timeRank === '_' && b.timeRank === '_') return 0
        if(a.timeRank === '_') return 1
        if(b.timeRank === '_') return -1
        return a.timeRank - b.timeRank
      })
      
      // 順位を設定
      correct.forEach((player, index) => {
        player.rank = index + 1
      })
      wrong.forEach((player, index) => {
        player.rank = correct.length + index + 1
      })
      
      return [...correct, ...wrong]
    }
  },
  actions: {
    initialize() {
      this.playersMaster.forEach((player)=>{
        player.time=''
        player.timeRank=''
        player.point=''
        player.rank=''
        player.isRunning=false
        player.isLastPlayer=false
        player.isCorrect=false
      })
    }
  }
})
