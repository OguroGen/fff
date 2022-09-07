import { defineStore } from 'pinia'

export const PlayersStore = defineStore('PlayersStore',{
  state: () => ({
    players_master:[
      {ck:'KeyA',name:'userA',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true},
      {ck:'KeyB',name:'userB',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true},
      {ck:'KeyC',name:'userC',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true},
      {ck:'KeyD',name:'userD',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true},
      {ck:'KeyE',name:'userE',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true},
      {ck:'KeyF',name:'userF',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false},
      {ck:'KeyG',name:'userG',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false},
      {ck:'KeyH',name:'userH',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false},
      {ck:'KeyI',name:'userI',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false},
      {ck:'KeyJ',name:'userJ',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false}
    ],
    startButtonCaption:'START'
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
      })
    }
  }
})
