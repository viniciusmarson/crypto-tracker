<script>
import WalletForm from '@/components/WalletForm.vue';
import { WalletService } from '@/services/wallet';
import { useCryptoPricesStore } from '@/stores/crypto';

export default {
  components: {
    WalletForm
  },

  data() {
    return {
      walletService: new WalletService(),
      cryptoPricesStore: useCryptoPricesStore(),
      userId: 'user',
      userCryptoData: [],
      totalMarketValue: 0,
      totalTransactionValue: 0,
      totalWallet: 0,
      cryptoPricesObject: {}
    }
  },

  methods: {
    loadUserCryptoData() {
      const data = this.walletService.getUserCryptoData(this.userId)
      this.userCryptoData = data
      this.updateCryptoPricesObject()
      this.calculateTotalMarketValue()
      this.calculateTotalTransactionValue()
    },

    updateCryptoPricesObject() {
      const pricesObject = {};
      for (const crypto of this.cryptoPricesStore.currentPrices) {
        pricesObject[crypto.id] = crypto.current_price;
      }
      this.cryptoPricesObject = pricesObject;
    },

    calculateTotalTransactionValue() {
      let total = 0;
      
      for (const userCrypto of this.userCryptoData) {
        total += userCrypto.amount * userCrypto.price;
      }
      this.totalTransactionValue = total;
    },

    calculateTotalMarketValue() {
      let total = 0;
      for (const userCrypto of this.userCryptoData) {
        const currentPrice = this.cryptoPricesObject[userCrypto.id];

        if (currentPrice) {
          total += userCrypto.amount * currentPrice;
        }
      }
      this.totalMarketValue = total;
    },

    calculateTotalWallet() {
      this.totalWallet = this.totalMarketValue - this.totalTransactionValue;
    },

    getCurrentPrice(cryptoId) {
      if (this.cryptoPricesObject[cryptoId]) {
        return this.cryptoPricesObject[cryptoId].toFixed(2);
      } else {
        return 'Not Available';
      }
    },

    calculatePriceChange(crypto) {
      const currentPrice = this.getCurrentPrice(crypto.id);
      if (currentPrice === 'Not Available') return '0';

      const change = ((currentPrice - crypto.price) / crypto.price) * 100;
      return change.toFixed(2);
    },

    getChangeColor(crypto) {
    const changeColor = this.calculatePriceChange(crypto);
      if (changeColor >= 0) {
        return 'color: green;';
      } else {
        return 'color: red;';
      }
    },

    getTotalWalletColor() {
      if (this.totalWallet >= 0) {
        return 'color: green;';
      } else {
        return 'color: red;';
      }
    },

    addCrypto(newCrypto) {
      this.userCryptoData.push(newCrypto);
      this.walletService.saveUserCryptoData(this.userId, this.userCryptoData);
      this.calculateTotalMarketValue();
      this.calculateTotalTransactionValue();
      this.calculateTotalWallet();
    }
  },
  mounted() {
    this.loadUserCryptoData();
    this.updateCryptoPricesObject();
    this.calculateTotalTransactionValue();
    this.calculateTotalMarketValue();
    this.calculateTotalWallet();
  }

};
</script>


<template>
  <div style="display: flex; flex-direction: column; align-items: center; color: white; min-height: 100vh; padding: 24px; margin-top: 50px;">
    
    <div style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center; width: 100%; max-width: 1200px; gap: 20px;">

      <div style="width: 100%; max-width: 450px;">
        <WalletForm :cryptoPricesStore="cryptoPricesStore" @crypto-added="addCrypto" />
      </div>

      <div style="width: 100%; max-width: 700px; display: flex; flex-direction: column; gap: 20px;">
        <div style="background-color: black; border-radius: 10px; border: 1px solid gray; text-align: center; padding: 16px;">
          <p style="font-size: 20px; font-weight: bold;">Invested: ${{ totalTransactionValue }}</p>
          <p style="font-size: 20px; font-weight: bold;">Current: ${{ totalMarketValue }}</p>
          <p :style="getTotalWalletColor()" style="font-size: 20px; font-weight: bold;">Total Wallet: ${{ totalWallet }}</p>
        </div>

        <div>
          <h2 class="text-lg mb-4">Transaction History</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: center; background-color: black;">
            <thead>
              <tr style="background-color: black; color: white;">
                <th style="padding: 8px;">Cryptocurrency</th>
                <th style="padding: 8px;">Amount</th>
                <th style="padding: 8px;">Total (USD)</th>
                <th style="padding: 8px;">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="crypto in userCryptoData" :key="crypto.id" style="border-bottom: 1px solid gray;">
                <td style="padding: 8px;">{{ crypto.name }} ({{ crypto.symbol }})</td>
                <td style="padding: 8px;">{{ crypto.amount }}</td>
                <td style="padding: 8px;">${{ (crypto.amount * crypto.price).toFixed(2) }}</td>
                <td style="padding: 8px;">{{ crypto.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 class="text-lg mb-4">Current Value</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: center; background-color: black;">
            <thead>
              <tr style="background-color: black; color: white;">
                <th style="padding: 8px;">Cryptocoin</th>
                <th style="padding: 8px;">Updated</th>
                <th style="padding: 8px;">Change (%)</th>
                <th style="padding: 8px;">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="crypto in userCryptoData" :key="crypto.id" style="border-bottom: 1px solid gray;">
                <td style="padding: 8px;">{{ crypto.name }} ({{ crypto.symbol }})</td>
                <td style="padding: 8px;">{{ cryptoPricesStore.lastUpdated }}</td>
                <td :style="getChangeColor(crypto)" style="padding: 8px;">{{ calculatePriceChange(crypto) }}%</td>
                <td style="padding: 8px;">${{ getCurrentPrice(crypto.id) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>