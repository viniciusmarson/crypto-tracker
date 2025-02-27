<script lang="ts">
import { type PropType } from 'vue'
import type { New } from '@/types/new'
export default {
  props: {
    news: { type: Array as PropType<New[]>, required: true }, // e.g., 'Bitcoin'
  },
  setup() {
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString()
    }

    return { formatDate }
  },
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <h2 class="text-xl font-bold text-center mb-4">Latest News</h2>

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

    <p v-else class="text-center text-gray-500">No news available.</p>
  </div>
</template>
