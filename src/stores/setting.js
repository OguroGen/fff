import { defineStore } from 'pinia'

export const SettingStore = defineStore('SettingStore',{
  state: () => ({
    startButtonCaption:'START',
    lastPlayerCountdown:false,
    lastLimitTime:5
  }),
  getters: {
  },
  actions: {
  }
})
