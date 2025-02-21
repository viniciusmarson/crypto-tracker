<script lang="ts">
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'
import { useCryptoStore } from '@/stores/crypto'

export default {
  props: {
    coinName: { type: String, required: true }, // e.g., 'Bitcoin'
  },
  setup(props) {
    const news = ref([])
    const error = ref(null)
    const loading = ref(false)

    const cryptoStore = useCryptoStore()

    const API_KEY = 'pub_7098760315abb2ba18da32d1cdc3e694d2a31' // Replace with your actual API key

    const fetchNews = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: API_KEY,
            q: props.coinName, // Filter news by the coin name
            language: 'en',
            category: 'business',
          },
        })

        news.value = response.data.results || []

        cryptoStore.lastNews = news.value.map((article) => article.title)
      } catch (err) {
        console.error(err)
        error.value = 'Failed to fetch news. Try again later.'
      } finally {
        loading.value = false
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    // Fetch news when the component is mounted
    onMounted(fetchNews)

    // Watch for prop changes (if the selected coin changes, fetch news again)
    watch(() => props.coinName, fetchNews)

    return { news, loading, error, formatDate }
  },
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h2 class="text-xl font-bold text-center mb-4">Latest News for {{ coinName }}</h2>

    <div v-if="loading" class="text-center text-gray-400">Loading news...</div>
    <p v-if="error" class="text-center text-red-500">{{ error }}</p>

    <ul v-if="news.length" class="space-y-4">
      <li
        v-for="article in news"
        :key="article.link"
        class="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
      >
        <a
          :href="article.link"
          target="_blank"
          class="text-lg font-semibold text-yellow-400 hover:underline"
        >
          {{ article.title }}
        </a>
        <p class="text-gray-400 text-sm mt-1">
          {{ article.source_id }} - {{ formatDate(article.pubDate) }}
        </p>
      </li>
    </ul>

    <p v-else class="text-center text-gray-500">No news available for {{ coinName }}.</p>
  </div>
</template>
