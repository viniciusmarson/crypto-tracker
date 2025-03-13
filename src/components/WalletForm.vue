<template>
  <div style="width: 100%; max-width: 450px">
    <h1 class="text-3xl font-bold mb-4">Wallet</h1>
    <h2 class="text-lg mb-6">Add a new crypto</h2>

    <form
      @submit.prevent="submitCrypto"
      style="background-color: black; border-radius: 10px; border: 1px solid gray; padding: 16px"
    >
      <label class="block mb-2 font-semibold">Select cryptocurrency:</label>
      <select
        v-model="newCrypto.id"
        required
        style="
          width: 100%;
          padding: 8px;
          background: dimgrey;
          color: white;
          border: 1px solid gray;
          border-radius: 5px;
          margin-bottom: 16px;
        "
      >
        <option
          v-for="crypto in cryptoPricesStore.currentPrices"
          :key="crypto.id"
          :value="crypto.id"
        >
          {{ crypto.name }} ({{ crypto.symbol }})
        </option>
      </select>

      <label class="block mb-2 font-semibold">Amount:</label>
      <input
        type="number"
        v-model="newCrypto.amount"
        min="0.01"
        step="0.01"
        required
        style="
          width: 100%;
          padding: 8px;
          background: dimgrey;
          color: white;
          border: 1px solid gray;
          border-radius: 5px;
          margin-bottom: 16px;
        "
      />

      <label class="block mb-2 font-semibold">Purchase price:</label>
      <input
        type="number"
        v-model="newCrypto.price"
        min="0.01"
        step="0.01"
        required
        style="
          width: 100%;
          padding: 8px;
          background: dimgrey;
          color: white;
          border: 1px solid gray;
          border-radius: 5px;
          margin-bottom: 16px;
        "
      />

      <label class="block mb-2 font-semibold">Notes:</label>
      <textarea
        v-model="newCrypto.notes"
        style="
          width: 100%;
          padding: 8px;
          background: dimgrey;
          color: white;
          border: 1px solid gray;
          border-radius: 5px;
          resize: none;
        "
        class="mb-4"
      ></textarea>

      <button
        class="w-full mt-2 p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400"
      >
        Add
      </button>
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

<style></style>
