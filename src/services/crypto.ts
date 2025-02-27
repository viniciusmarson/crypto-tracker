import type { Coin } from '@/types/coin'
import type { New } from '@/types/new'
import axios from 'axios'

class CryptoService {
  private readonly API_KEY = 'pub_7098760315abb2ba18da32d1cdc3e694d2a31'

  async getCryptoData(): Promise<Coin[]> {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
    )
    return data
  }

  async getCryptoPriceHistory(coinId: string): Promise<number[][]> {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`,
    )
    return data.prices
  }

  async getCryptoNews(coinName: string): Promise<New[]> {
    const { data } = await axios.get(
      `https://newsdata.io/api/1/news?q=${coinName}&language=en&category=business`,
      {
        params: {
          apikey: this.API_KEY,
          q: coinName, // Filter news by the coin name
          language: 'en',
          category: 'business',
        },
      },
    )
    return data.results || ([] as New[])
  }
}

export default new CryptoService()
