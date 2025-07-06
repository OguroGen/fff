import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/players',
      name: 'players',
      component: () => import('../views/PlayersView.vue')
    },
    {
      path: '/time',
      name: 'time',
      component: () => import('../views/TimeView.vue')
    },
    {
      path: '/point',
      name: 'point',
      component: () => import('../views/PointView.vue')
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: () => import('../views/RankingView.vue')
    },
    {
      path: '/correct-wrong-ranking',
      name: 'correct-wrong-ranking',
      component: () => import('../views/CorrectWrongRankingView.vue')
    },
    {
      path: '/stopwatch',
      name: 'stopwatch',
      component: () => import('../views/StopWatchView.vue')
    },
    {
      path: '/personaltimer',
      name: 'personaltimer',
      component: () => import('../views/PersonalTimerView.vue')
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: () => import('../views/ChangelogView.vue')
    }
  ]
})

export default router
