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
  messages?: Message[] | null
  model: string
  systemMessage: string
  character?: Character | null
  createdAt: string
  updatedAt?: string | null
  syncedAt?: string | null
  preview: string
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
  id: string
  role: string
  content: string
  usage?: Usage | null
  // finish: any
  isAI: boolean
  model?: string | null
  error?: boolean | null
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
