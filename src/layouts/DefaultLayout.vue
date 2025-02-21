<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="bg-gray-900 text-white">
    <Header />
    <RouterView />
  </div>
</template>
