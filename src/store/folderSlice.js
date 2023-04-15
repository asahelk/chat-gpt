export const createFolderSlice = (set, get) => ({
  loading: false,
  foldersInfo: {},
  removeFolder: async ({ id }) => {
    set((state) => {
      const { [id]: __, ...foldersInfo } = state.foldersInfo

      return {
        foldersInfo
      }
    })
  },
  addNewFolder: async ({ folderName }) => {
    const uuID = crypto.randomUUID()

    set((state) => ({
      uuID,
      foldersInfo: {
        ...state.foldersInfo,
        [uuID]: {
          id: uuID,
          name: folderName
        }
      }
    }))
  },
  updateFolder: async (folder) => {
    set((state) => ({
      ...state,
      foldersInfo: {
        ...state.foldersInfo,
        [folder.id]: {
          ...folder
        }
      }
    }))
  }
})
