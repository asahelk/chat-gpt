import { useStore } from '@/store/boundStore'
import { ConversationWithId, FolderWithId, TreeModel } from '@/type'
import { DropOptions, NodeModel, Tree } from '@minoru/react-dnd-treeview'
import { useEffect, useState } from 'react'
import styles from '../app/styles/Home.module.css'
import { CustomDragPreview } from './CustomDragPreview'
import { TreeNode } from './TreeNode'

export function TreeSideNav() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const foldersList = useStore((state) => state.foldersList)

  const conversationsList = useStore((state) => state.conversationsList)

  const updateConversation = useStore((state) => state.updateConversation)

  const updateFoldersList = useStore((state) => state.updateFoldersList)

  const updateConversationsList = useStore(
    (state) => state.updateConversationsList
  )

  const updateFolder = useStore((state) => state.updateFolder)

  const arrayData = [...foldersList, ...conversationsList]

  const formatArrayData: NodeModel<TreeModel>[] = arrayData
    .map((e) => ({
      id: e.id,
      parent: e.parent,
      text: e.text,
      droppable: e.droppable,
      data: e
    }))
    .sort((a, b) => a.data.order - b.data.order)

  const handleOnDrop = (newTree: NodeModel<TreeModel>[]) => {
    const formatTree = newTree.map(
      (e, index) => ({ ...e.data, order: index, parent: e.parent } as TreeModel)
    )

    const conversations = formatTree.filter((e) => e.type === 'CHAT')
    const folders = formatTree.filter((e) => e.type === 'FOLDER')

    updateConversationsList(conversations as ConversationWithId[])
    updateFoldersList(folders as FolderWithId[])
  }

  const handleCanDrop = (_: any, options: DropOptions<TreeModel>) => {
    const { dragSource, dropTargetId } = options

    if (dragSource?.parent === dropTargetId) {
      return true
    }
  }

  if (!isHydrated) return <span>Loading...</span>

  return (
    <div className={styles.wrapper}>
      <Tree
        tree={formatArrayData}
        onDrop={handleOnDrop}
        canDrop={handleCanDrop}
        sort={false}
        insertDroppableFirst={false}
        dropTargetOffset={10}
        classes={{
          root: styles.treeRoot,
          container: styles.container,
          placeholder: styles.placeholderContainer,
          dropTarget: styles.dropTarget,
          draggingSource: styles.draggingSource,
          listItem: styles.listItem
        }}
        dragPreviewRender={(monitorProps) => {
          return <CustomDragPreview monitorProps={monitorProps} />
        }}
        initialOpen
        rootId='0'
        placeholderRender={(node, { depth }) => {
          const left = depth * 24
          return <div className={styles.placeHolder} style={{ left }} />
        }}
        render={(node, options) => <TreeNode node={node} {...options} />}
      />
    </div>
  )
}
