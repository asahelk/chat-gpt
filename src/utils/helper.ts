import { CHAT_TYPES } from '@/constants'
import { ConversationWithId, Id, Message, NodeEntity, TreeModel } from '@/type'

export const autoHeightOnTyping = (element: HTMLElement) => {
  if (element) {
    element.style.height = '0px'
    const scrollHeight = element.scrollHeight
    element.style.height = scrollHeight + 'px'
  }
}

export const filterTreeModel = (
  array: NodeEntity<TreeModel>[],
  searchTerm = ''
) => {
  if (!searchTerm || searchTerm.trim().length === 0) return array

  const filterredArray = array.filter(
    (e) => e.data.type === CHAT_TYPES.CHAT
  ) as NodeEntity<ConversationWithId>[]
  // .map((e) => e.data) as ConversationWithId[]

  const filteredConversationsIDs = new Set(
    filterredArray
      .filter((conversation) => {
        // const conversation = item.data as ConversationWithId
        const searchable =
          conversation.text.toLocaleLowerCase() +
          ' ' +
          (conversation.data.messages
            ?.map((message) => message.content)
            .join(' ') ?? '')

        return searchable
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      })
      .flatMap((e) => [e.id, e.parent])
  )

  return array.filter((e) => filteredConversationsIDs.has(e.id))
}

export const getDescendantsFromNode = ({
  list,
  id
}: {
  list: Message[]
  id: Id
}) => {
  var tempId = id
  return list.reduce((acc, ele, index) => {
    if (ele.parentId === tempId) {
      acc.push(ele)
      tempId = ele.id
    }
    return acc
  }, [] as Message[])
}

export const getMessagesNodesFromSelectedNode = ({
  list,
  node
}: {
  list: Message[]
  node: Message
}): Message[] => {
  const { id, parentId } = node
  const parentIndex = list.findIndex((e) => e.id === parentId)
  const parentNode = list[parentIndex]
  const nodeIndex = list.findIndex((e) => e.id === id)

  const restArray = list.slice(nodeIndex)

  const descendantsFromNode = getDescendantsFromNode({ list: restArray, id })

  if (nodeIndex === -1 || parentIndex === -1)
    return [node, ...descendantsFromNode]

  //@ts-ignore
  const firstPartParentArray = list.toSpliced(parentIndex + 1)

  const firstPartArray = getMessagesNodesFromSelectedNode({
    list: firstPartParentArray,
    node: parentNode
  })

  return firstPartArray.concat(list[nodeIndex]).concat(descendantsFromNode)
}

export const isEquaI = <T>(a: T, b: T): boolean =>
  JSON.stringify(a) === JSON.stringify(b)
