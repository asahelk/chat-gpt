import { NodeModel } from '@minoru/react-dnd-treeview'

export type Id = string | number

export interface Folder {
  parent: Id
  text: string
  droppable: boolean
  isNew: boolean
  isOpen: boolean
  createdAt: string
  updatedAt?: string | null
  syncedAt?: string | null
  order: number
  chatType: CHAT_TYPES
  type: keyof CHAT_TYPES
}

export interface FolderWithId extends Folder {
  id: Id
}

export interface Conversation {
  parent: Id
  text: string
  droppable: boolean
  messages: Message[]
  filteredMessagesToShowInChat: Message[]
  model: string
  previewLastMessage: string
  systemMessage: string
  character?: Character | null
  createdAt: string
  updatedAt?: string | null
  syncedAt?: string | null
  // preview: string
  isFavorite: boolean
  order: number
  chatType: CHAT_TYPES
  type: keyof CHAT_TYPES
}

export interface ConversationWithId extends Conversation {
  id: Id
}

export interface Character {
  id: string
  title: string
  instruction: string
  description: string
  color: string
  createdAt: string
  lastUsedAt: string
}

export interface Message {
  id: Id
  role: string
  content: string
  usage?: Usage | null
  isFinished: boolean
  isAI: boolean
  model?: string | null
  error?: boolean | null
  conversationId: Id
  parentId: Id
  siblingsInclusive: Id[]
}

export interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export type CustomData = {
  fileType: string
  fileSize: string
}

export type TreeModel = ConversationWithId | FolderWithId

export interface NodeEntity<T = unknown> extends NodeModel<T> {
  data: T
}
