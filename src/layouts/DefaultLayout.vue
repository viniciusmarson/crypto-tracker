<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import cryptoService from '@/services/crypto'
import { useCryptoPricesStore } from '@/stores/crypto'
import ApplicationHeader from '@/components/ApplicationHeader.vue'

const cryptoPricesStore = useCryptoPricesStore()

const fetchCryptoPricesToday = async () => {
  try {
    cryptoPricesStore.loading = true
    cryptoPricesStore.currentPrices = await cryptoService.getCryptoData()
    cryptoPricesStore.lastUpdated = new Date().toLocaleTimeString()
  } catch (err) {
    cryptoPricesStore.error = 'Error fetching cryptocurrency prices.'
    console.error('Error fetching cryptocurrency prices:', err)
  } finally {
    cryptoPricesStore.loading = false
  }
}

onMounted(() => {
  fetchCryptoPricesToday()
  setInterval(fetchCryptoPricesToday, 3600000) // Fetch every 1 minute
})
</script>

<template>
  <div class="bg-gray-900 text-white">
    <ApplicationHeader />
    <RouterView />
  </div>
</template>
