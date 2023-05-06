import { useStore } from '@/store/boundStore'
import { useEffect, useState } from 'react'
import { Conversation } from './Conversation'

interface Props {
  isFavoriteList: boolean
}

export const ConversationList: React.FC<Props> = ({ isFavoriteList }) => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  let conversationsList = useStore((state) => state.conversationsList)

  conversationsList = isFavoriteList
    ? conversationsList.filter((e) => e.isFavorite)
    : conversationsList

  if (!isHydrated) return <></>

  const Element = conversationsList.map((conversation) => {
    return (
      <Conversation
        conversation={conversation}
        key={conversation.id}
        // id={item.id}
        // title={item.text}
        // isFavorite={item.isFavorite}
        isFavoriteList
      />
    )
  })

  return <>{Element}</>
}
