import { useStore } from '@/store/boundStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CheckIcon, CloseIcon, TrashIcon } from './Icons'

export function ClearAllConversations() {
  const [showConfirmationsIcons, setShowConfirmationsIcons] =
    useState<boolean>(false)

  const clearConversations = useStore((state) => state.clearConversations)

  const { replace } = useRouter()

  const handleClickClearConversations = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!showConfirmationsIcons) {
      setShowConfirmationsIcons(true)
      setTimeout(() => {
        setShowConfirmationsIcons(false)
      }, 5000)
    }
  }

  function handleConfirmClearConversation(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault()
    event.stopPropagation()
    clearConversations()
    replace('/chat')
    setShowConfirmationsIcons(false)
  }
  return (
    <div
      onClick={handleClickClearConversations}
      className='flex items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 rounded-md cursor-pointer hover:bg-gray-500/10'
    >
      <TrashIcon />
      <span className='flex flex-grow'>
        {showConfirmationsIcons ? 'Are you sure?' : 'Clear all conversations'}
      </span>
      {showConfirmationsIcons && (
        <div className='flex gap-4'>
          <button
            onClick={handleConfirmClearConversation}
            className='text-gray-500 hover:text-white transiton-all'
          >
            <CheckIcon />
          </button>
          <button
            className='text-gray-500 hover:text-white transiton-all'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setShowConfirmationsIcons(false)
            }}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  )
}
