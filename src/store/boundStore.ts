import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { ConversationState, createConversationSlice } from './conversationSlice'
import { FolderState, createFolderSlice } from './folderSlice'
import { WebState, createWebSlice } from './webSlice'

export type StoreState = FolderState & ConversationState & WebState

const emptyState = (
  ...a: Parameters<typeof createConversationSlice>
): StoreState => ({
  ...createFolderSlice(...a),
  ...createConversationSlice(...a),
  ...createWebSlice(...a)
})

export const useStore = create<StoreState>()(
  devtools(
    persist(emptyState, {
      name: 'gpt-store',
      storage: createJSONStorage(() => ({
        // Returning a promise from getItem is necessary to avoid issues with hydration
        getItem: async (name) => {
          // const isServer = typeof window === 'undefined'
          // if (isServer) return

          // const value = localStorage?.getItem(name)
          // return value
          return localStorage?.getItem(name)
        },

        setItem: (name, value) => localStorage?.setItem(name, value),
        removeItem: (name) => localStorage?.removeItem(name)
      })),
      version: 1,
      onRehydrateStorage: (state) => {
        console.log('hydration starts')

        // optional
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration' /*error*/)
          } else {
            console.log('hydration finished')
          }
        }
      },

      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              ![
                'stopConversation',
                'lastMessage',
                'selectedConversationId',
                'selectedConversation',
                'selectedMessages',
                'loading'
              ].includes(key)
            // !['selectedConversation', 'selectedConversationId'].includes(key)
          )
        )
    })
  )
)

// export const useStore = ((selector, compare) => {
//   /*
//     This a fix to ensure zustand never hydrates the store before React hydrates the page.
//     Without this, there is a mismatch between SSR/SSG and client side on first draw which produces
//     an error.
//      */
//   const store = useBoundStore(selector, compare)
//   const [isHydrated, setHydrated] = useState(false)
//   useEffect(() => setHydrated(true), [])

//   if (isHydrated) {
//     console.log('isHydrated xD')
//     return store
//   }
//   console.log('NUNCA ENTRO AQUI xD')
//   return selector(emptyState2)
// }) as typeof useBoundStore

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}
