import { defineStore } from 'pinia'

export const usePlayersStore = defineStore('PlayersStore',{
  state: () => ({
    playersMaster:[
      {keyCode:'KeyA',name:'選手A',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyB',name:'選手B',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyC',name:'選手C',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyD',name:'選手D',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyE',name:'選手E',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyF',name:'選手F',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyG',name:'選手G',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyH',name:'選手H',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyI',name:'選手I',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0},
      {keyCode:'KeyJ',name:'選手J',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0}
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
      })
    }
  }
})
