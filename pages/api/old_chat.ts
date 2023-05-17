import type { Message } from '@/type'
import type { NextApiRequest, NextApiResponse } from 'next'

const { OPENAI_API_KEY } = process.env

const date = new Date()
const currentDate = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`

const INITIAL_ROLE_MESSAGE = {
  role: 'system',
  content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Current date is: ${currentDate}.`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { prompt, messages } = req.body as {
    prompt?: string
    messages: Message[]
  }

  // if (!prompt) {
  //   return res.status(400).json({ error: 'Prompt is required' })
  // }

  console.log('EL PROMPT', prompt)
  console.log('EL CONVERSATION', messages)
  console.log('-------\n\n')

  let previousConversation: { role: string; content: string }[] = []

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
      .filter((entry) => entry !== null) as { role: string; content: string }[]
  } catch (error) {
    console.error('Error mapping -> ', messages)
    console.error(error)
    return res.status(400).json({ error: 'Error mapping' })
  }

  const formattedMessages = [INITIAL_ROLE_MESSAGE, ...previousConversation]

  console.log('LOS MESSAGES', messages)
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // gpt-3.5-turbo / text-davinci-003
        stream: true,
        messages: formattedMessages,
        temperature: 0.2
      })
    })

    if (!response.ok) {
      console.error(response.statusText)
      return res.status(500).json({ error: 'OpenAI API error' })
    }

    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      Connection: 'keep-alive',
      'Content-Encoding': 'gzip',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream; charset=utf-8'
    })

    const reader = response.body!.getReader()
    const decoder = new TextDecoder('utf-8')

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        res.end()
        break
      }

      const text = decoder.decode(value)
      const data = text
        .split('\n')
        .filter(Boolean)
        .map((line) => line.trim().replace('data: ', '').trim())

      for (const line of data) {
        if (line === '[DONE]') {
          res.end()
          break
        }

        let content = ''
        try {
          const json = JSON.parse(line)
          content = json?.choices[0]?.delta?.content ?? ''
        } catch (e) {
          console.error('No se pudo parsear la línea', line)
          console.error(e)
        }

        console.log('----------------')
        console.log({ content })
        res.write(content)
        res.flushHeaders()
      }
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e })
  }
}
