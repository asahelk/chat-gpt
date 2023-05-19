import { useState } from 'react'
import { KeyIcon } from './Icons'
import Link from 'next/link'
import { useStore } from '@/store/boundStore'

export function ApiKeyOpenAIButton() {
  const setApiKey = useStore((state) => state.setApiKey)
  const apiKey = useStore((state) => state.apiKey)

  const [apiKeyInput, setApiKeyInput] = useState(apiKey)

  const openDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const dialog = document.getElementById('apiKeyDialog') as HTMLDialogElement
    dialog.showModal()

    document.getElementById('apiKeyInput')?.focus()
  }

  const onClose = (event: React.MouseEvent<HTMLDialogElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault()
    event.stopPropagation()

    if (apiKey) {
      setApiKey({ value: apiKeyInput })
    }
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
        id='apiKeyDialog'
        onClose={onClose}
        role='dialog'
        className='openai-dialog'
        onClick={(e) => {
          const dialogDimensions = e.currentTarget.getBoundingClientRect()

          if (
            dialogDimensions &&
            e.clientX !== 0 &&
            e.clientY !== 0 &&
            (e.clientX < dialogDimensions.left ||
              e.clientX > dialogDimensions.right ||
              e.clientY < dialogDimensions.top ||
              e.clientY > dialogDimensions.bottom)
          ) {
            const dialog = document.getElementById(
              'apiKeyDialog'
            ) as HTMLDialogElement

            dialog.close()
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
          <form
            method='dialog'
            className='flex flex-col gap-3'
            onSubmit={onHandleSubmit}
          >
            <input
              id='apiKeyInput'
              type='password'
              placeholder='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
              maxLength={51}
              className='class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-zinc-700"'
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
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
