<script setup lang="ts">
import { authService } from '@/services/auth'
import UserProfile from '@/components/UserProfile.vue'

const userInfo = authService.getUserInfo()
console.log(userInfo) 
</script>

<template>
  <main class="flex mt-10 justify-center h-screen">
    <!-- TODO: Alex - pass the rest of the fields to the ProfileComponent -->
    <UserProfile 
      :email="userInfo.email" 
      :password="userInfo.password"
      :address="userInfo.address" 
      :country="userInfo.country"
      :phone="userInfo.phone"
      :currency="userInfo.currency"
      :age="userInfo.age" 
    />
  </main>
</template>
