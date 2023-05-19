import { StateCreator } from 'zustand'
import { StoreState } from './boundStore'

export interface WebState {
  isShowNavOpen: boolean
  searchTerm: string
  apiKey: string
  setIsShowNavOpen: ({ value }: { value: boolean }) => void
  setSearchTerm: ({ value }: { value: string }) => void
  setApiKey: ({ value }: { value: string }) => void
}

export const createWebSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown]],
  [],
  WebState
> = (set) => ({
  isShowNavOpen: true,
  searchTerm: '',
  apiKey: '',
  setApiKey: ({ value }) => set(() => ({ apiKey: value })),
  setIsShowNavOpen: ({ value }) =>
    set(() => ({
      isShowNavOpen: value
    })),
  setSearchTerm: ({ value }) => {
    set(() => ({
      searchTerm: value
    }))
  }
})
