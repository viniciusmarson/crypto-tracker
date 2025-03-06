<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'

const router = useRouter()
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const logout = async () => {
  await authService.logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <div class="container mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img class="h-10 w-auto" src="../assets/crypto.png" alt="Crypto Tracker" />
        <h1 class="text-2xl font-bold">
          <RouterLink to="/">Crypto Tracker</RouterLink>
        </h1>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <!-- Navigation Menu -->
      <nav
        :class="menuOpen ? 'block' : 'hidden'"
        class="absolute top-16 left-0 w-full bg-gray-900 md:static md:block md:w-auto"
      >
        <ul class="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
          <li>
            <RouterLink
              to="/"
              class="block px-4 py-2 md:px-0 hover:bg-blue-700 md:hover:bg-transparent md:hover:text-yellow-500"
              @click="closeMenu"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/wallet"
              class="block px-4 py-2 md:px-0 hover:bg-blue-700 md:hover:bg-transparent md:hover:text-yellow-500"
              @click="closeMenu"
            >
              Wallet
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/profile"
              class="block px-4 py-2 md:px-0 hover:bg-blue-700 md:hover:bg-transparent md:hover:text-yellow-500"
              @click="closeMenu"
            >
              Profile
            </RouterLink>
          </li>
          <li>
            <a
              id="logout-button"
              href="#"
              class="block px-4 py-2 md:px-0 text-red-400 hover:bg-blue-700 md:hover:bg-transparent md:hover:text-red-600"
              @click="logout"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
