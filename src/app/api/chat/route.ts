import { Message } from '@/type'
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload
} from '@/utils/OpenAIStream'
import { NextResponse } from 'next/server'

const date = new Date()
const currentDate = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`

const INITIAL_ROLE_MESSAGE = {
  role: 'system',
  content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Current date is: ${currentDate}.`
}

export async function POST(request: Request) {
  const body = await request.json()

  const { prompt, messages } = body as {
    prompt?: string
    messages: Message[]
  }

  // if (!prompt) {
  //   return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  // }

  if (!messages || !messages[0] || !messages[0].content) {
    return NextResponse.json({ error: 'Messages is required' }, { status: 400 })
  }

  let previousConversation: ChatGPTMessage[] = []

  try {
    previousConversation = messages
      .map((entry) => {
        const role = entry.isAI ? 'assistant' : 'user'

        // ignore messages without content or error
        if (!entry.content || entry.error) return null

        return {
          role,
          content: entry.content
        }
      })
      .filter((entry) => entry !== null) as ChatGPTMessage[]
  } catch (error) {
    console.error('Error mapping -> ', messages)
    console.error(error)
    return NextResponse.json({ error: 'Error mapping' }, { status: 400 })
  }

  const formattedMessages = [
    INITIAL_ROLE_MESSAGE,
    ...previousConversation
  ] as ChatGPTMessage[]

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo-0301',
    messages: formattedMessages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.5,
    // max_tokens: process.env.AI_MAX_TOKENS
    //   ? parseInt(process.env.AI_MAX_TOKENS)
    //   : 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1
  }

  const response = OpenAIStream(payload)

  return response
}
