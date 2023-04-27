import { Folder, FolderWithId, Id } from '@/type'
import { StateCreator } from 'zustand'
import { StoreState } from './boundStore'

export interface FolderState {
  foldersList: FolderWithId[]
  removeFolder: ({ id }: { id: Id }) => void
  addNewFolder: (folder: Folder) => void
  updateFolder: (folder: FolderWithId) => Promise<void>
  updateFoldersList: (foldersList: FolderWithId[]) => Promise<void>
}

export const createFolderSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown]],
  [],
  FolderState
> = (set) => ({
  foldersList: [],
  removeFolder: ({ id }: { id: Id }) =>
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
    set((state) => {
      const index = state.foldersList.findIndex((e) => e.id === folder.id)

      state.foldersList[index] = {
        ...state.foldersList[index],
        ...folder
      }
      return {
        foldersList: [...state.foldersList]
      }
    })
  },
  updateFoldersList: async (foldersList: FolderWithId[]) => {
    set(() => {
      return {
        foldersList: foldersList
      }
    })
  }
})
