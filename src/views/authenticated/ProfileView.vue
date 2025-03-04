<script lang="ts">
import { authService } from '@/services/auth'
import ProfileComponent from '@/components/Profile.vue'

export default {
  setup() {
    const userInfo = authService.getUserInfo()
    return {
      userInfo,
    }
  },
  components: {
    ProfileComponent,
  },
}
</script>

<template>
  <main class="flex mt-10 justify-center h-screen">
    <!-- TODO: Alex - pass the rest of the fields to the ProfileComponent -->

    <ProfileComponent :name="userInfo.name" :email="userInfo.email" />
  </main>
</template>
