'use client'

import { useStore } from '@/store/boundStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Message } from './Message'
import { Welcome } from './Welcome'

export function Chat() {
  const selectedConversationId = useStore(
    (state) => state.selectedConversationId
  )
  const conversation = useStore((state) => {
    const { selectedConversationId } = state

    if (selectedConversationId != null)
      return state.conversationsList.find((e) => e.id == selectedConversationId)
  })

  const selectedConversation = useStore((state) => state.selectedConversation)

  const [animationParent] = useAutoAnimate()

  const renderContent = () => {
    if (
      !selectedConversation ||
      (selectedConversation && selectedConversation.messages.length === 0)
    )
      return <Welcome />
    return (
      <div className='flex-1 overflow-hidden'>
        <div className='h-full overflow-auto'>
          {selectedConversation?.messages.map((elem) => (
            <Message key={elem.id} {...elem} message={elem} />
          ))}
          <div className='flex-shrink-0 w-full h-32 md:h-48 bg-gptgray' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 overflow-hidden'>
      <div className='h-full overflow-auto'>
        {selectedConversation?.messages.map((elem) => (
          <Message key={elem.id} {...elem} message={elem} />
        ))}
        <div className='flex-shrink-0 w-full h-32 md:h-48 bg-gptgray' />
      </div>
    </div>
  )

  // return (
  //   <div className='flex flex-col flex-1 h-full lg:pl-80'>
  //     <main className='relative w-full' ref={animationParent}>
  //       {renderContent()}
  //       <ChatForm />
  //     </main>
  //   </div>
  // )
}
