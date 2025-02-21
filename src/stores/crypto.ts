import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCryptoStore = defineStore('crypto', () => {
  const lastNews = ref([])
  const lastPrices = ref([])

  return { lastNews, lastPrices }
})
