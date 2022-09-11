import { defineStore } from 'pinia'

export const PlayersStore = defineStore('PlayersStore',{
  state: () => ({
    players_master:[
      {ck:'KeyA',name:'userA',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false},
      {ck:'KeyB',name:'userB',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false},
      {ck:'KeyC',name:'userC',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false},
      {ck:'KeyD',name:'userD',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false},
      {ck:'KeyE',name:'userE',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:true,isLastPlayer:false},
      {ck:'KeyF',name:'userF',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false},
      {ck:'KeyG',name:'userG',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false},
      {ck:'KeyH',name:'userH',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false},
      {ck:'KeyI',name:'userI',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false},
      {ck:'KeyJ',name:'userJ',grade:'',school:'',time:'',timeRank:'',point:'',rank:'',isRunning:false,available:false,isLastPlayer:false}
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
