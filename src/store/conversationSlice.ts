import {
  type Conversation,
  type ConversationWithId,
  type Id,
  type Message
} from '@/type'

import { defaultConversationInit } from '@/utils/initObjects'
import { StateCreator } from 'zustand'
import { StoreState } from './boundStore'

export interface ConversationState {
  loading: boolean
  conversationsList: ConversationWithId[]
  selectedConversation?: ConversationWithId | null
  selectedConversationId?: Id | null
  selectedMessages: Message[] | []
  lastMessage?: Message | null
  removeConversation: ({ id }: { id: Id }) => void
  setLastMessage: ({ message }: { message?: Message | null }) => void
  addNewConversation: (conversation: Conversation) => void
  updateConversation: (conversation: ConversationWithId) => void
  updateConversationsList: (conversationsList: ConversationWithId[]) => void
  updatePartialConversationsList: (
    conversationsList: ConversationWithId[]
  ) => void
  clearConversations: () => void
  setSelectedConversation: ({ id }: { id: Id | null }) => void
  setSelectedMessages: ({ messages }: { messages: Message[] }) => void
  addMessageToSelectedMessages: ({ message }: { message: Message }) => void
  sendPrompt: ({
    prompt,
    message
  }: {
    prompt: string
    message?: Message
  }) => Promise<Id>
  removeContiguousMessages: ({ id, index }: { id: Id; index: number }) => void
}

export const createConversationSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown]],
  [],
  ConversationState
> = (set, get) => ({
  loading: false,
  conversationsList: [],
  selectedConversationId: null,
  selectedConversation: null,
  selectedMessages: [],
  lastMessage: undefined,
  setLastMessage: ({ message }) => {
    set((state) => ({ lastMessage: message }))
  },
  setSelectedConversation: ({ id }: { id: Id | null }) => {
    const conversation = get().conversationsList.find((e) => e.id === id)

    get().setSelectedMessages({ messages: conversation?.messages || [] })

    set((state) => ({
      selectedConversationId: conversation ? id : null,
      selectedConversation: conversation
    }))
  },
  setSelectedMessages: ({ messages }: { messages: Message[] }) => {
    set((state) => ({ selectedMessages: [...messages] }))
  },
  addMessageToSelectedMessages: ({ message }: { message: Message }) => {
    set((state) => ({ selectedMessages: [...state.selectedMessages, message] }))
  },
  clearConversations: () => {
    set(() => ({
      loading: false,
      conversationsList: [],
      selectedConversationId: null
    }))
  },
  removeConversation: ({ id }: { id: Id }) => {
    const newSelectedConversationId =
      get().selectedConversationId === id ? null : get().selectedConversationId

    const newSelectedConversation =
      get().selectedConversation?.id === id ? null : get().selectedConversation

    set((state) => ({
      selectedConversation: newSelectedConversation,
      selectedConversationId: newSelectedConversation?.id,
      conversationsList: state.conversationsList.filter(
        (conversation: ConversationWithId) => conversation.id !== id
      )
    }))
  },
  removeContiguousMessages: ({ id }) => {
    const messageNodeToBeRemovedIndex = get().selectedMessages.findIndex(
      (e) => e.id === id
    )

    if (messageNodeToBeRemovedIndex === -1) return

    const messageNodeToBeRemoved =
      get().selectedMessages[messageNodeToBeRemovedIndex]

    if (!messageNodeToBeRemoved) return

    const contigousMessageNodeToBeRemoved =
      get().selectedMessages[messageNodeToBeRemovedIndex + 1]

    const childrenNodes = get().selectedMessages.filter(
      (e) => e.parentId === contigousMessageNodeToBeRemoved.id
    )

    const siblingsFromRemovedNode = get().selectedMessages.filter(
      (e) =>
        messageNodeToBeRemoved.siblingsInclusive.includes(e.id) && e.id !== id
    )

    const newSiblings = siblingsFromRemovedNode.concat(childrenNodes)

    const newSiblingsIds = newSiblings.map((e) => e.id)

    newSiblings.forEach((ele) => {
      ele.parentId = messageNodeToBeRemoved.parentId
      ele.siblingsInclusive = newSiblingsIds.length > 1 ? newSiblingsIds : []
    })

    const selectedConversationIndex = get().conversationsList.findIndex(
      (e) => e.id === messageNodeToBeRemoved.conversationId
    )

    set((state) => {
      if (!state.selectedConversation) return {}

      const messages = state.selectedMessages
        //@ts-ignore
        .toSpliced(messageNodeToBeRemovedIndex, 2) as Message[]

      // messages
      //   .filter((e) => newSiblingsIds.includes(e.id))
      //   .forEach((e) => (e.siblingsInclusive = newSiblingsIds))
      // .map((entry: Message) => ({ ...entry, siblingsInclusive: siblingsIds }))

      state.selectedConversation.messages = structuredClone(messages)

      state.conversationsList[selectedConversationIndex] = structuredClone(
        state.selectedConversation
      )

      return {
        selectedMessages: messages,
        selectedConversation: structuredClone(state.selectedConversation),
        conversationsList: structuredClone(state.conversationsList)
      }
    })
  },
  // removeContiguousMessages: ({ id }) => {
  //   const userMessageIndex = get().selectedMessages.findIndex(
  //     (e) => e.id === id
  //   )

  //   if (userMessageIndex === -1) return

  //   const userMessage = get().selectedMessages[userMessageIndex]

  //   if (!userMessage) return

  //   const newSiblingsIds = userMessage.siblingsInclusive.filter(
  //     (e) => e !== userMessage.id
  //   )

  //   const selectedConversationIndex = get().conversationsList.findIndex(
  //     (e) => e.id === get().selectedConversationId
  //   )

  //   set((state) => {
  //     if (!state.selectedConversation) return {}

  //     const messages = state.selectedConversation.messages
  //       //@ts-ignore
  //       .toSpliced(userMessageIndex, 2) as Message[]

  //     messages
  //       .filter((e) => newSiblingsIds.includes(e.id))
  //       .forEach((e) => (e.siblingsInclusive = newSiblingsIds))
  //     // .map((entry: Message) => ({ ...entry, siblingsInclusive: siblingsIds }))

  //     state.selectedConversation.messages = messages

  //     state.conversationsList[selectedConversationIndex] = structuredClone(
  //       state.selectedConversation
  //     )
  //     return {
  //       selectedMessages: messages,
  //       selectedConversation: structuredClone(state.selectedConversation),
  //       conversationsList: [...state.conversationsList]
  //     }
  //   })
  // },
  addNewConversation: (conversation) => {
    const uuID = crypto.randomUUID() as Id

    set((state) => ({
      loading: false,
      selectedConversation: null,
      conversationsList: [
        ...state.conversationsList,
        { id: uuID, ...conversation }
      ]
    }))
  },
  updateConversation: (conversation) => {
    set((state) => {
      const index = state.conversationsList.findIndex(
        (e) => e.id === conversation.id
      )

      state.conversationsList[index] = {
        ...state.conversationsList[index],
        ...conversation
      }

      const selectedConversation = get().selectedConversation
      if (selectedConversation && selectedConversation.id === conversation.id) {
        state.selectedConversation = structuredClone({
          ...state.selectedConversation,
          ...conversation
        })
      }

      return {
        conversationsList: [...state.conversationsList],
        selectedConversation: {
          ...state.selectedConversation
        } as ConversationWithId
      }
    })
  },
  updateConversationsList: (conversationsList) => {
    set((state) => {
      return {
        conversationsList: conversationsList
      }
    })
  },
  updatePartialConversationsList: (conversationsList) => {
    set((state) => {
      return {
        conversationsList: conversationsList
          .concat(state.conversationsList)
          .filter((v, i, a) => a.findIndex((e) => e.id === v.id) === i)
      }
    })
  },
  sendPrompt: async ({ prompt, message }) => {
    const isEditedMessage = !!message

    let selectedConversationIndex = get().conversationsList.findIndex(
      (elem) => elem.id === get().selectedConversationId
    )

    let selectedConversation =
      get().conversationsList[selectedConversationIndex]

    const userMessageID = crypto.randomUUID()
    const IAMessageID = crypto.randomUUID()

    let partialNewConversationMessages: Message[] = [
      {
        id: userMessageID,
        role: 'User',
        isFinished: true,
        isAI: false,
        content: prompt,
        parentId: '0',
        siblingsInclusive: [],
        conversationId: selectedConversation?.id ?? ''
      },
      {
        id: IAMessageID,
        role: 'System',
        isFinished: false,
        isAI: true,
        content: '',
        parentId: userMessageID,
        siblingsInclusive: [],
        conversationId: selectedConversation?.id ?? ''
      }
    ]

    if (isEditedMessage) {
      // const messagesSiblings = selectedConversation.filter( //Could just by reference get and update messages in a forEach || or use indexes
      const messagesSiblings = get().selectedMessages.filter(
        (e) => e.parentId === message.parentId
      )

      const siblingsIds = messagesSiblings.flatMap((e) => e.id)
      siblingsIds.push(userMessageID)

      selectedConversation.messages = selectedConversation.messages.map(
        (entry) => {
          if (siblingsIds.includes(entry.id)) {
            return { ...entry, siblingsInclusive: siblingsIds }
          }
          return entry
        }
      )
      // messagesSiblings.forEach((e) => (e.siblingsInclusive = siblingsIds)) //update by reference

      partialNewConversationMessages[0] = {
        ...message,
        id: userMessageID,
        siblingsInclusive: siblingsIds
      }
    }

    let fullChatMessages = partialNewConversationMessages

    if (!selectedConversation) {
      let uuID = crypto.randomUUID() as Id

      selectedConversationIndex = get().conversationsList.length

      partialNewConversationMessages = partialNewConversationMessages.map(
        (entry) => ({ ...entry, conversationId: uuID })
      )

      const newConversation: ConversationWithId = {
        ...defaultConversationInit,
        id: uuID,
        messages: partialNewConversationMessages,
        order: get().conversationsList.length //BC dnd tree doesn't have a index param
      }

      selectedConversation = newConversation

      set((state) => ({
        loading: true,
        selectedConversation,
        selectedMessages: partialNewConversationMessages,
        selectedConversationId: uuID,
        conversationsList: [...state.conversationsList, newConversation]
      }))
    } else {
      const oldLastMessage = get().lastMessage

      if (!isEditedMessage && oldLastMessage)
        partialNewConversationMessages[0].parentId = oldLastMessage.id

      fullChatMessages = [
        ...selectedConversation.messages,
        ...partialNewConversationMessages
      ]

      selectedConversation.messages = fullChatMessages

      set((state) => ({
        loading: true,
        selectedMessages: [...fullChatMessages],
        conversationsList: [...state.conversationsList]
      }))
    }

    const newLastMessage = partialNewConversationMessages[1]

    // if (!lastMessage) {
    //   set(() => ({ loading: false }))

    //   return selectedConversation.id
    // }

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: fullChatMessages })
    })

    if (!response.ok) {
      const error = await response.json()
      console.log('EL ERROR', error)
      set((state) => {
        if (newLastMessage) {
          partialNewConversationMessages[0].error = true
          newLastMessage.error = true
          // lastMessage.content = 'que fue mano'
        }

        selectedConversation.previewLastMessage =
          'An error occurred. Please try again later...'

        state.conversationsList[selectedConversationIndex] =
          structuredClone(selectedConversation)

        return {
          loading: false,
          selectedConversation: structuredClone(selectedConversation),
          selectedMessages: [...state.selectedMessages],
          selectedConversationId: selectedConversation.id,
          conversationsList: [...state.conversationsList]
        }
      })
      throw new Error('Error in the server')
    }

    const data = response.body

    if (!data) {
      throw new Error('No data in the server')
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()

    let done = false

    let text = ''

    while (!done) {
      const { value, done: readerDone } = await reader.read()

      if (readerDone) {
        newLastMessage.isFinished = true
        done = true
      }

      let chunkValue = decoder.decode(value)

      text += chunkValue

      newLastMessage.content = text

      selectedConversation.previewLastMessage = text
        .trim()
        .substring(0, 40)
        .trim()

      set((state) => {
        state.conversationsList[selectedConversationIndex] =
          structuredClone(selectedConversation)

        return {
          loading: !done,
          selectedConversation: structuredClone(selectedConversation),
          selectedMessages: [...state.selectedMessages],
          selectedConversationId: selectedConversation.id,
          conversationsList: [...state.conversationsList]
        }
      })
    }

    return selectedConversation.id
  }
})
