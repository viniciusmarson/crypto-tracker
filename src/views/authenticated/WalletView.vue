<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Crypto } from '@/types/crypto'
import WalletForm from '@/components/WalletForm.vue'
import { walletService } from '@/services/wallet'
import { useCryptoPricesStore } from '@/stores/crypto'

const cryptoPricesStore = useCryptoPricesStore()
const userId = 'user'
const userCryptoData = ref<Crypto[]>([])
const totalMarketValue = ref(0)
const totalTransactionValue = ref(0)
const totalWallet = ref(0)
const cryptoPricesMap = ref<Map<string, number>>(new Map())

const updateUserCryptoData = () => {
  userCryptoData.value = walletService.getUserCryptoData(userId)
}

const updateCryptoPricesObject = () => {
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
  totalWallet.value = totalMarketValue.value - totalTransactionValue.value
}

const getCurrentPrice = (cryptoId: string): number => {
  return cryptoPricesMap.value.get(cryptoId) || 0
}

const calculatePriceChange = (crypto: Crypto): number => {
  const currentPrice = getCurrentPrice(crypto.id)
  if (currentPrice === 0) return currentPrice

  const change = ((currentPrice - crypto.price) / crypto.price) * 100
  return change
}

const getChangeColor = (crypto: Crypto) => {
  const price = calculatePriceChange(crypto)
  return price >= 0 ? 'color: green;' : 'color: red;'
}

const getTotalWalletColor = () => {
  return totalWallet.value >= 0 ? 'color: green;' : 'color: red;'
}

const addCrypto = (newCrypto: Crypto) => {
  userCryptoData.value.push(newCrypto)
  walletService.saveUserCryptoData(userId, userCryptoData.value)
  calculateTotalMarketValue()
  calculateTotalTransactionValue()
  calculateTotalWallet()
}

onMounted(() => {
  updateCryptoPricesObject()
  updateUserCryptoData()
  calculateTotalMarketValue()
  calculateTotalTransactionValue()
  calculateTotalWallet()
})

watch(
  () => cryptoPricesStore.currentPrices,
  () => {
    updateCryptoPricesObject()
    calculateTotalMarketValue()
    calculateTotalTransactionValue()
    calculateTotalWallet()
    updateUserCryptoData()
  },
)
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      min-height: 100vh;
      padding: 24px;
      margin-top: 50px;
    "
  >
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 1200px;
        gap: 20px;
      "
    >
      <div style="width: 100%; max-width: 450px">
        <WalletForm :cryptoPricesStore="cryptoPricesStore" @crypto-added="addCrypto" />
      </div>

      <div style="width: 100%; max-width: 700px; display: flex; flex-direction: column; gap: 20px">
        <div
          style="
            background-color: black;
            border-radius: 10px;
            border: 1px solid gray;
            text-align: center;
            padding: 16px;
          "
        >
          <p style="font-size: 20px; font-weight: bold">
            Transaction Value: ${{ totalTransactionValue }}
          </p>
          <p style="font-size: 20px; font-weight: bold">
            Total Market Value: ${{ totalMarketValue }}
          </p>
          <p :style="getTotalWalletColor()" style="font-size: 20px; font-weight: bold">
            Total Wallet: ${{ totalWallet }}
          </p>
        </div>

        <div>
          <h2 class="text-lg mb-4">Transaction History</h2>
          <table
            style="
              width: 100%;
              border-collapse: collapse;
              text-align: center;
              background-color: black;
            "
          >
            <thead>
              <tr style="background-color: black; color: white">
                <th style="padding: 8px">Cryptocurrency</th>
                <th style="padding: 8px">Amount</th>
                <th style="padding: 8px">Total (USD)</th>
                <th style="padding: 8px">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="crypto in userCryptoData"
                :key="crypto.id"
                style="border-bottom: 1px solid gray"
              >
                <td style="padding: 8px">{{ crypto.name }} ({{ crypto.symbol }})</td>
                <td style="padding: 8px">{{ crypto.amount }}</td>
                <td style="padding: 8px">${{ (crypto.amount * crypto.price).toFixed(2) }}</td>
                <td style="padding: 8px">{{ crypto.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 class="text-lg mb-4">Current Value</h2>
          <table
            style="
              width: 100%;
              border-collapse: collapse;
              text-align: center;
              background-color: black;
            "
          >
            <thead>
              <tr style="background-color: black; color: white">
                <th style="padding: 8px">Cryptocoin</th>
                <th style="padding: 8px">Updated</th>
                <th style="padding: 8px">Change (%)</th>
                <th style="padding: 8px">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="crypto in userCryptoData"
                :key="crypto.id"
                style="border-bottom: 1px solid gray"
              >
                <td style="padding: 8px">{{ crypto.name }} ({{ crypto.symbol }})</td>
                <td style="padding: 8px">{{ cryptoPricesStore.lastUpdated }}</td>
                <td :style="getChangeColor(crypto)" style="padding: 8px">
                  {{ calculatePriceChange(crypto).toFixed(2) }}%
                </td>
                <td style="padding: 8px">${{ getCurrentPrice(crypto.id).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
