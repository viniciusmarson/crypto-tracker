<script lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useCryptoStore } from '@/stores/crypto'

export default {
  setup() {
    const userQuestion = ref('')
    const response = ref('')
    const loading = ref(false)
    const error = ref(null)

    const cryptoStore = useCryptoStore()

    const gptData = `Last news: ${cryptoStore.lastNews.join(', ')}\nLast prices: ${cryptoStore.lastPrices.join(', ')}`
    console.log(gptData)

    const API_KEY =
      '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' // Replace with your OpenAI API key

    const askGPT = async () => {
      if (!userQuestion.value.trim()) {
        error.value = 'Please enter a question.'
        return
      }

      loading.value = true
      error.value = null
      response.value = ''

      try {
        const res = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: 'You are an AI assistant helping with data analysis.' },
              {
                role: 'user',
                content: `Here is the data on the screen:\n${gptData}\n\nUser question: ${userQuestion.value}`,
              },
            ],
            max_tokens: 200,
          },
          {
            headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
          },
        )

        response.value = res.data.choices[0].message.content
      } catch (err) {
        console.log(err)
        error.value = 'Failed to get a response. Please try again.'
      } finally {
        loading.value = false
      }
    }

    return { userQuestion, response, askGPT, loading, error }
  },
}
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-bold text-center mb-4">Ask GPT About This Data</h2>

    <textarea
      v-model="userQuestion"
      placeholder="Ask a question about the data..."
      class="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
    ></textarea>

    <button
      @click="askGPT"
      :disabled="loading"
      class="w-full mt-4 p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
    >
      {{ loading ? 'Thinking...' : 'Ask GPT' }}
    </button>

    <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>

    <div v-if="response" class="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 class="font-semibold text-yellow-400">GPT Response:</h3>
      <p class="mt-2">{{ response }}</p>
    </div>
  </div>
</template>
