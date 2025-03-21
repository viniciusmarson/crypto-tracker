import type { New } from '@/types/new'
import type { Coin } from '@/types/coin'
import { BaseHttpService } from './http'

class CryptoService extends BaseHttpService {
  private readonly API_KEY = import.meta.env.VITE_CRYPTO_NEWS_API_KEY

  async getCryptoData(): Promise<Coin[]> {
    const { data } = await this.axiosInstance.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
    )
    return data
  }

  async getCryptoPriceHistory(coinId: string): Promise<number[][]> {
    const { data } = await this.axiosInstance.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1`,
    )
    return data.prices
  }

  async getCryptoNews(coinName: string): Promise<New[]> {
    const { data } = await this.axiosInstance.get(
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
