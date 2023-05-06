'use client'

import { MemoizedMessage } from '@/components/MemoizedMessage'
import { useStore } from '@/store/boundStore'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useEffect } from 'react'

export default function ChatId({ params }: { params: Params }) {
  const { id } = params

  const setConversation = useStore((state) => state.setConversation)

  const messages = useStore((state) => state.selectedConversation?.messages)

  useEffect(() => {
    setConversation({ id })
  }, [id])

  // return <Chat />
  return (
    <div className='flex-1 overflow-hidden'>
      <div className='h-full overflow-auto'>
        {messages?.map((entry) => (
          <MemoizedMessage key={entry.id} message={entry} {...entry} />
        ))}
        <div className='flex-shrink-0 w-full h-32 md:h-48 bg-gptgray' />
      </div>
    </div>
  )
}
