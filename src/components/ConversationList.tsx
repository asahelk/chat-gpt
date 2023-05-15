import { useStore } from '@/store/boundStore'
import { ConversationWithId } from '@/type'
import { useEffect, useState } from 'react'
import { Conversation } from './Conversation'

interface Props {
  isFavoriteList: boolean
}

export const ConversationList: React.FC<Props> = ({ isFavoriteList }) => {
  const conversationsList = useStore((state) =>
    isFavoriteList
      ? state.conversationsList.filter((e) => e.isFavorite)
      : state.conversationsList
  )

  const [conversations, setConversations] = useState<ConversationWithId[]>()

  useEffect(() => {
    setConversations(conversationsList)
  }, [])

  const Element = conversations?.map((conversation) => {
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
