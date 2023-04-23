import { CHAT_TYPES } from '@/constants'
import { Conversation, Folder } from '@/type'

export const defaultConversationInit: Conversation = {
  parent: '0',
  text: 'New Conversation',
  droppable: false,
  messages: [],
  model: 'gpt-3.5-turbo',
  systemMessage: '',
  character: null,
  createdAt: new Date().toString(),
  updatedAt: null,
  syncedAt: null,
  preview: 'New Conversation',
  isFavorite: false,
  order: -1,
  chatType: CHAT_TYPES.CHAT,
  type: CHAT_TYPES.CHAT
}

export const defaultFolderInit: Folder = {
  parent: '0',
  text: 'New Folder',
  droppable: true,
  isNew: true,
  isOpen: false,
  createdAt: new Date().toString(),
  updatedAt: null,
  syncedAt: null,
  order: -1,
  chatType: CHAT_TYPES.FOLDER,
  type: CHAT_TYPES.FOLDER
}
