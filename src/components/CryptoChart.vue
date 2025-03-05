<script setup lang="ts">
import { LineChart } from 'vue-chart-3'
import { Chart, registerables, type ChartData, type Point } from 'chart.js'
import { ref, watch, onMounted, type PropType } from 'vue'

// Register Chart.js components
Chart.register(...registerables)

const props = defineProps({
  data: { type: Array as PropType<number[][]>, required: true },
})

const loading = ref(false)
const error = ref<string | null>(null)

const chartData = ref<ChartData<'line', (number | Point | null)[], unknown> | null>(null)

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
})

const fetchPriceHistory = async () => {
  loading.value = true
  error.value = null

  try {
    // Extract timestamps and prices
    const labels = props.data.map((entry) => new Date(entry[0]).toLocaleTimeString())
    const prices = props.data.map((entry) => entry[1])

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
watch(() => props.data, fetchPriceHistory)
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-bold text-center mb-4">Price History</h2>

    <LineChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>
