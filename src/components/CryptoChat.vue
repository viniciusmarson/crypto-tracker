<script setup lang="ts">
import { ref, type PropType } from 'vue'

const { response, loading, error } = defineProps({
  response: {
    type: String as PropType<string>,
    required: false,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    required: false,
  },
  error: {
    type: String as PropType<string | null>,
    required: false,
  },
})

const emit = defineEmits<{
  (e: 'askQuestion', question: string): Promise<string>
}>()

const userQuestion = ref('')

const askGPT = async () => {
  emit('askQuestion', userQuestion.value)
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold text-center mb-4">Ask AI About This Data</h2>

    <textarea
      v-model="userQuestion"
      placeholder="Ask a question about the data..."
      class="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
    ></textarea>

    <button
      @click="askGPT"
      :disabled="loading || !userQuestion"
      class="w-full mt-4 p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
    >
      {{ loading ? 'Thinking...' : 'Ask our AI' }}
    </button>

    <p v-if="error" class="text-red-500 mt-2 text-center">{{ error }}</p>

    <div v-if="response" class="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 class="font-semibold text-yellow-400">AI Response:</h3>
      <p class="mt-2">{{ response }}</p>
    </div>
  </div>
</template>
