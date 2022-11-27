import { defineStore } from 'pinia'

export const PlayersStore = defineStore('PlayersStore',{
  state: () => ({
    players_master:[
      {ck:'KeyA',name:'選手A',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyB',name:'選手B',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyC',name:'選手C',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyD',name:'選手D',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyE',name:'選手E',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyF',name:'選手F',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyG',name:'選手G',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyH',name:'選手H',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyI',name:'選手I',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0},
      {ck:'KeyJ',name:'選手J',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false,limitMin:5,limitSec:0}
    ]
  }),
  getters: {
    players(){
      return this.players_master.filter((e)=>e.available)
    },
    players_ranked(){
      this.players_master.forEach((e)=>{
        let r=(e.timeRank=='_')?0:10-e.timeRank
        e.rank=e.point+r.toString()
      })
      return JSON.parse(JSON.stringify(this.players)).sort((a,b)=>b.rank-a.rank)
    }
  },
  actions: {
    initialize() {
      this.players_master.forEach((e)=>{
        e.time=''
        e.timeRank=''
        e.point=''
        e.rank=''
        e.isRunning=false
        e.isLastPlayer=false
      })
    }
  }
})
