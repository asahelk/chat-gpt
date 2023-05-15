import { useTreeSideNav } from '@/app/hooks/useTreeSideNav'
import { CHAT_TYPES } from '@/constants'
import { useStore } from '@/store/boundStore'
import { ConversationWithId, FolderWithId, NodeEntity, TreeModel } from '@/type'
import { isEquaI } from '@/utils/helper'
import { DropOptions, Tree } from '@minoru/react-dnd-treeview'
import { useEffect, useState } from 'react'
import styles from '../app/styles/Home.module.css'
import { CustomDragPreview } from './CustomDragPreview'
import { TreeNode } from './TreeNode'

export function TreeSideNav() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const { formattedTreeNodeList } = useTreeSideNav()

  const updateFoldersList = useStore((state) => state.updateFoldersList)

  const updateConversationsList = useStore(
    (state) => state.updateConversationsList
  )

  const { filteredSearch } = useTreeSideNav()

  const handleOnDrop = (newTree: NodeEntity<TreeModel>[]) => {
    if (isEquaI(newTree, formattedTreeNodeList)) return

    const concatenatedTreeData = newTree.concat(formattedTreeNodeList)

    const uniqueTreeData = concatenatedTreeData.filter(
      (v, index, array) => array.findIndex((e) => e.id === v.id) === index
    )

    const formattedTreeData = uniqueTreeData.map(
      (e, index) => ({ ...e.data, parent: e.parent, order: index } as TreeModel)
    )

    const conversations = formattedTreeData
      .filter((e) => e.type === CHAT_TYPES.CHAT)
      .map((entry, index) => ({ ...entry, order: index }))

    const folders = formattedTreeData.filter(
      (e) => e.type === CHAT_TYPES.FOLDER
    )

    updateConversationsList(conversations as ConversationWithId[])
    updateFoldersList(folders as FolderWithId[])
  }

  const handleCanDrop = (_: any, options: DropOptions<TreeModel>) => {
    const { dragSource, dropTargetId } = options

    if (dragSource?.parent === dropTargetId) {
      return true
    }
  }

  const initialOpenIDs = (filteredSearch as NodeEntity<FolderWithId>[])
    .filter((e) => e.data.isOpen)
    .map((e) => e.id)

  if (!isHydrated) return <span>Loading...</span>

  return (
    <div className={styles.wrapper}>
      <Tree
        tree={filteredSearch}
        onDrop={(tree, options) =>
          handleOnDrop(tree as NodeEntity<TreeModel>[])
        }
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
        initialOpen={initialOpenIDs}
        rootId={'0'}
        placeholderRender={(node, { depth }) => {
          const left = depth * 24
          return <div className={styles.placeHolder} style={{ left }} />
        }}
        render={(node, options) => (
          <TreeNode node={node as NodeEntity<TreeModel>} {...options} />
        )}
      />
    </div>
  )
}
