import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CryptoChat from '../CryptoChat.vue'

describe('CryptoChat', () => {
  it('renders properly with initial empty state', () => {
    const wrapper = mount(CryptoChat)

    // Check initial rendering
    expect(wrapper.find('h2').text()).toBe('Ask GPT About This Data')
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Ask GPT')

    // Check that error and response are not shown initially
    expect(wrapper.find('.text-red-500').exists()).toBe(false)
    expect(wrapper.find('.bg-gray-800.rounded-lg').exists()).toBe(false)
  })

  it('shows error when submitting empty question', async () => {
    const wrapper = mount(CryptoChat)

    // Click button without entering text
    await wrapper.find('button').trigger('click')

    // Check error message
    expect(wrapper.find('.text-red-500').text()).toBe('Please enter a question.')
  })
})
