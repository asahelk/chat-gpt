import { CHAT_TYPES } from '@/constants'
import { ConversationWithId, NodeEntity, TreeModel } from '@/type'

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

export const isEquaI = <T>(a: T, b: T): boolean =>
  JSON.stringify(a) === JSON.stringify(b)
