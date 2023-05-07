import { useStore } from '@/store/boundStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useRef, useState } from 'react'
import { MemoizedMessage } from './MemoizedMessage'

export function Chat() {
  // const selectedConversationId = useStore(
  //   (state) => state.selectedConversationId
  // )

  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true)
  const [showScrollDownButton, setShowScrollDownButton] =
    useState<boolean>(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages = useStore((state) => state.selectedConversation?.messages)

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const [animationParent] = useAutoAnimate()

  // const renderContent = () => {
  //   if (
  //     !selectedConversation ||
  //     (selectedConversation && selectedConversation.messages.length === 0)
  //   )
  //     return <Welcome />
  //   return (
  //     <div className='flex-1 overflow-hidden'>
  //       <div className='h-full overflow-auto'>
  //         {selectedConversation?.messages.map((elem) => (
  //           <Message key={elem.id} {...elem} message={elem} />
  //         ))}
  //         <div className='flex-shrink-0 w-full h-32 md:h-48 bg-gptgray' />
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className='flex-1 overflow-hidden'>
      <div
        className='h-full overflow-auto'
        ref={chatContainerRef}
        // onScroll={handleScroll}
      >
        {messages?.map((entry) => (
          <MemoizedMessage key={entry.id} message={entry} {...entry} />
        ))}
        <div className='flex-shrink-0 w-full h-32 md:h-48 bg-gptgray' />
      </div>
    </div>
  )
}
