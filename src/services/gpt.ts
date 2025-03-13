import { BaseHttpService } from './http'

class GPTService extends BaseHttpService {
  private readonly API_KEY = import.meta.env.VITE_GPT_API_KEY

  async getGPTResponse(data: string, prompt: string) {
    const response = await this.axiosInstance.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an AI assistant helping with data analysis.' },
          {
            role: 'user',
            content: `Here is the data on the screen:\n${data}\n\nUser question: ${prompt}`,
          },
        ],
        max_tokens: 200,
      },
      {
        headers: { Authorization: `Bearer ${this.API_KEY}`, 'Content-Type': 'application/json' },
      },
    )

    return response.data.choices[0].message.content
  }
}

export default new GPTService()
