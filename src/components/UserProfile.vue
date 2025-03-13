<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { User } from '@/types/user'
import { authService } from '@/services/auth'

const props = defineProps({
  userInfo: {
    type: Object as PropType<User>,
    required: true,
  },
})

const formData = ref({ ...props.userInfo })
const hasChanges = ref(false)


const handleSubmit = () => {
  authService.updateUserInfo(formData.value)
  alert('Profile updated successfully!')
  hasChanges.value = false
}

const currencies = ['Euro', 'Dollar', 'Pound', 'Yen', 'Rupee']

const editableFields = ref({
  name: false,
  address: false,
  country: false,
  phone: false,
  currency: false,
  age: false,
})

const toggleEditable = (field: keyof typeof editableFields.value) => {
  editableFields.value[field] = !editableFields.value[field]
}

// Watch for changes in formData to set hasChanges to true
watch(formData, () => {
  hasChanges.value = true
}, { deep: true })
</script>

<template>
  <div class="profile-container">
    <h2 class="profile-title">Profile Information</h2>
    <form @submit.prevent="handleSubmit" class="profile-details">
      <div class="profile-item">
        <label class="profile-label" for="name">Name:</label>
        <div class="input-container">
          <input id="name" v-model="formData.name" :readonly="!editableFields.name" class="profile-value" />
          <button type="button" @click="toggleEditable('name')" class="edit-button">
            {{ editableFields.name ? 'Lock' : 'Edit' }}
          </button>
        </div>
      </div>
      <div class="profile-item">
  <label class="profile-label" for="email">Email:</label>
  <div class="input-container">
    <input id="email" v-model="formData.email" readonly class="profile-value email-field" />
    <span class="lock-icon">&#x1F512;</span>
  </div>
</div>
      <div class="profile-item">
        <label class="profile-label" for="address">Address:</label>
        <div class="input-container">
          <input id="address" v-model="formData.address" :readonly="!editableFields.address" class="profile-value" />
          <button type="button" @click="toggleEditable('address')" class="edit-button">
            {{ editableFields.address ? 'Lock' : 'Edit' }}
          </button>
        </div>
      </div>
      <div class="profile-item">
        <label class="profile-label" for="country">Country:</label>
        <div class="input-container">
          <input id="country" v-model="formData.country" :readonly="!editableFields.country" class="profile-value" />
          <button type="button" @click="toggleEditable('country')" class="edit-button">
            {{ editableFields.country ? 'Lock' : 'Edit' }}
          </button>
        </div>
      </div>
      <div class="profile-item">
        <label class="profile-label" for="phone">Phone:</label>
        <div class="input-container">
          <input id="phone" v-model="formData.phone" :readonly="!editableFields.phone" class="profile-value" />
          <button type="button" @click="toggleEditable('phone')" class="edit-button">
            {{ editableFields.phone ? 'Lock' : 'Edit' }}
          </button>
        </div>
      </div>
      <div class="profile-item">
        <label class="profile-label" for="currency">Currency:</label>
        <div class="input-container">
          <select id="currency" v-model="formData.currency" :disabled="!editableFields.currency" class="profile-value">
            <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
          </select>
          <button type="button" @click="toggleEditable('currency')" class="edit-button">
            {{ editableFields.currency ? 'Lock' : 'Edit' }}
          </button>
        </div>
      </div>
      <div class="profile-item">
        <label class="profile-label" for="age">Age:</label>
        <div class="input-container">
          <input id="age" type="number" v-model="formData.age" :readonly="!editableFields.age" class="profile-value" />
          <button type="button" @click="toggleEditable('age')" class="edit-button">
            {{ editableFields.age ? 'Lock' : 'Edit' }}
          </button>
        </div>
      </div>
      <button type="submit" :disabled="!hasChanges" :class="{ 'update-button': true, 'update-button-disabled': !hasChanges }">Update Profile</button>
    </form>
  </div>
</template>

<style scoped>
.profile-container {
  width: 30%;
  margin: 0 auto;
  padding: 20px;
  background-color: #2d2d2d;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 150vh;
}

.profile-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: whitesmoke;
  margin-bottom: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.profile-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.profile-label {
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
}

.profile-value {
  padding: 10px;
  color: #bdc3c7;
  background-color: #3d3d3d;
  border: 1px solid #555;
  border-radius: 5px;
  outline: none;
}

.profile-value:focus {
  border-color: #f1c40f;
}

.password-container {
  /* display: flex; */
  align-items: center;
}

.input-container {
  display: flex;
  align-items: center;
  position: relative;

}



.lock-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  color: #bdc3c7;
  cursor: pointer;
}

.toggle-password-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f1c40f;
  color: #2d2d2d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.toggle-password-button:hover {
  background-color: #e1b30f;
}

.edit-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #2980b9;
}

.update-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #f1c40f;
  color: #2d2d2d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.update-button-disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.update-button:hover {
  background-color: #e1b30f;
}


</style>