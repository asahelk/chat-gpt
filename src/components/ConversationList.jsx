import { useStore } from '@/store/boundStore'
import { Conversation } from './Conversation'

export function ConversationList({ isFavoriteList }) {
  const conversationsInfo = useStore((state) => state.conversationsInfo)

  let conversationList = []

  if (conversationsInfo) {
    conversationList = Object.entries(conversationsInfo).map(
      ([_, item]) => item
    )
    conversationList = isFavoriteList
      ? conversationList.filter((e) => e.isFavorite)
      : conversationList
  }

  const Element = conversationList.map((item) => {
    return (
      <Conversation
        key={item.id}
        id={item.id}
        title={item.name}
        isFavorite={item.isFavorite}
        draggable={!isFavoriteList}
        isfavoritelist={isFavoriteList?.toString()}
      />
    )
  })

  return <>{Element}</>
}
