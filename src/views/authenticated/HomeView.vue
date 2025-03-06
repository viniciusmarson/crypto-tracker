<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { New } from '@/types/new'
import type { Coin } from '@/types/coin'
import cryptoService from '@/services/crypto'
import CryptoGPT from '@/components/CryptoGPT.vue'
import CryptoList from '@/components/CryptoList.vue'
import CryptoNews from '@/components/CryptoNews.vue'
import CryptoChart from '@/components/CryptoChart.vue'
import { useCryptoPricesStore, useCryptoTradingInfoStore } from '@/stores/crypto'

// Handle screen loading and error messages
const loading = ref(false)
const error = ref<string | null>(null)

// Handle the crypto store
const cryptoPricesStore = useCryptoPricesStore()
const cryptoTradingInfoStore = useCryptoTradingInfoStore()

// Handle the data for the chart, news and gpt
const news = ref<New[] | null>(null)
const priceHistory = ref<number[][] | null>(null)

// Handle the selected coin
const selectedCoin = ref<Coin | null>(null)

const route = useRoute()

watch(cryptoPricesStore.currentPrices, () => {
  if (route.query.coin) {
    const coin = cryptoPricesStore.currentPrices.find((coin) => coin.id === route.query.coin)
    if (coin) {
      selectedCoin.value = coin
    }
  }
})

const selectCoin = (coin: Coin) => {
  selectedCoin.value = coin
}

const loadTradingInfo = async (coin: Coin) => {
  try {
    loading.value = true

    const [priceHistoryResponse, newsResponse] = await Promise.all([
      cryptoService.getCryptoPriceHistory(coin.id),
      cryptoService.getCryptoNews(coin.name),
    ])

    priceHistory.value = priceHistoryResponse
    news.value = newsResponse

    cryptoTradingInfoStore.lastPrices = priceHistoryResponse.map((entry) => entry[1])
    cryptoTradingInfoStore.lastNews = newsResponse.map((article) => article.title)
    error.value = null
  } catch (err) {
    error.value = 'Failed to fetch data. Please try again.'
    console.error('Error fetching cryptocurrency prices:', err)
  } finally {
    loading.value = false
  }
}

// Watch the selected coin and fetch the data for the chart and news
watch(selectedCoin, (newCoin) => {
  if (newCoin) {
    loadTradingInfo(newCoin)
  }
})

// Watch the crypto prices and fetch the data for the chart and news
watch(cryptoPricesStore.currentPrices, (newPrices) => {
  if (newPrices && selectedCoin.value) {
    loadTradingInfo(selectedCoin.value)
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

    <div v-if="selectedCoin" class="flex flex-col gap-4">
      <CryptoChart v-if="priceHistory" :data="priceHistory" />
      <CryptoNews v-if="news" :news="news" />
    </div>

    <CryptoGPT v-if="selectedCoin && priceHistory && news" />
  </div>
</template>
