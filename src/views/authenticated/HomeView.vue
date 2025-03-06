<script setup lang="ts">
import type { New } from '@/types/new'
import type { Coin } from '@/types/coin'
import { ref, watch, onMounted } from 'vue'
import cryptoService from '@/services/crypto'
import CryptoGPT from '@/components/CryptoGPT.vue'
import CryptoList from '@/components/CryptoList.vue'
import CryptoNews from '@/components/CryptoNews.vue'
import CryptoChart from '@/components/CryptoChart.vue'
import { useCryptoPricesStore } from '@/stores/crypto'

// Handle screen loading and error messages
const loading = ref(false)
const error = ref<string | null>(null)

// Handle the crypto store
const cryptoPricesStore = useCryptoPricesStore()

// Handle the data for the chart, news and gpt
const news = ref<New[] | null>(null)
const priceHistory = ref<number[][] | null>(null)
const gptData = ref<string | null>(null)

const selectCoin = (coin: Coin) => {
  cryptoPricesStore.selectedCoin = coin
}

const loadTradingInfo = async (coin: Coin) => {
  try {
    loading.value = true

    const [priceHistoryResponse, newsResponse] = await Promise.all([
      cryptoService.getCryptoPriceHistory(coin.id),
      cryptoService.getCryptoNews(coin.name),
    ])

    news.value = newsResponse
    priceHistory.value = priceHistoryResponse

    const lastNewsTitle = newsResponse.map((article) => article.title)
    const lastPricesData = priceHistoryResponse.map((entry) => entry[1])

    gptData.value = `Last news: ${lastNewsTitle.join(', ')}\nLast prices: ${lastPricesData.join(', ')}`
    error.value = null
  } catch (err) {
    error.value = 'Failed to fetch data. Please try again.'
    console.error('Error fetching cryptocurrency prices:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (cryptoPricesStore.selectedCoin) {
    loadTradingInfo(cryptoPricesStore.selectedCoin)
  }
})

// Watch the selected coin and fetch the data for the chart and news
watch(
  () => cryptoPricesStore.selectedCoin,
  (newCoin) => {
    if (newCoin) {
      loadTradingInfo(newCoin)
    }
  },
)

// Watch the crypto prices and fetch the data for the chart and news
watch(cryptoPricesStore.currentPrices, (newPrices) => {
  if (newPrices && cryptoPricesStore.selectedCoin) {
    loadTradingInfo(cryptoPricesStore.selectedCoin)
  }
})
</script>

<template>
  <p v-if="loading || cryptoPricesStore.loading" class="text-center text-gray-400">
    Loading data...
  </p>

  <p v-if="error || cryptoPricesStore.error" class="text-center text-red-500">
    {{ error || cryptoPricesStore.error }}
  </p>

  <p v-if="!loading && !error" class="text-center text-gray-400">
    Last updated: {{ cryptoPricesStore.lastUpdated }}
  </p>

  <div class="flex flex-col p-10 justify-center gap-2 md:flex-row">
    <CryptoList :coins="cryptoPricesStore.currentPrices" :selectCoin="selectCoin" />

    <div v-if="cryptoPricesStore.selectedCoin" class="flex flex-col gap-4">
      <CryptoChart v-if="priceHistory" :data="priceHistory" />
      <CryptoNews v-if="news" :news="news" />
    </div>

    <CryptoGPT :data="gptData" v-if="gptData" />
  </div>
</template>
