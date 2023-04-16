import { Tree } from '@minoru/react-dnd-treeview'
import { useState } from 'react'
import styles from '../app/styles/Home.module.css'
import chats from '../chats.json'
import folders from '../folders.json'
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
        classes={{
          root: styles.treeRoot,
          placeholder: styles.placeholder,
          dropTarget: styles.dropTarget,
          listItem: styles.listItem
        }}
        rootId={0}
        render={(node, options) => <TreeNode node={node} {...options} />}
      />
    </>
  )
}
