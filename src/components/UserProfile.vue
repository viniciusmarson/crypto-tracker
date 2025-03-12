<script setup lang="ts">
import type { PropType } from 'vue'
import type { User } from '@/types/user'

defineProps({
  userInfo: {
    type: Object as PropType<User>,
    required: true,
  },
})
</script>

<template>
  <div class="profile-container">
    <h2 class="profile-title">PROFILE INFORMATION</h2>
    <div class="profile-details">
      <div class="profile-item">
        <span class="profile-label">Name:</span>
        <span class="profile-value">{{ userInfo.name }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Email:</span>
        <span class="profile-value">{{ userInfo.email }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Address:</span>
        <span class="profile-value">{{ userInfo.address }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Country:</span>
        <span class="profile-value">{{ userInfo.country }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Phone:</span>
        <span class="profile-value">{{ userInfo.phone }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Currency:</span>
        <span class="profile-value">{{ userInfo.currency }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Age:</span>
        <span class="profile-value">{{ userInfo.age }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  max-width: 600px;
  height: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #2d2d2d;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #3d3d3d;
  border-radius: 5px;
}

.profile-label {
  font-weight: bold;
  color: #ffffff;
}

.profile-value {
  color: #bdc3c7;
}
</style>
