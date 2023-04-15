import { useStore } from '@/store/boundStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ConversationList } from './ConversationList'
import { FolderList } from './FolderList'
import { FolderIcon, SettingsIcon, TrashIcon } from './Icons'
import { NewChatButton } from './NewChatButton'
import { SearchChat } from './SearchChat'

export function SideNav({ className }) {
  const addNewFolder = useStore((state) => state.addNewFolder)

  const clearConversations = useStore((state) => state.clearConversations)

  const [animationParent] = useAutoAnimate()

  const placeHolderName = 'New folder'

  return (
    <>
      <aside
        className={`${className} lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-40 transition duration-300 h-full`}
      >
        {/* <nav className='flex-1 space-y-2 flex flex-col overflow-y-auto'> */}
        <div className='flex h-full min-h-0 flex-1 flex-col bg-gptdarkgray'>
          <div
            id='navbar'
            className='flex h-full  flex-1 flex-col overflow-y-auto pb-4'
          >
            <nav className='flex-1 space-y-2 bg-gptdarkgray flex flex-col px-2'>
              <div className='space-y-2 sticky z-30 top-0 bg-gptdarkgray py-2'>
                <div className='flex items-center justify-center space-x-2'>
                  <NewChatButton />
                  <button className='bg-gray-600/30 text-white group flex items-center justify-center rounded-md px-2 py-2 text-sm font-medium hover:bg-gray-500/50 transition-all w-12 shrink-0 h-10'>
                    <SettingsIcon />
                  </button>
                </div>
                <div className='relative flex items-center space-x-2'>
                  <SearchChat />
                  <button
                    className='text-gray-400 hover:text-white transiton-all flex items-center justify-center w-12 shrink-0 h-10'
                    onClick={() =>
                      addNewFolder({ folderName: placeHolderName })
                    }
                  >
                    <FolderIcon />
                  </button>
                </div>
              </div>
              <div className='max-h-[200px] overflow-auto'>
                <div className='text-gray-300 hover:bg-[#2A2B32] hover:text-white group text-sm font-medium w-full px-1 justify-between overflow-hidden'>
                  <ConversationList isFavoriteList />
                </div>
              </div>
              <hr className='h-px my-8 bg-gptlightgray border-0 ' />

              <div className='flex-col flex-1 overflow-y-auto mt-3'>
                <div
                  ref={animationParent}
                  className='flex flex-col gap-2 text-sm text-gray-100'
                >
                  <FolderList />
                  <ConversationList />
                </div>
              </div>
            </nav>
          </div>
          <div className='flex flex-col flex-shrink-0 bg-gptdarkgray p-3 border-t border-white/20 justify-center space-y-1'>
            <button
              onClick={clearConversations}
              className='flex items-center gap-3 px-3 py-3 text-sm text-white transition-colors duration-200 rounded-md cursor-pointer hover:bg-gray-500/10'
            >
              <TrashIcon />
              Clear conversations
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
