import { Folder, FolderWithId, Id } from '@/type'
import { StateCreator } from 'zustand'
import { ConversationState } from './conversationSlice'

export interface ForlderState {
  removeFolder: ({ id }: { id: Id }) => void
  addNewFolder: (folder: Folder) => void
  updateFolder: (folder: FolderWithId) => Promise<void>
  foldersList: FolderWithId[]
}

export const createFolderSlice: StateCreator<
  ForlderState & ConversationState,
  [],
  [],
  ForlderState
> = (set) => ({
  foldersList: [],
  removeFolder: ({ id }: { id: string }) =>
    set((state) => ({
      foldersList: state.foldersList.filter(
        (folder: FolderWithId) => folder.id !== id
      )
    })),
  addNewFolder: (folder: Folder) => {
    const uuID = crypto.randomUUID() as Id

    set((state) => ({
      foldersList: [...state.foldersList, { id: uuID, ...folder }]
    }))
  },
  updateFolder: async (folder: FolderWithId) => {
    set((state) => ({
      ...state,
      folder
    }))
  }
})
