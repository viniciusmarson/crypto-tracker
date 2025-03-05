<script setup lang="ts">
import { authService } from '@/services/auth'
import ProfileComponent from '@/components/Profile.vue'

const userInfo = authService.getUserInfo()
</script>

<template>
  <main class="flex mt-10 justify-center h-screen">
    <!-- TODO: Alex - pass the rest of the fields to the ProfileComponent -->

    <ProfileComponent :name="userInfo.name" :email="userInfo.email" />
  </main>
</template>
