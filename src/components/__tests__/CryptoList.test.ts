import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CryptoList from '@/components/CryptoList.vue'

describe('CryptoList', () => {
  const mockCoins = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'bitcoin.png',
      current_price: 50000,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      image: 'ethereum.png',
      current_price: 3000,
    },
  ]

  const mockSelectCoin = vi.fn()

  it('renders all coins correctly', () => {
    const wrapper = mount(CryptoList, {
      props: {
        coins: mockCoins,
        selectCoin: mockSelectCoin,
      },
    })

    // Check if all coins are rendered
    const coinElements = wrapper.findAll('[class*="flex items-center justify-between"]')
    expect(coinElements).toHaveLength(2)

    // Check if coin names and symbols are displayed correctly
    expect(wrapper.text()).toContain('Bitcoin (BTC)')
    expect(wrapper.text()).toContain('Ethereum (ETH)')

    // Check if prices are displayed correctly
    expect(wrapper.text()).toContain('$50,000')
    expect(wrapper.text()).toContain('$3,000')

    // Check if images are rendered with correct sources
    const images = wrapper.findAll('img')
    expect(images[0].attributes('src')).toBe('bitcoin.png')
    expect(images[1].attributes('src')).toBe('ethereum.png')
  })

  it('calls selectCoin when a coin is clicked', async () => {
    const wrapper = mount(CryptoList, {
      props: {
        coins: mockCoins,
        selectCoin: mockSelectCoin,
      },
    })

    // Click the first coin
    await wrapper.findAll('[class*="flex items-center justify-between"]')[0].trigger('click')

    // Verify that selectCoin was called with the correct coin
    expect(mockSelectCoin).toHaveBeenCalledWith(mockCoins[0])
  })
})
