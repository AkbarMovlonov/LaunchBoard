import { defineStore } from 'pinia'
import { fetchLaunches } from '@/api/launches'

export const useLaunchesStore = defineStore('launches', {
  state: () => ({
    launches: [],
    isLoading: false,
    error: null,
    activeCategoryKey: null,
  }),
  getters: {
    allCategories(state) {
      const uniqueCategories = new Map()
      state.launches.forEach((launch) => {
        launch.categories.forEach((category) => {
          if (!uniqueCategories.has(category.key)) {
            uniqueCategories.set(category.key, category)
          }
        })
      })
      return Array.from(uniqueCategories.values())
    },
    filteredLaunches(state) {
      if (!state.activeCategoryKey) return state.launches
      return state.launches.filter((launch) =>
        launch.categories.some((c) => c.key === state.activeCategoryKey),
      )
    },
  },
  actions: {
    async loadLaunches() {
      this.isLoading = true
      this.error = null
      try {
        this.launches = await fetchLaunches()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    clearLaunches() {
      this.launches = []
    },
    toggleCategory(key) {
      this.activeCategoryKey = this.activeCategoryKey === key ? null : key
    },
  },
})
