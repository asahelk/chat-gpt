'use client'

import { Message } from '@/components/Message'
import { useStore } from '@/store/boundStore'

export default function Chat({ params }) {
  const { id } = params
  console.log('el id', id)
  const selectedConversation = useStore((state) => state.selectedConversation)

  const messages = useStore((state) => state.selectedConversation[id])

  return (
    <div className='flex-1 overflow-hidden'>
      <div className='h-full overflow-auto'>
        {messages?.map((entry) => (
          <Message key={entry.id} {...entry} />
        ))}
        <div className='flex-shrink-0 w-full h-32 md:h-48 bg-gptgray' />
      </div>
    </div>
  )
}
