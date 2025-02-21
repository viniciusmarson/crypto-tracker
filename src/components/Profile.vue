<script lang="ts">
export default {
  name: 'ProfileComponent',
  props: {
    email: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <h3>{{ email }}</h3>
</template>
