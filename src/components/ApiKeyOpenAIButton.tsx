import { useEffect, useRef, useState } from 'react'
import { KeyIcon } from './Icons'

export function ApiKeyOpenAIButton() {
  const ref = useRef<HTMLDialogElement>(null)
  const [show, toggle] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (show) {
      ref.current.showModal()
    } else {
      toggle(!show)
      ref.current.close()
    }
  }, [ref, show])
  return (
    <div>
      <button
        className='flex w-full items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 rounded-md cursor-pointer hover:bg-gray-500/10'
        onClick={() => toggle(!show)}
      >
        <KeyIcon />
        <span className='flex flex-grow'>Open API Key</span>
      </button>
      <dialog
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
            ref.current?.close()
          }
        }}
      >
        <h1>Test</h1>
      </dialog>
    </div>
  )
}
