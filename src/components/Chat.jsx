import { useStore } from '@/store/boundStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChatForm } from './CreatePrompt'
import { Message } from './Message'
import { Welcome } from './Welcome'

export function Chat() {
  const selectedConversation = useStore((state) => state.selectedConversation)
  const messages = useStore((state) => {
    const { selectedConversation } = state
    return state.conversationsMessages[selectedConversation]
  })
  const [animationParent] = useAutoAnimate()

  const renderContent = () => {
    if (!selectedConversation) return <Welcome />
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

  return (
    <div className='flex flex-col flex-1 h-full lg:pl-80'>
      <main className='relative w-full' ref={animationParent}>
        {renderContent()}
        <ChatForm />
      </main>
    </div>
  )
}
