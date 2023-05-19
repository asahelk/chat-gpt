'use client'

import { useStore } from '@/store/boundStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect } from 'react'
import { KeyIcon, ReactIcon, SunIcon } from './Icons'
import { useRouter } from 'next/navigation'

const EXAMPLES = [
  '¿Cómo iterar un array en JavaScript?',
  'Explícame cómo funciona un coche',
  '¿Por qué se dice que un gato tiene 7 vidas?'
]

export function Welcome() {
  const setSelectedConversation = useStore(
    (state) => state.setSelectedConversation
  )

  const { push } = useRouter()
  const setSelectedMessages = useStore((state) => state.setSelectedMessages)

  const setLastMessage = useStore((state) => state.setLastMessage)

  useEffect(() => {
    setSelectedConversation({ id: null })
    setSelectedMessages({ messages: [] })
    setLastMessage({ message: null })
  }, [])

  const [animationParent] = useAutoAnimate()
  const sendPrompt = useStore((state) => state.sendPrompt)

  return (
    <section
      ref={animationParent}
      className='overflow-y-auto grid grid-cols-1 place-items-center justify-center w-full m-auto py-10'
    >
      <div className='w-full px-6 text-gray-800 md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col dark:text-gray-100'>
        <h1 className='text-4xl font-semibold text-center ml-auto mr-auto mb-10 flex gap-2 items-center justify-center'>
          Chat GPT
        </h1>

        <p className='block max-w-md m-auto mb-10 text-center align-middle'>
          Esta página <strong>no es la oficial de ChatGPT</strong>. Es un clon
          creado con React <ReactIcon className='inline-block w-6 h-6' /> y
          Tailwind para fines educativos.
        </p>

        <div className='flex max-w-xl m-auto gap-x-2'>
          <button className='flex items-center justify-center w-[250px] p-4 font-bold text-white bg-gptJungleGreen rounded-full gap-x-4 hover:bg-gptlogo/90 '>
            <KeyIcon className='w-6 h-6' /> Enter your API Key
          </button>
        </div>

        <h3 className='flex items-center justify-center mt-8 mb-2 text-lg gap-x-2'>
          <SunIcon />
          Ejemplos
        </h3>

        <ul className='flex flex-col gap-3.5 w-full sm:max-w-md m-auto'>
          {EXAMPLES.map((example, index) => (
            <button
              key={index}
              onClick={() => {
                sendPrompt({ prompt: example })
                push('/chat/newConversation')
              }}
              className='w-full p-3 rounded-md bg-gray-50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-gptMidnightBlue'
            >
              {example} →
            </button>
          ))}
        </ul>
      </div>
    </section>
  )
}
