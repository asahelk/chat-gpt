import { StateCreator } from 'zustand'
import { StoreState } from './boundStore'

export interface WebState {
  isShowNavOpen: boolean
  setIsShowNavOpen: ({ value }: { value: boolean }) => void
}

export const createWebSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown]],
  [],
  WebState
> = (set) => ({
  isShowNavOpen: true,
  setIsShowNavOpen: ({ value }: { value: boolean }) =>
    set(() => ({
      isShowNavOpen: value
    }))
})
