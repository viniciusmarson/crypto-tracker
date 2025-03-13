<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Wallet } from '@/types/wallet'
import { walletService } from '@/services/wallet'
import WalletForm from '@/components/WalletForm.vue'
import { useCryptoPricesStore } from '@/stores/crypto'

const cryptoPricesStore = useCryptoPricesStore()
const userId = 'user'
const userCryptoData = ref<Wallet[]>([])
const totalMarketValue = ref(0)
const totalTransactionValue = ref(0)
const diffWallet = ref(0)
const cryptoPricesMap = ref<Map<string, number>>(new Map())

const updateUserCryptoData = () => {
  userCryptoData.value = walletService.getUserCryptoData(userId)
}

const updateCryptoPricesMap = () => {
  cryptoPricesMap.value.clear()
  for (const crypto of cryptoPricesStore.currentPrices) {
    cryptoPricesMap.value.set(crypto.id, crypto.current_price)
  }
}

const calculateTotalTransactionValue = () => {
  let total = 0
  for (const userCrypto of userCryptoData.value) {
    total += userCrypto.amount * userCrypto.price
  }
  totalTransactionValue.value = total
}

const calculateTotalMarketValue = () => {
  let total = 0
  for (const userCrypto of userCryptoData.value) {
    const currentPrice = cryptoPricesMap.value.get(userCrypto.id)
    if (currentPrice) {
      total += userCrypto.amount * currentPrice
    }
  }
  totalMarketValue.value = total
}

const calculateTotalWallet = () => {
  diffWallet.value = totalMarketValue.value - totalTransactionValue.value
}

const getCurrentPrice = (cryptoId: string): number => {
  return cryptoPricesMap.value.get(cryptoId) || 0
}

const calculatePriceChange = (crypto: Wallet): number => {
  const currentPrice = getCurrentPrice(crypto.id)
  if (currentPrice === 0) return currentPrice

  const change = ((currentPrice - crypto.price) / crypto.price) * 100
  return change
}

const getChangeColor = (crypto: Wallet) => {
  const price = calculatePriceChange(crypto)
  return price >= 0 ? 'color: green;' : 'color: red;'
}

const getTotalWalletColor = () => {
  return diffWallet.value >= 0 ? 'color: green;' : 'color: red;'
}

const addCrypto = (newCrypto: Wallet) => {
  userCryptoData.value.push(newCrypto)
  walletService.saveUserCryptoData(userId, userCryptoData.value)
  calculateTotalMarketValue()
  calculateTotalTransactionValue()
  calculateTotalWallet()
}

onMounted(() => {
  updateCryptoPricesMap()
  updateUserCryptoData()
  calculateTotalMarketValue()
  calculateTotalTransactionValue()
  calculateTotalWallet()
})

watch(
  () => cryptoPricesStore.currentPrices,
  () => {
    updateCryptoPricesMap()
    calculateTotalMarketValue()
    calculateTotalTransactionValue()
    calculateTotalWallet()
    updateUserCryptoData()
  },
)
</script>

<template>
  <div class="wallet-container">
    <div class="wallet-content">
      <div class="wallet-form">
        <WalletForm :cryptoPricesStore="cryptoPricesStore" @crypto-added="addCrypto" />
      </div>

      <div class="wallet-details">
        <div class="wallet-summary">
          <p>Paid: ${{ totalTransactionValue }}</p>
          <p>Current: ${{ totalMarketValue }}</p>
          <p :style="getTotalWalletColor()">Difference: ${{ diffWallet }}</p>
        </div>

        <div>
          <h2 class="table-title">Transaction History</h2>
          <table class="wallet-table">
            <thead>
              <tr>
                <th>Crypto</th>
                <th>Amount</th>
                <th>Total (USD)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="crypto in userCryptoData" :key="crypto.id">
                <td>{{ crypto.name }} ({{ crypto.symbol }})</td>
                <td>{{ crypto.amount }}</td>
                <td>${{ (crypto.amount * crypto.price).toFixed(2) }}</td>
                <td>{{ crypto.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 class="table-title">Wallet</h2>
          <table class="wallet-table">
            <thead>
              <tr>
                <th>Crypto</th>
                <th>Change (%)</th>
                <th>Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="crypto in userCryptoData" :key="crypto.id">
                <td>{{ crypto.name }} ({{ crypto.symbol }})</td>
                <td :style="getChangeColor(crypto)">
                  {{ calculatePriceChange(crypto).toFixed(2) }}%
                </td>
                <td>${{ getCurrentPrice(crypto.id).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-center text-gray-400">Last updated: {{ cryptoPricesStore.lastUpdated }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.wallet-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  min-height: 100vh;
  padding: 24px;
  margin-top: 50px;
}

.wallet-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
}

.wallet-form {
  width: 100%;
  max-width: 450px;
}

.wallet-details {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wallet-summary {
  background-color: #090f1b;
  border-radius: 10px;
  border: 1px solid gray;
  text-align: center;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
}

.wallet-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  background-color: #090f1b;
  border-radius: 10px;
  border: 1px solid gray;
}

.wallet-table thead tr {
  background-color: #090f1b;
  color: white;
}

.wallet-table th,
.wallet-table td {
  padding: 8px;
}

.wallet-table tbody tr {
  border-bottom: 1px solid gray;
}

.table-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
</style>
