import { useChatComponent } from '@/app/hooks/useChatComponent'
import { useStore } from '@/store/boundStore'
import { ArrowDownIcon, ArrowRightIcon } from './Icons'

export function Folder({ id, title, isOpen, ...inputProps }) {
  const { onToggle } = inputProps

  const removeFolder = useStore((state) => state.removeFolder)

  const updateFolder = useStore((state) => state.updateFolder)

  const { ElementTitle, RenderInputActions } = useChatComponent({
    id,
    title,
    callbackOnSubmit: updateFolder,
    removeCallback: removeFolder
  })

  const renderArrowIcon = isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />
  return (
    <div>
      <div
        {...inputProps}
        className='focus-within:bg-[#18191a] focus-within:text-white text-gray-300 hover:bg-[#2A2B32] hover:text-white group flex items-center text-sm font-medium w-full space-x-2 justify-between overflow-hidden px-3'
        role='button'
        tabIndex='0'
        aria-disabled='false'
        aria-roledescription='sortable'
        aria-describedby='DndDescribedBy-1'
      >
        <button
          onClick={onToggle}
          className='flex items-center justify-start space-x-2 min-w-0 w-full py-2 text-sm'
        >
          {renderArrowIcon}
          <div className='space-y-1 text-left w-full min-w-0'>
            <div className='text-gray-100 w-full flex gap-1'>
              <div className='ml-1 whitespace-nowrap opacity-50'>(0 chats)</div>
              <div className='truncate w-full min-w-0'>{ElementTitle()}</div>
            </div>
          </div>
        </button>

        {RenderInputActions()}
      </div>
      <div className='pl-6 space-y-2 relative hidden !block'>
        {/* {showFolderDetails && <ConversationList />} */}
      </div>
    </div>
  )
}
