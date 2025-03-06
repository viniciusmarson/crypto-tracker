import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Coin } from '@/types/coin'

export const useCryptoPricesStore = defineStore('prices', () => {
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const currentPrices = ref<Coin[]>([])
  const lastUpdated = ref<string>('')
  const selectedCoin = ref<Coin | null>(null)

  return { currentPrices, lastUpdated, error, loading, selectedCoin }
})
