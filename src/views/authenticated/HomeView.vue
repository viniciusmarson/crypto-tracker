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

// Watch the selected coin and fetch the data for the chart, news and gpt
watch(selectedCoin, async (newCoin) => {
  if (newCoin) {
    try {
      loading.value = true

      const [priceHistoryResponse, newsResponse] = await Promise.all([
        cryptoService.getCryptoPriceHistory(newCoin.id),
        cryptoService.getCryptoNews(newCoin.name),
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
})
</script>

<template>
  <p v-if="loading || cryptoPricesStore.loading" class="text-center text-gray-400">
    Loading data...
  </p>
  <p v-if="error || cryptoPricesStore.error" class="text-center text-red-500">
    {{ error || cryptoPricesStore.error }}
  </p>

  <center>
    <p class="text-gray-400">Last updated: {{ cryptoPricesStore.lastUpdated }}</p>
  </center>

  <div class="flex flex-col p-10 justify-center gap-2 md:flex-row">
    <CryptoList :coins="cryptoPricesStore.currentPrices" :selectCoin="selectCoin" />

    <div v-if="selectedCoin" class="flex flex-col gap-4">
      <CryptoChart v-if="priceHistory" :data="priceHistory" />
      <CryptoNews v-if="news" :news="news" />
    </div>

    <CryptoGPT v-if="selectedCoin && priceHistory && news" />
  </div>
</template>
