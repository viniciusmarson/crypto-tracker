<script setup lang="ts">
defineProps({
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
})
</script>
<!-- TODO: Alex - Display the rest of the fields -->
<template>
  <div class="profile-container">
    <h2 class="profile-title">PROFILE INFORMATION</h2>
    <div class="profile-details">
      
      <div class="profile-item">
        <span class="profile-label">Email:</span>
        <span class="profile-value">{{ email }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Address:</span>
        <span class="profile-value">{{ address }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Country:</span>
        <span class="profile-value">{{ country }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Phone:</span>
        <span class="profile-value">{{ phone }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Currency:</span>
        <span class="profile-value">{{ currency }}</span>
      </div>
      <div class="profile-item">
        <span class="profile-label">Age:</span>
        <span class="profile-value">{{ age }}</span>
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