import { useStore } from '@/store/boundStore'
import { Conversation } from './Conversation'


interface Props {
  isFavoriteList: boolean
}

export const ConversationList:  React.FC<Props> = ({ isFavoriteList }) => {
  let conversationList = useStore((state) => state.conversationsList)

  // let conversationList = []

  // if (conversationsInfo) {
    // conversationList = Object.entries(conversationsInfo).map(
    //   ([_, item]) => item
    // )
    conversationList = isFavoriteList
      ? conversationList.filter((e) => e.isFavorite)
      : conversationList
  // }

  const Element = conversationList.map((conversation) => {
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
