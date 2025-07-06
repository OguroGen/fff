import { defineStore } from 'pinia'

export const useSettingStore = defineStore('SettingStore',{
  state: () => ({
    startButtonCaption:'START',
    lastPlayerCountdown:false,
    lastLimitTime:5,
    silentMode:false,
    limitMode:false,
    limitMin:1,
    limitSec:0,
    inputMode:'point' // 'point' or 'correctWrong'
  }),
  getters: {
  },
  actions: {
  }
})
