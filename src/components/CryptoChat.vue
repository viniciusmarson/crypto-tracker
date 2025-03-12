<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'askQuestion', question: string): Promise<string>
}>()

const userQuestion = ref('')
const response = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const askGPT = async () => {
  if (!userQuestion.value.trim()) {
    error.value = 'Please enter a question.'
    return
  }

  loading.value = true
  error.value = null
  response.value = ''

  try {
    response.value = await emit('askQuestion', userQuestion.value)
  } catch (err) {
    console.log(err)
    error.value = 'Failed to get a response. Please try again.'
  } finally {
    loading.value = false
  }
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
