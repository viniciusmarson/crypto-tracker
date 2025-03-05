<script setup lang="ts">
import { type PropType } from 'vue'
import type { Coin } from '@/types/coin'

defineProps({
  coins: { type: Array as PropType<Coin[]>, required: true },
  selectCoin: { type: Function as PropType<(coin: Coin) => void>, required: true },
})
</script>

<template>
  <div class="flex flex-col p-6 gap-4">
    <div
      v-for="coin in coins"
      :key="coin.id"
      class="flex items-center justify-between py-2 gap-12 hover:bg-gray-800 rounded-lg cursor-pointer"
      @click="selectCoin(coin)"
    >
      <div class="flex items-center space-x-2">
        <img :src="coin.image" alt="coin symbol" class="h-6 w-6" />
        <p class="text-lg font-semibold" :id="coin.id">
          {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
        </p>
      </div>
      <p class="text-lg font-semibold">${{ coin.current_price.toLocaleString() }}</p>
    </div>
  </div>
</template>
