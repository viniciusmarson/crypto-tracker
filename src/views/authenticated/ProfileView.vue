<script setup lang="ts">
import { authService } from '@/services/auth'
import UserProfile from '@/components/UserProfile.vue'

const userInfo = authService.getUserInfo()
</script>

<template>
  <main class="flex mt-10 justify-center h-screen">
    <UserProfile :userInfo="userInfo" />
  </main>
</template>
