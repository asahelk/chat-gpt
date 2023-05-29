import { NextResponse } from 'next/server'

export type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

export interface OpenAIStreamPayload {
  model: string
  messages: ChatGPTMessage[]
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  // max_tokens: number
  stream: boolean
  stop?: string[]
  user?: string
  n: number
}

const { OPENAI_API_KEY } = process.env

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder('utf-8')

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY ?? ''}`
  }

  //   if (OPENAI_API_KEY) {
  //     requestHeaders['OpenAI-Organization'] = OPENAI_API_KEY
  //   }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: requestHeaders,
      method: 'POST',
      body: JSON.stringify(payload)
    })

    if (!response.ok || !response.body) {
      console.log('Error en OpenAI API', response)
      console.error(response.statusText)
      return NextResponse.json({ error: 'OpenAI API error' }, { status: 500 })
    }

    const reader = response.body.getReader()

    const readableStream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            controller.close()
            break
          }

          const text = decoder.decode(value)
          const data = text
            .split('\n')
            .filter(Boolean)
            .map((line) => line.trim().replace('data: ', '').trim())

          for (const line of data) {
            if (line === '[DONE]') {
              controller.close()
              break
            }

            let content = ''
            try {
              const json = JSON.parse(line)
              content = json?.choices[0]?.delta?.content ?? ''
            } catch (e) {
              console.error('No se pudo parsear la línea', line)
              console.error(e)
              controller.error(e)
            }

            console.log('----------------')
            console.log({ content })
            controller.enqueue(encoder.encode(content))
          }
        }
      }
    })

    return new NextResponse(readableStream, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
        'Content-Encoding': 'gzip',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Type': 'text/event-stream; charset=utf-8'
      }
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: `${e}` }, { status: 500 })
  }
}
