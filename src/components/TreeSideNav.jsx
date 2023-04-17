import { Tree } from '@minoru/react-dnd-treeview'
import { useState } from 'react'
import styles from '../app/styles/Home.module.css'
import chats from '../chats.json'
import folders from '../folders.json'
import { CustomDragPreview } from './CustomDragPreview'
import { TreeNode } from './TreeNode'

export function TreeSideNav() {
  const arrayData = [...folders, ...chats]
  const [treeData, setTreeData] = useState(arrayData)

  const handleDrop = (newTree) => {
    setTreeData(newTree)
  }

  return (
    <>
      <Tree
        tree={treeData}
        onDrop={handleDrop}
        sort={false}
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

        // canDrop={(node, target) => {
        //   console.log('el canDrop node2', node)
        //   console.log('target', target)

        //   if (
        //     // && target.dragSource.chatType === 'FOLDER'
        //     (target && target.dropTargetId === target.dragSourceId) ||
        //     target.dropTarget?.chatType === 'CHAT'
        //   ) {
        //     return false
        //   }

        //   return true
        // }}
      />
    </>
  )
}
