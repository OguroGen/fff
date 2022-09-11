import { defineStore } from 'pinia'

export const SettingStore = defineStore('SettingStore',{
  state: () => ({
    startButtonCaption:'START',
    lastPlayerCountdown:true
  }),
  getters: {
  },
  actions: {
  }
})
