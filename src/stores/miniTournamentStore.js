import { defineStore } from 'pinia'
import { generateProblems } from '@/utils/problemGenerator'

function defaultRankPoints(n) {
  const count = Math.max(0, Number(n) || 0)
  return Array.from({ length: count }, (_, i) => count - i)
}

function parseTime(value) {
  const n = Number(value)
  if (value === '_' || value === '' || value == null || !Number.isFinite(n)) {
    return Number.POSITIVE_INFINITY
  }
  return n
}

export const useMiniTournamentStore = defineStore('MiniTournamentStore', {
  state: () => ({
    phase: 'setup',
    problemType: 'multiply',
    mulDigitsA: 3,
    mulDigitsB: 3,
    divDivisorDigits: 3,
    divQuotientDigits: 4,
    abacusDigits: 2,
    abacusTerms: 5,
    abacusMode: 'addSub',
    problemCount: 5,
    totalRounds: 5,
    rankPoints: [],
    rankPointsPlayerCount: 0,
    currentRound: 0,
    problems: [],
    totals: {},
    paperScores: {},
    inputShow: false
  }),
  getters: {
    isLastRound(state) {
      return state.currentRound >= state.totalRounds
    }
  },
  actions: {
    syncRankPoints(playerCount) {
      const n = Number(playerCount) || 0
      if (n === this.rankPointsPlayerCount && this.rankPoints.length === n) {
        return
      }
      this.rankPoints = defaultRankPoints(n)
      this.rankPointsPlayerCount = n
    },
    resetSession() {
      this.phase = 'setup'
      this.currentRound = 0
      this.problems = []
      this.totals = {}
      this.paperScores = {}
      this.inputShow = false
    },
    startSession(players) {
      this.syncRankPoints(players.length)
      this.totals = Object.fromEntries(players.map((p) => [p.keyCode, 0]))
      this.currentRound = 1
      this.beginRound()
    },
    beginRound() {
      this.problems = generateProblems({
        problemType: this.problemType,
        mulDigitsA: this.mulDigitsA,
        mulDigitsB: this.mulDigitsB,
        divDivisorDigits: this.divDivisorDigits,
        divQuotientDigits: this.divQuotientDigits,
        abacusDigits: this.abacusDigits,
        abacusTerms: this.abacusTerms,
        abacusMode: this.abacusMode,
        problemCount: this.problemCount
      })
      this.paperScores = Object.fromEntries(
        Object.keys(this.totals).map((key) => [key, ''])
      )
      this.inputShow = false
      this.phase = 'play'
    },
    applyRoundScores(players) {
      const ranked = [...players].sort((a, b) => {
        const pa = Number(this.paperScores[a.keyCode]) || 0
        const pb = Number(this.paperScores[b.keyCode]) || 0
        if (pb !== pa) return pb - pa
        return parseTime(a.time) - parseTime(b.time)
      })
      ranked.forEach((player, i) => {
        const add = Number(this.rankPoints[i]) || 0
        this.totals[player.keyCode] = (this.totals[player.keyCode] || 0) + add
      })
    },
    nextRoundOrFinal() {
      if (this.currentRound >= this.totalRounds) {
        this.phase = 'final'
        return
      }
      this.currentRound += 1
      this.beginRound()
    }
  }
})
