import { ConversationWithId, FolderWithId } from '@/type'
import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview'
import { CHAT_TYPES } from '../constants'
import { Conversation } from './Conversation'
import { Folder } from './Folder'

interface Props {
  monitorProps: DragLayerMonitorProps<ConversationWithId | FolderWithId>
}

export const CustomDragPreview: React.FC<Props> = ({
  monitorProps: { item }
}) => {
  // const node = item
  // const { id, text, data } = item

  if (item.data == undefined || item.data == null) return null

  const RenderElement =
    item.data.chatType === CHAT_TYPES.FOLDER ? (
      <Folder
        folder={item.data as FolderWithId}
        background='bg-gptMidnightBlue'
        bggradient='from-gptMidnightBlue'
        onToggle={() => void 0}
        // className='bg-gptMidnightBlue from-[#2A2B32]'
        // id={id}
        // title={text}
      />
    ) : (
      <Conversation
        conversation={item.data as ConversationWithId}
        background='bg-gptMidnightBlue'
        bggradient='from-gptMidnightBlue'
        // id={id}
        // title={text}
        // isFavorite={isFavorite}
        isFavoriteList={false}
      />
    )
  return (
    <div style={{ background: 'red', position: 'relative', cursor: 'pointer' }}>
      {RenderElement}
    </div>
  )
  // if (item.chatType === CHAT_TYPES.FOLDER) {
  //   return (
  //     <Folder
  //       background='bg-gptMidnightBlue'
  //       bggradient='from-[#2A2B32]'
  //       className='bg-gptMidnightBlue from-[#2A2B32]'
  //       id={id}
  //       title={text}
  //     />
  //   )
  // }
  // return (
  //   <Conversation
  //     background='bg-gptMidnightBlue'
  //     bggradient='from-[#2A2B32]'
  //     id={id}
  //     title={text}
  //     isFavorite={isFavorite}
  //     isFavoriteList={false}
  //   />
  // )
}
