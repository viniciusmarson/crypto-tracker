import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CryptoChat from '../CryptoChat.vue'

describe('CryptoChat', () => {
  it('renders properly with initial empty state', () => {
    const wrapper = mount(CryptoChat)

    expect(wrapper.find('h2').text()).toBe('Ask AI About This Data')
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Ask our AI')
  })

  it('disables button when loading prop is true', () => {
    const wrapper = mount(CryptoChat, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').text()).toBe('Thinking...')
  })

  it('disables button when question is empty', () => {
    const wrapper = mount(CryptoChat)

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('enables button when question is not empty', async () => {
    const wrapper = mount(CryptoChat)

    await wrapper.find('textarea').setValue('Test question')
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'An error occurred'
    const wrapper = mount(CryptoChat, {
      props: {
        error: errorMessage,
      },
    })

    expect(wrapper.find('.text-red-500').text()).toBe(errorMessage)
  })

  it('displays response when response prop is provided', () => {
    const testResponse = 'This is a test response'
    const wrapper = mount(CryptoChat, {
      props: {
        response: testResponse,
      },
    })

    expect(wrapper.find('.bg-gray-800 .mt-2').text()).toBe(testResponse)
  })

  it('emits askQuestion event with correct question value', async () => {
    const wrapper = mount(CryptoChat)
    const testQuestion = 'What is Bitcoin?'

    await wrapper.find('textarea').setValue(testQuestion)
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('askQuestion')).toBeTruthy()
    expect(wrapper.emitted('askQuestion')?.[0]).toEqual([testQuestion])
  })

  it('updates textarea value when v-model is used', async () => {
    const wrapper = mount(CryptoChat)
    const testQuestion = 'Test question'

    await wrapper.find('textarea').setValue(testQuestion)
    expect(wrapper.find('textarea').element.value).toBe(testQuestion)
  })

  it('renders with all props provided', () => {
    const props = {
      response: 'Test response',
      loading: true,
      error: 'Test error',
    }

    const wrapper = mount(CryptoChat, {
      props,
    })

    expect(wrapper.find('.bg-gray-800 .mt-2').text()).toBe(props.response)
    expect(wrapper.find('.text-red-500').text()).toBe(props.error)
    expect(wrapper.find('button').text()).toBe('Thinking...')
  })
})
