'use client'

import { useStore } from '@/store/boundStore'
import { ConversationWithId } from '@/type'
import { useEffect, useState } from 'react'
import { MenuIconButton } from './MenuIconButton'

interface Props {}

export const Header: React.FC<Props> = () => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const selectedConversationId = useStore(
    (state) => state.selectedConversationId
  )

  // const selectConversation = useStore((state) => state.selectConversation)
  // selectConversation({ id })
  const {
    text = 'New Chat',
    model = 'xd2',
    messages = []
  } = useStore(
    (state) => state.selectedConversation ?? {}
  ) as ConversationWithId

  const RenderHeader = () => {
    if (!selectedConversationId) return <span>Start a new chat</span>
    return (
      <>
        <span className='shrink-0'>{model}</span>
        <span className='hidden sm:inline-block'>⋅</span>
        <span className='hidden sm:inline-block'>
          {messages.length} messages
        </span>
        <span className='hidden sm:inline-block'>⋅</span>
        <span className='hidden sm:inline-block'>64/4098 tokens</span>
      </>
    )
  }

  if (!isHydrated) return <></>

  return (
    <div className='hide-when-print sticky top-0 z-30 bg-white dark:bg-gptdarkgray/70 backdrop-blur'>
      <div className='flex absolute left-1 top-0 bottom-0 items-center justify-center'>
        <MenuIconButton />
      </div>
      <div className='flex items-center justify-center w-full p-2 border-bottom-2 border-gray-200 shadow-bottom flex-col min-w-0 '>
        <div className='font-semibold truncate w-full text-center px-12 text-black dark:text-white max-w-2xl'>
          {text}
        </div>
        <div className='text-xs text-gray-400 w-full truncate text-center px-16 space-x-1'>
          {RenderHeader()}
        </div>
      </div>
    </div>
  )
}
