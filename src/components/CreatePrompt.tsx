'use client'

import { SendIcon } from '@/components/Icons'
import { useStore } from '@/store/boundStore'
import { autoHeightOnTyping } from '@/utils/helper'
import { useEffect, useRef, useState } from 'react'

const loadingStates = [
  [true, false, false],
  [true, true, false],
  [true, true, true]
]

function LoadingButton() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1
        return newIndex > 2 ? 0 : newIndex
      })
    }, 400)

    return () => clearInterval(intervalId)
  }, [])

  const [, showSecond, showThird] = loadingStates[index]

  return (
    <div className='text-2xl'>
      <span className=''>·</span>
      <span className={`${!showSecond && 'invisible'}`}>·</span>
      <span className={`${!showThird && 'invisible'}`}>·</span>
    </div>
  )
}

export function ChatForm() {
  const sendPrompt = useStore((state) => state.sendPrompt)
  const isLoading = useStore((state) => state.loading)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (isLoading) return

    const element = textAreaRef.current as HTMLTextAreaElement
    const { value } = element
    sendPrompt({ prompt: value })
    element.value = ''
  }

  const handleChange = () => {
    const element = textAreaRef.current as HTMLTextAreaElement

    autoHeightOnTyping(element)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    const element = textAreaRef.current as HTMLTextAreaElement
    element.focus()
  }, [])

  return (
    <section className='sticky bottom-0 left-0 right-0 w-full px-2 border-t md:border-t-0 dark:border-white/20 md:border-transparent bg-gradient'>
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className='flex flex-row max-w-3xl pt-6 m-auto mb-2'
      >
        <div className='relative flex flex-col flex-grow w-full px-4 py-3 text-white border rounded-md shadow-lg bg-gptlightgray border-gray-900/50'>
          <textarea
            disabled={isLoading}
            onChange={handleChange}
            ref={textAreaRef}
            rows={1}
            tabIndex={0}
            autoFocus
            defaultValue=''
            className='w-full h-[24px] resize-none bg-transparent m-0 border-0 outline-none'
          />
          <button
            disabled={isLoading}
            type='submit'
            className={`opacity-40 absolute p-1 rounded-md bottom-0 h-full right-2.5 ${
              isLoading
                ? 'pointer-events-none'
                : 'hover:shadow-2xl rounded-full'
            }`}
          >
            {isLoading ? <LoadingButton /> : <SendIcon />}
          </button>
        </div>
      </form>
      <div className='px-3 pt-2 pb-3 text-xs text-center text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6'>
        <span>
          Clon de ChatGPT creado con Next.js y TailwindCSS. Creado con fines
          educativos y de aprendizaje.
        </span>
      </div>
    </section>
  )
}
