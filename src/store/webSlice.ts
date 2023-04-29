import { StateCreator } from 'zustand'
import { StoreState } from './boundStore'

export interface WebState {
  isShowNavOpen: boolean
  searchTerm: string
  setIsShowNavOpen: ({ value }: { value: boolean }) => void
  setSearchTerm: ({ value }: { value: string }) => void
}

export const createWebSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown]],
  [],
  WebState
> = (set) => ({
  isShowNavOpen: true,
  searchTerm: '',
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
