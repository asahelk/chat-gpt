'use client'

import { useStore } from '@/store/boundStore'
import { useEffect, useState } from 'react'
import { PencilIcon } from './Icons'
import { MenuIconButton } from './MenuIconButton'

interface Props {}

export const Header: React.FC<Props> = () => {
  const selectedConversation = useStore((state) => state.selectedConversation)

  const [model, setModel] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [messagesQuantity, setMessagesQuantity] = useState<number>()

  const init = () => {
    const text = selectedConversation?.text ?? 'New Chat'
    const model = selectedConversation?.model ?? '-'
    let messagesQuantity = 0
    if (selectedConversation)
      messagesQuantity = selectedConversation?.messages.length

    setModel(model)
    setTitle(text)
    setMessagesQuantity(messagesQuantity)
  }

  useEffect(() => {
    init()
  }, [selectedConversation])

  // const selectedConversationId = useStore(
  //   (state) => state.selectedConversationId
  // )

  const RenderHeader = () => {
    if (!messagesQuantity) return <span>Start a new chat</span>
    return (
      <>
        <span className='shrink-0'>{model}</span>
        <span className='sm:inline-block'>⋅</span>
        <span className='sm:inline-block'>{messagesQuantity} messages</span>
        <span className='hidden sm:inline-block'>⋅</span>
        <span className='hidden sm:inline-block'>64/4098 tokens</span>
      </>
    )
  }

  return (
    <div className='hide-when-print sticky top-0 z-30 bg-white dark:bg-gptdarkgray/70 backdrop-blur'>
      <div className='flex absolute left-1 top-0 bottom-0 items-center justify-center'>
        <MenuIconButton />
      </div>
      <div className='flex items-center justify-center w-full p-2 border-bottom-2 border-gray-200 shadow-bottom flex-col min-w-0 '>
        <div className=' items-center px-12 md:pr-12 pr-2 gap-1 grid grid-cols-[1fr_auto]'>
          <div className='font-semibold truncate w-full text-center text-black dark:text-white max-w-2xl'>
            {title ?? 'New Chat'}
          </div>
          {!!messagesQuantity && (
            <button className='text-gray-500 hover:text-white transiton-all'>
              <PencilIcon />
            </button>
          )}
        </div>

        <div className='text-xs text-gray-400 w-full truncate text-center px-16 space-x-1'>
          {RenderHeader()}
        </div>
      </div>
    </div>
  )
}
