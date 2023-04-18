import { CHAT_TYPES } from '../constants'
import { Conversation } from './Conversation'
import { Folder } from './Folder'

export function CustomDragPreview({ monitorProps: { item } }) {
  const { id, text, isFavorite } = item

  if (item.chatType === CHAT_TYPES.FOLDER) {
    return (
      <Folder
        background='bg-gptMidnightBlue'
        bggradient='from-gptMidnightBlue'
        id={id}
        title={text}
      />
    )
  }
  return (
    <Conversation
      background='bg-gptMidnightBlue'
      bggradient='from-gptMidnightBlue'
      id={id}
      title={text}
      isFavorite={isFavorite}
      isFavoriteList={false}
    />
  )
}