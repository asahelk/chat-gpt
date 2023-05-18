'use client'

import { useChatMessage } from '@/app/hooks/useChatMessage'
import { NEW_CONVERSATION_PARAM } from '@/constants'
import { useStore } from '@/store/boundStore'
import { Id } from '@/type'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { MemoizedMessage } from './MemoizedMessage'

export function Chat() {
  // const conversationMessages = useStore((state) => state.selectedMessages)

  const setSelectedConversation = useStore(
    (state) => state.setSelectedConversation
  )
  // const setSelectedMessages = useStore((state) => state.setSelectedMessages)

  const { replace } = useRouter()

  const {
    filteredMessages,
    setIndexMessageSiblingSelected,
    setMessageSelected
  } = useChatMessage()

  const params = useParams()

  useEffect(() => {
    if (params?.id && params?.id !== NEW_CONVERSATION_PARAM) {
      setSelectedConversation({ id: params?.id as Id })
    }
  }, [])

  useEffect(() => {
    if (filteredMessages?.length === 0) replace('/chat')
  }, [filteredMessages])

  // useEffect(() => {
  //   setFilteredMessages(conversationMessages)
  // }, [conversationMessages])

  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true)
  const [showScrollDownButton, setShowScrollDownButton] =
    useState<boolean>(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filteredMessages])

  const [animationParent] = useAutoAnimate()

  return (
    <div className='flex-1 overflow-hidden'>
      <div
        className='h-full overflow-auto'
        ref={chatContainerRef}
        // onScroll={handleScroll}
      >
        {filteredMessages?.map((entry, index) => (
          <MemoizedMessage
            key={entry.id}
            message={entry}
            {...entry}
            index={index}
            setMessageSelected={setMessageSelected}
            setIndexMessageSiblingSelected={setIndexMessageSiblingSelected}
          />
        ))}
        <div
          ref={bottomRef}
          className='flex-shrink-0 w-full h-32 md:h-48 bg-gptgray'
        />
      </div>
    </div>
  )
}
