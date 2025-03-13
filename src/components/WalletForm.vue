<template>
  <div class="wallet-form-container">
    <h1 class="text-3xl font-bold mb-4">Wallet</h1>
    <h2 class="text-lg mb-6">Add a new crypto</h2>

    <form @submit.prevent="submitCrypto" class="wallet-form">
      <label class="form-label">Select cryptocurrency:</label>
      <select v-model="newCrypto.id" required class="form-input">
        <option v-for="crypto in cryptoPricesStore.currentPrices" :key="crypto.id" :value="crypto.id">
          {{ crypto.name }} ({{ crypto.symbol }})
        </option>
      </select>

      <label class="form-label">Amount:</label>
      <input type="number" v-model="newCrypto.amount" min="0.01" step="0.01" required class="form-input" />

      <label class="form-label">Purchase price:</label>
      <input type="number" v-model="newCrypto.price" min="0.01" step="0.01" required class="form-input" />

      <label class="form-label">Notes:</label>
      <textarea v-model="newCrypto.notes" class="form-textarea"></textarea>

      <button class="form-button">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['cryptoPricesStore'],
  data() {
    return {
      newCrypto: { id: '', amount: 0, price: 0, notes: '' },
    }
  },
  methods: {
    submitCrypto() {
      if (!this.newCrypto.id || this.newCrypto.amount <= 0 || this.newCrypto.price <= 0) {
        alert('Please fill in all fields correctly.')
        return
      }

      let cryptoName = this.newCrypto.id
      let cryptoSymbol = this.newCrypto.id
      for (const crypto of this.cryptoPricesStore.currentPrices) {
        if (crypto.id === this.newCrypto.id) {
          cryptoName = crypto.name
          cryptoSymbol = crypto.symbol
          break
        }
      }

      this.$emit('crypto-added', {
        id: this.newCrypto.id,
        name: cryptoName,
        symbol: cryptoSymbol,
        amount: this.newCrypto.amount,
        price: this.newCrypto.price,
        notes: this.newCrypto.notes,
        date: new Date().toLocaleDateString(),
      })
      this.newCrypto = { id: '', amount: 0, price: 0, notes: '' }
    },
  },
}
</script>

<style>
  .wallet-form-container {
    width: 100%;
    max-width: 450px;
  }

  .wallet-form {
    background-color: black;
    border-radius: 10px;
    border: 1px solid gray;
    padding: 16px;
  }

  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .form-input {
    width: 100%;
    padding: 8px;
    background: dimgrey;
    color: white;
    border: 1px solid gray;
    border-radius: 5px;
    margin-bottom: 16px;
  }

  .form-textarea {
    width: 100%;
    padding: 8px;
    background: dimgrey;
    color: white;
    border: 1px solid gray;
    border-radius: 5px;
    resize: none;
    margin-bottom: 16px;
  }

  .form-button {
    width: 100%;
    margin-top: 8px;
    padding: 12px;
    background-color: #facc15;
    color: black;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
  }

  .form-button:hover {
    background-color: #fcd34d;
  }
</style>
