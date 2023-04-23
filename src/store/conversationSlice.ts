import {
  type Conversation,
  type ConversationWithId,
  type Id,
  type Message
} from '@/type'

import { defaultConversationInit } from '@/utils/initObjects'
import { compress } from 'lz-ts'
import { StateCreator } from 'zustand'
import { ForlderState } from './folderSlice'

export interface ConversationState {
  loading: boolean
  conversationsList: ConversationWithId[]
  selectedConversationId?: Id | null
  removeConversation: ({ id }: { id: Id }) => void
  addNewConversation: (conversation: Conversation) => void
  updateConversation: (conversation: ConversationWithId) => void
  clearConversations: () => void
  selectConversation: ({ id }: { id: Id }) => void
  sendPrompt: ({ prompt }: { prompt: string }) => void
}

export const createConversationSlice: StateCreator<
  ForlderState & ConversationState,
  [],
  [],
  ConversationState
> = (set, get) => ({
  loading: false,
  conversationsList: [],
  selectedConversationId: null,
  selectConversation: ({ id }: { id: Id }) => {
    set(() => ({ selectedConversationId: id }))
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

    set((state) => ({
      conversationsList: state.conversationsList.filter(
        (conversation: ConversationWithId) => conversation.id !== id
      )
    }))
  },
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
    set((state) => ({
      ...state,
      ...conversation
    }))
  },
  sendPrompt: async ({ prompt }) => {
    // let selectedConversationId = get().selectedConversationId
    let selectedConversation = get().conversationsList.find(
      (elem) => elem.id === get().selectedConversationId
    )

    const userMessageID = crypto.randomUUID()
    const IAMessageID = crypto.randomUUID()

    const partialNewConversationMessages: Message[] = [
      {
        id: userMessageID,
        role: 'User',
        isAI: false,
        content: prompt
      },
      {
        id: IAMessageID,
        role: 'System',
        isAI: true,
        content: ''
      }
    ]

    let fullConversation = partialNewConversationMessages

    if (selectedConversation === null && selectedConversation === undefined) {
      let uuID = crypto.randomUUID() as Id

      const newConversation: ConversationWithId = {
        ...defaultConversationInit,
        id: uuID,
        messages: partialNewConversationMessages
      }

      set((state) => ({
        loading: true,
        selectedConversationId: uuID,
        conversationsList: [...state.conversationsList, newConversation]
      }))
    } else {
      let selectedConversationIndex = get().conversationsList.findIndex(
        (elem) => elem.id === get().selectedConversationId
      )

      set((state) => {
        fullConversation = [
          ...(state.conversationsList[selectedConversationIndex]
            .messages as Message[]),
          ...partialNewConversationMessages
        ]

        if (selectedConversation != null || selectedConversation != undefined) {
          selectedConversation.messages = fullConversation
        }

        return {
          loading: true,
          conversationsList: [
            ...state.conversationsList,
            selectedConversation as ConversationWithId
          ]
        }
      })
    }

    const compressedConversation = compress(JSON.stringify(fullConversation))

    try {
      const eventSource = new EventSource(
        '/api/chat?prompt=' + prompt + '&conversation=' + compressedConversation
      )
      let message = ''

      eventSource.onerror = () => {
        set((state) => {
          if (
            selectedConversation !== null ||
            selectedConversation !== undefined
          ) {
            selectedConversation = selectedConversation as ConversationWithId
            if (
              selectedConversation.messages == null ||
              selectedConversation.messages == undefined
            )
              return {}

            const lastMessage = selectedConversation?.messages.length - 1
            selectedConversation.messages[lastMessage].error = true
            selectedConversation.messages[lastMessage].content = message
          }

          return {
            loading: false,
            conversationsList: [
              ...state.conversationsList,
              selectedConversation as ConversationWithId
            ]
          }
        })
      }

      eventSource.onmessage = (event) => {
        if (event.data === '[DONE]') {
          set(() => ({ loading: false }))

          eventSource.close()
          return
        }

        message += JSON.parse(event.data)

        // Actualizar el mensaje de la IA
        // que tenía el mensaje vacio,
        // con el texto completo
        set((state) => {
          if (
            selectedConversation !== null ||
            selectedConversation !== undefined
          ) {
            selectedConversation = selectedConversation as ConversationWithId
            if (
              selectedConversation.messages == null ||
              selectedConversation.messages == undefined
            )
              return {}

            const lastMessage = selectedConversation.messages.length - 1
            selectedConversation.messages[lastMessage].content = message
          }

          return {
            conversationsList: [
              ...state.conversationsList,
              selectedConversation as ConversationWithId
            ]
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
})
