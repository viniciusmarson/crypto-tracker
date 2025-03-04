<script lang="ts">
import { useRoute } from 'vue-router'
import type { New } from '@/types/new'
import type { Coin } from '@/types/coin'
import { ref, onMounted, watch } from 'vue'
import cryptoService from '@/services/crypto'
import { useCryptoStore } from '@/stores/crypto'
import CryptoGPT from '@/components/CryptoGPT.vue'
import CryptoList from '@/components/CryptoList.vue'
import CryptoNews from '@/components/CryptoNews.vue'
import CryptoChart from '@/components/CryptoChart.vue'

export default {
  setup() {
    // Handle screen loading and error messages
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Handle the data for the chart, news and gpt
    const lastUpdated = ref('')
    const coins = ref<Coin[]>([])
    const news = ref<New[] | null>(null)
    const priceHistory = ref<number[][] | null>(null)

    // Handle the selected coin
    const selectedCoin = ref<Coin | null>(null)

    // Handle the crypto store
    const cryptoStore = useCryptoStore()

    // Fetch the crypto prices today
    const fetchCryptoPricesToday = async () => {
      try {
        loading.value = true
        coins.value = await cryptoService.getCryptoData()
        lastUpdated.value = new Date().toLocaleTimeString()
        error.value = null
      } catch (err) {
        error.value = 'Failed to fetch data. Please try again.'
        console.error('Error fetching cryptocurrency prices:', err)
      } finally {
        loading.value = false
      }
    }

    const route = useRoute()

    onMounted(() => {
      fetchCryptoPricesToday()
      setInterval(fetchCryptoPricesToday, 3600000) // Fetch every 1 minute
    })

    watch(coins, () => {
      if (route.query.coin) {
        const coin = coins.value.find((coin) => coin.id === route.query.coin)
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

          cryptoStore.lastPrices = priceHistoryResponse.map((entry) => entry[1])
          cryptoStore.lastNews = newsResponse.map((article) => article.title)
          error.value = null
        } catch (err) {
          error.value = 'Failed to fetch data. Please try again.'
          console.error('Error fetching cryptocurrency prices:', err)
        } finally {
          loading.value = false
        }
      }
    })

    return {
      news,
      coins,
      priceHistory,
      lastUpdated,
      selectedCoin,
      selectCoin,
      loading,
      error,
    }
  },
  components: { CryptoList, CryptoChart, CryptoNews, CryptoGPT },
}
</script>

<template>
  <p v-if="loading" class="text-center text-gray-400">Loading data...</p>
  <p v-if="error" class="text-center text-red-500">{{ error }}</p>

  <div class="flex flex-col p-10 justify-center gap-2 md:flex-row">
    <CryptoList :coins="coins" :selectCoin="selectCoin" />

    <div v-if="selectedCoin" class="flex flex-col gap-4">
      <CryptoChart v-if="priceHistory" :data="priceHistory" />
      <CryptoNews v-if="news" :news="news" />
    </div>

    <CryptoGPT v-if="selectedCoin && priceHistory && news" />
  </div>
</template>
