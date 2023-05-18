import { useStore } from '@/store/boundStore'
import { defaultFolderInit } from '@/utils/initObjects'
import { MultiBackend, getBackendOptions } from '@minoru/react-dnd-treeview'
import { DndProvider } from 'react-dnd'
import { ApiKeyOpenAIButton } from './ApiKeyOpenAIButton'
import { ClearAllConversations } from './ClearAllConversationsButton'
import { ConversationList } from './ConversationList'
import { FolderIcon, SettingsIcon } from './Icons'
import { NewChatButton } from './NewChatButton'
import { SearchChat } from './SearchChat'
import { TreeSideNav } from './TreeSideNav'

interface Props {
  className?: string | ''
}

export const SideNav: React.FC<Props> = ({ className }) => {
  const addNewFolder = useStore((state) => state.addNewFolder)

  const isShowNavOpen = useStore((state) => state.isShowNavOpen)

  const sideNavClassName = isShowNavOpen
    ? '!translate-x-0 '
    : '-translate-x-full '

  return (
    <>
      <aside
        className={`${sideNavClassName} ${className} lg:inset-y-0 lg:flex min-[370px]:w-80 w-64 lg:flex-col z-40 transition h-full`}
      >
        {/* <nav className='flex-1 space-y-2 flex flex-col overflow-y-auto'> */}
        <div className='flex h-full min-h-0 flex-1 flex-col bg-gptdarkgray'>
          <div
            id='navbar'
            className='flex h-full flex-1 flex-col overflow-y-auto pb-4'
          >
            <nav className='flex-1 bg-gptdarkgray flex flex-col'>
              <div className='space-y-2 sticky z-30 top-0 bg-gptdarkgray py-2 px-2'>
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
                    onClick={() => addNewFolder(defaultFolderInit)}
                  >
                    <FolderIcon />
                  </button>
                </div>
              </div>
              <div className='px-2'>
                <div className='max-h-[200px] overflow-auto'>
                  <div className='text-gray-300 hover:bg-gptMidnightBlue hover:text-white group text-sm font-medium w-full justify-between overflow-hidden'>
                    <ConversationList isFavoriteList />
                  </div>
                </div>
                <hr className='h-px my-2 bg-gptlightgray border-0 ' />
              </div>
              <div className='flex-col flex-1 overflow-y-auto mt-1'>
                <div className='flex flex-col h-full gap-2 text-sm text-gray-100'>
                  <DndProvider
                    backend={MultiBackend}
                    options={getBackendOptions()}
                  >
                    <TreeSideNav />
                  </DndProvider>
                </div>
              </div>
            </nav>
          </div>
          <div className='flex flex-col flex-shrink-0 bg-gptdarkgray p-3 border-t border-white/20 justify-center space-y-1'>
            <ClearAllConversations />
            <ApiKeyOpenAIButton />
          </div>
        </div>
      </aside>
    </>
  )
}
