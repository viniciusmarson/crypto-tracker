<script lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import CryptoGPT from '@/components/CryptoGPT.vue'
import CryptoNews from '@/components/CryptoNews.vue'
import CryptoChart from '@/components/CryptoChart.vue'

export default {
  setup() {
    const coins = ref([])
    const lastUpdated = ref('')
    const selectedCoin = ref(null)

    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
        )
        const data = response.data
        coins.value = data
        lastUpdated.value = new Date().toLocaleTimeString()
      } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error)
      }
    }

    onMounted(() => {
      fetchCryptoPrices()
      setInterval(fetchCryptoPrices, 3600000) // Fetch every 1 minute
    })

    const selectCoin = (coin) => {
      selectedCoin.value = coin
    }

    return {
      coins,
      lastUpdated,
      selectedCoin,
      selectCoin,
    }
  },
  components: { CryptoChart, CryptoNews, CryptoGPT },
}
</script>

<template>
  <div class="flex flex-col p-10 justify-center gap-2 md:flex-row">
    <div class="flex flex-col p-6 gap-4">
      <div
        v-for="coin in coins"
        :key="coin.id"
        class="flex items-center justify-between py-2 gap-12 hover:bg-gray-800 rounded-lg cursor-pointer"
        @click="selectCoin(coin)"
      >
        <div class="flex items-center space-x-2">
          <img :src="coin.image" alt="coin symbol" class="h-6 w-6" />
          <p class="text-lg font-semibold">{{ coin.name }} ({{ coin.symbol.toUpperCase() }})</p>
        </div>
        <p class="text-lg font-semibold">${{ coin.current_price.toLocaleString() }}</p>
      </div>

      <p class="text-gray-400 text-sm text-center mt-2">Last updated: {{ lastUpdated }}</p>
    </div>

    <div class="flex flex-col gap-4">
      <CryptoChart v-if="selectedCoin" :coinId="selectedCoin.id" :coinName="selectedCoin.name" />
      <CryptoNews v-if="selectedCoin" :coinName="selectedCoin.name" />
    </div>

    <CryptoGPT v-if="selectedCoin" />
  </div>
</template>
