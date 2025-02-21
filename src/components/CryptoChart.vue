<script lang="ts">
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

// Register Chart.js components
Chart.register(...registerables)

export default {
  components: { LineChart },
  props: {
    coinId: { type: String, required: true }, // Accepts coin ID (e.g., 'bitcoin', 'ethereum')
    coinName: { type: String, required: true },
  },
  setup(props) {
    const chartData = ref(null)
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
    })

    const error = ref(null)
    const loading = ref(false)

    const fetchPriceHistory = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${props.coinId}/market_chart?vs_currency=usd&days=7`,
        )

        const data = response.data

        // Extract timestamps and prices
        const labels = data.prices.map((entry) => new Date(entry[0]).toLocaleDateString())
        const prices = data.prices.map((entry) => entry[1])

        // Set chart data
        chartData.value = {
          labels,
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              borderColor: '#facc15', // Yellow color
              backgroundColor: 'rgba(250, 204, 21, 0.2)',
              fill: true,
            },
          ],
        }

        loading.value = false
      } catch (err) {
        console.error(err)
        error.value = 'Failed to fetch price data'
        loading.value = false
      }
    }

    onMounted(fetchPriceHistory)

    // Watch for changes in props.coinId and refetch data
    watch(() => props.coinId, fetchPriceHistory)

    return { chartData, chartOptions, loading, error }
  },
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-bold text-center mb-4">Price History of {{ coinName }}</h2>

    <LineChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />

    <p v-if="loading" class="text-center text-gray-400">Loading chart...</p>
    <p v-if="error" class="text-center text-red-500">{{ error }}</p>
  </div>
</template>
