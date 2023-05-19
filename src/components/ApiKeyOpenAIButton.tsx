import { useEffect, useRef, useState } from 'react'
import { KeyIcon } from './Icons'
import Link from 'next/link'

export function ApiKeyOpenAIButton() {
  const ref = useRef<HTMLDialogElement>(null)
  const [show, toggle] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (show) {
      ref.current.showModal()
      document.getElementById('apiKeyInput')?.focus()
    } else {
      ref.current.close()
    }
  }, [ref, show])

  const openDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    toggle(!show)
  }

  const onHandleSubmit = () => {
    toggle(false)
    ref.current?.close()
  }

  return (
    <div>
      <button
        className='flex w-full items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 rounded-md cursor-pointer hover:bg-gray-500/10'
        onClick={openDialog}
      >
        <KeyIcon />
        <span className='flex flex-grow'>OpenAI API Key</span>
      </button>
      <dialog
        onClose={() => toggle(false)}
        role='dialog'
        className='openai-dialog'
        ref={ref}
        onClick={(e) => {
          const dialogDimensions = ref.current?.getBoundingClientRect()
          if (
            dialogDimensions &&
            (e.clientX < dialogDimensions.left ||
              e.clientX > dialogDimensions.right ||
              e.clientY < dialogDimensions.top ||
              e.clientY > dialogDimensions.bottom)
          ) {
            toggle(false)
            ref.current?.close()
          }
        }}
      >
        <header className='gap-5 mb-6'>
          <h2 className='text-xl font-bold'>OpenAI API Key</h2>
          <Link
            href='https://platform.openai.com/account/api-keys'
            className='text-xs text-blue-500 active:text-gray-400 hover:text-sky-400 hover:underline'
            target='_blank'
          >
            → Get your API key from OpenAI dashboard ←
          </Link>
        </header>
        <section>
          <form className='flex flex-col gap-3' onSubmit={onHandleSubmit}>
            <input
              id='apiKeyInput'
              type='password'
              placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
              className='class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700"'
            />

            <button
              className='bg-gptlogo px-3 py-2 rounded-md text-white'
              type='submit'
            >
              Save API Key
            </button>
          </form>
        </section>
        <footer className='mt-6'>
          <p className='text-xs text-gray-300 text-left'>
            The app will connect to OpenAI API server to check if you API Key is
            working properly.
          </p>
        </footer>
      </dialog>
    </div>
  )
}
