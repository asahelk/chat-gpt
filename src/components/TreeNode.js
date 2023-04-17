import { CHAT_TYPES, TREE_X_OFFSET } from '@/constants'
import { Conversation } from './Conversation'
import { Folder } from './Folder'

export function TreeNode({ node, depth, isOpen, onToggle, onDelete, onCopy }) {
  const { id, droppable, data } = node
  const indent = depth * TREE_X_OFFSET + 8
  const style = { paddingInlineStart: indent }

  if (node.chatType === CHAT_TYPES.FOLDER) {
    return (
      <Folder
        style={style}
        id={id}
        title={node.text}
        onToggle={onToggle}
        isOpen={isOpen}
      />
    )
  }
  return (
    <Conversation
      style={style}
      id={id}
      title={node.text}
      isFavorite={node.isFavorite}
      isFavoriteList={false}
    />
  )
}
