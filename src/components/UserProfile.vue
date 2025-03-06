<script setup lang="ts">
defineProps({
  // TODO: Alex - Receive the rest of the fields
  email: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <!-- TODO: Alex - Display the rest of the fields -->
  <h3>{{ email }}</h3>
</template>
