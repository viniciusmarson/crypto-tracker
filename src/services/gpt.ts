import { BaseHttpService } from './http'

class GPTService extends BaseHttpService {
  private readonly API_KEY =
    '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'

  async getGPTResponse(data: string, prompt: string) {
    const response = await this.axiosInstance.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
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
