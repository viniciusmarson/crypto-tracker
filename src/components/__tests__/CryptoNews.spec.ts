import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CryptoNews from '../CryptoNews.vue'

describe('CryptoNews', () => {
  const mockNews = [
    {
      title: 'Bitcoin Reaches New High',
      link: 'https://example.com/1',
      source_id: 'CryptoNews',
      pubDate: '2024-03-20T10:00:00Z',
    },
    {
      title: 'Ethereum Update Coming Soon',
      link: 'https://example.com/2',
      source_id: 'BlockchainDaily',
      pubDate: '2024-03-19T15:30:00Z',
    },
  ]

  it('renders the component with news items', () => {
    const wrapper = mount(CryptoNews, {
      props: {
        news: mockNews,
      },
    })

    // Check if title is rendered
    expect(wrapper.find('h2').text()).toBe('Latest News')

    // Check if correct number of news items are rendered
    const newsItems = wrapper.findAll('li')
    expect(newsItems).toHaveLength(2)

    // Check first news item content
    const firstNewsItem = newsItems[0]
    expect(firstNewsItem.find('a').text()).toBe('Bitcoin Reaches New High')
    expect(firstNewsItem.find('a').attributes('href')).toBe('https://example.com/1')
    expect(firstNewsItem.find('p').text()).toContain('CryptoNews')
  })

  it('shows "No news available" message when news array is empty', () => {
    const wrapper = mount(CryptoNews, {
      props: {
        news: [],
      },
    })

    expect(wrapper.find('p').text()).toBe('No news available.')
    expect(wrapper.findAll('li')).toHaveLength(0)
  })

  it('formats date correctly', () => {
    const wrapper = mount(CryptoNews, {
      props: {
        news: [mockNews[0]],
      },
    })

    const dateText = wrapper.find('p').text()
    const formattedDate = new Date('2024-03-20T10:00:00Z').toLocaleDateString()
    expect(dateText).toContain(formattedDate)
  })
})
