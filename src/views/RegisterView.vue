<script lang="ts">
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'

export default {
  data() {
    return {
      // TODO: Alex - Add the rest of the fields
      formData: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    async handleSubmit() {
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Passwords not match!')
      }

      try {
        await authService.register({
          email: this.formData.email,
          password: this.formData.password,
          // TODO: get the rest of the fields from the user
          name: '',
          address: '',
          country: '',
          phone: '',
          currency: '',
        })
        return this.$router.push('/login')
      } catch (error) {
        console.error(error)
        alert('Unexpected error')
      }
    },
  },
  setup() {
    const router = useRouter()

    if (localStorage.getItem('userToken')) {
      router.push('/home')
    }

    return {}
  },
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="../assets/crypto.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
        Create your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-white">Email address</label>
          <div class="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="formData.email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-white">Password</label>
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              v-model="formData.password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="confirmPassword" class="block text-sm/6 font-medium text-white"
              >Confirm your password</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autocomplete="Confirm your password"
              v-model="formData.confirmPassword"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <!-- TODO: Alex - Add the rest of the fields -->

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Already have an account?
        {{ ' ' }}
        <a href="/login" class="font-semibold text-yellow-600 hover:text-yellow-500">Login</a>
      </p>
    </div>
  </div>
</template>
