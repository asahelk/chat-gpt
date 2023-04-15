import { useEffect, useState } from 'react'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createConversationSlice } from './conversationSlice'
import { createFolderSlice } from './folderSlice'

const emptyState = (...a) => ({
  ...createFolderSlice(...a),
  ...createConversationSlice(...a)
})

export const useBoundStore = create(
  persist(emptyState, {
    name: 'gpt-store',
    storage: createJSONStorage(() => ({
      // Returning a promise from getItem is necessary to avoid issues with hydration
      getItem: async (name) => {
        // const isServer = typeof window === 'undefined'
        // if (isServer) return

        // const value = localStorage?.getItem(name)
        // return value
        return localStorage.getItem(name)
      },

      setItem: (name, value) => localStorage?.setItem(name, value),
      removeItem: (name) => localStorage?.removeItem(name)
    }))
  })
)

export const useStore = (selector, compare) => {
  /*
    This a fix to ensure zustand never hydrates the store before React hydrates the page.
    Without this, there is a mismatch between SSR/SSG and client side on first draw which produces
    an error.
     */
  const store = useBoundStore(selector, compare)
  const [isHydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return isHydrated ? store : selector(emptyState)
}

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useBoundStore)
}
