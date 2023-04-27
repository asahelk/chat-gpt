import { CHAT_TYPES, TREE_X_OFFSET } from '@/constants'
import { FolderWithId, type ConversationWithId } from '@/type'
import { NodeModel } from '@minoru/react-dnd-treeview'
import { Conversation } from './Conversation'
import { Folder } from './Folder'

type Props = {
  node: NodeModel<ConversationWithId | FolderWithId>
  depth: number
  isOpen: boolean
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const TreeNode: React.FC<Props> = ({
  node,
  depth,
  isOpen,
  onToggle,
  ...options
}) => {
  const { id, droppable, data } = node
  const indent = depth * TREE_X_OFFSET + 8
  const style = { paddingInlineStart: indent }

  if (node.data == null || node.data == undefined) return null

  if (node.data.chatType === CHAT_TYPES.FOLDER) {
    return <Folder folder={data as FolderWithId} onToggle={onToggle} />
  }
  return (
    <Conversation
      conversation={data as ConversationWithId}
      isFavoriteList={false}
    />
  )
}
