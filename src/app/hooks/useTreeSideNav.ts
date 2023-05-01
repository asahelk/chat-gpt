import { useStore } from '@/store/boundStore'
import type { Id, NodeEntity, TreeModel } from '@/type'
import { filterTreeModel } from '@/utils/helper'

export const useTreeSideNav = () => {
  const foldersList = useStore((state) => state.foldersList)

  const conversationsList = useStore((state) => state.conversationsList)

  const searchTerm = useStore((state) => state.searchTerm)

  const combinedList = [...foldersList, ...conversationsList]

  const formattedTreeNodeList: NodeEntity<TreeModel>[] = combinedList
    .map((e) => ({
      id: e.id,
      parent: e.parent,
      text: e.text,
      droppable: e.droppable,
      data: e
    }))
    .sort((a, b) => a.data.order - b.data.order)

  const filteredSearch = filterTreeModel(formattedTreeNodeList, searchTerm)

  const updatePartialConversationsList = useStore(
    (state) => state.updatePartialConversationsList
  )

  const updateConversationsOnRemoveFolder = ({ id }: { id: Id }) => {
    const filteredConversations = conversationsList
      .filter((e) => e.parent === id)
      .map((e) => ({ ...e, parent: '0' }))

    updatePartialConversationsList(filteredConversations)
  }

  return {
    formattedTreeNodeList,
    filteredSearch,
    updateConversationsOnRemoveFolder
  }
}
