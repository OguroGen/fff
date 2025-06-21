import { defineStore } from 'pinia'

export const SettingStore = defineStore('SettingStore',{
  state: () => ({
    startButtonCaption:'START',
    lastPlayerCountdown:false,
    lastLimitTime:5,
    silentMode:false,
    limitMode:false,
    limitMin:1,
    limitSec:0
  }),
  getters: {
  },
  actions: {
  }
})
