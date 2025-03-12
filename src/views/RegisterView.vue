<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'

const router = useRouter()

if (localStorage.getItem('userToken')) {
  router.push('/')
}

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  address: '',
  country: '',
  phone: '',
  currency: '',
  age: '',
})

const handleSubmit = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  try {
    await authService.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
      address: formData.value.address,
      country: formData.value.country,
      phone: formData.value.phone,
      currency: formData.value.currency,
      age: parseInt(formData.value.age, 10),
    })
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('Unexpected error')
  }
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

        <div>
          <label for="name" class="block text-sm/6 font-medium text-white">Name</label>
          <div class="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              v-model="formData.name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <div>
          <label for="address" class="block text-sm/6 font-medium text-white">Address</label>
          <div class="mt-2">
            <input
              type="text"
              name="address"
              id="address"
              v-model="formData.address"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <div>
          <label for="country" class="block text-sm/6 font-medium text-white">Country</label>
          <div class="mt-2">
            <input
              type="text"
              name="country"
              id="country"
              v-model="formData.country"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <div>
          <label for="phone" class="block text-sm/6 font-medium text-white">Phone</label>
          <div class="mt-2">
            <input
              type="text"
              name="phone"
              id="phone"
              v-model="formData.phone"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <div>
          <label for="currency" class="block text-sm/6 font-medium text-white">Currency</label>
          <div class="mt-2">
            <input
              type="text"
              name="currency"
              id="currency"
              v-model="formData.currency"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <div>
          <label for="age" class="block text-sm/6 font-medium text-white">Age</label>
          <div class="mt-2">
            <input
              type="number"
              name="age"
              id="age"
              v-model="formData.age"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6"
              required
            />
          </div>
        </div>

        <div>
          <button
            id="register-button"
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
