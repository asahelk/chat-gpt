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
  removeConversation: ({ id }: { id: Id }) => void
  addNewConversation: (conversation: Conversation) => void
  updateConversation: (conversation: ConversationWithId) => void
  updateConversationsList: (conversationsList: ConversationWithId[]) => void
  updatePartialConversationsList: (
    conversationsList: ConversationWithId[]
  ) => void
  clearConversations: () => void
  setConversation: ({ id }: { id: Id | null }) => void
  sendPrompt: ({ prompt }: { prompt: string }) => Promise<Id>
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
  setConversation: ({ id }: { id: Id | null }) => {
    const conversation = get().conversationsList.find((e) => e.id === id)
    set(() => ({
      selectedConversationId: id,
      selectedConversation: conversation
    }))
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

      return {
        conversationsList: [...state.conversationsList]
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
  sendPrompt: async ({ prompt }) => {
    let selectedConversationIndex = get().conversationsList.findIndex(
      (elem) => elem.id === get().selectedConversationId
    )

    let selectedConversation =
      get().conversationsList[selectedConversationIndex]

    const userMessageID = crypto.randomUUID()
    const IAMessageID = crypto.randomUUID()

    const partialNewConversationMessages: Message[] = [
      {
        id: userMessageID,
        role: 'User',
        isFinished: true,
        isAI: false,
        content: prompt
      },
      {
        id: IAMessageID,
        role: 'System',
        isFinished: false,
        isAI: true,
        content: ''
      }
    ]

    let fullChatMessages = partialNewConversationMessages

    if (!selectedConversation) {
      let uuID = crypto.randomUUID() as Id

      selectedConversationIndex = get().conversationsList.length

      const newConversation: ConversationWithId = {
        ...defaultConversationInit,
        id: uuID,
        messages: partialNewConversationMessages
      }

      selectedConversation = newConversation

      set((state) => ({
        loading: true,
        selectedConversation,
        // selectedConversationId: uuID,
        conversationsList: [...state.conversationsList, newConversation]
      }))
    } else {
      fullChatMessages = [
        ...selectedConversation.messages,
        ...partialNewConversationMessages
      ]

      selectedConversation.messages = fullChatMessages

      set((state) => ({
        loading: true,
        conversationsList: [...state.conversationsList]
      }))
    }

    const compressedConversation = JSON.stringify(fullChatMessages)

    try {
      const eventSource = new EventSource(
        '/api/chat?prompt=' + prompt + '&conversation=' + compressedConversation
      )
      let message = ''

      eventSource.onerror = (e) => {
        console.log('el error', e)

        set((state) => {
          if (selectedConversation) {
            selectedConversation.messages = selectedConversation.messages.map(
              (entry) => {
                if (entry.id === IAMessageID) {
                  return {
                    ...entry,
                    error: true,
                    content: message
                  }
                }
                return entry
              }
            )
          }

          state.conversationsList[selectedConversationIndex].messages = [
            ...selectedConversation.messages
          ]

          return {
            loading: false,
            selectedConversation: structuredClone(selectedConversation),
            selectedConversationId: selectedConversation.id,
            conversationsList: [...state.conversationsList]
          }
        })
      }

      eventSource.onmessage = (event) => {
        const lastMessage = selectedConversation.messages.find(
          (e) => e.id === IAMessageID
        )

        if (!lastMessage) {
          set(() => ({ loading: false }))

          eventSource.close()
          return
        }

        if (event.data === '[DONE]') {
          lastMessage.isFinished = true

          set((state) => {
            state.conversationsList[selectedConversationIndex] =
              structuredClone(selectedConversation)

            return {
              loading: false,
              selectedConversation: structuredClone(selectedConversation),
              selectedConversationId: selectedConversation.id,
              conversationsList: [...state.conversationsList]
            }
          })

          eventSource.close()
          return
        }

        message += JSON.parse(event.data)
        lastMessage.content = message

        selectedConversation.previewLastMessage = message
          .trim()
          .substring(0, 50)

        set((state) => {
          state.conversationsList[selectedConversationIndex] =
            structuredClone(selectedConversation)

          return {
            loading: true,
            selectedConversation: structuredClone(selectedConversation),
            selectedConversationId: selectedConversation.id,
            conversationsList: [...state.conversationsList]
          }
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      set(() => ({
        loading: false
      }))
    }
    return selectedConversation.id
  }
})
