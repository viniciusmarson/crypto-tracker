import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCryptoStore = defineStore('crypto', () => {
  const lastNews = ref<string[]>([])
  const lastPrices = ref<number[]>([])

  return { lastNews, lastPrices }
})
