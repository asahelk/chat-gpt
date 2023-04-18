import { useChatComponent } from '@/app/hooks/useChatComponent'
import { useStore } from '@/store/boundStore'
import { ArrowDownIcon, ArrowRightIcon } from './Icons'

export function Folder({ id, title, isOpen, ...inputProps }) {
  const { onToggle, background = '', backgroundGradient = '' } = inputProps
  const removeFolder = useStore((state) => state.removeFolder)

  const updateFolder = useStore((state) => state.updateFolder)

  const { ElementTitle, RenderInputActions } = useChatComponent({
    id,
    title,
    className: backgroundGradient,
    callbackOnSubmit: updateFolder,
    removeCallback: removeFolder
  })

  const renderArrowIcon = isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />

  return (
    <div>
      <div
        {...inputProps}
        className={`${background} focus-within:bg-gptCharcoalGray focus-within:text-white text-gray-300 hover:bg-gpt-midnight-blue hover:text-white group flex items-center text-sm font-medium w-full space-x-2 justify-between overflow-hidden pl-2 pr-3`}
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
          <div className='space-y-1 text-left flex-1 min-w-0'>
            <div className='text-gray-100 w-full flex gap-1'>
              <div className='ml-1 whitespace-nowrap opacity-50'>(0 chats)</div>
              <div className='truncate w-full min-w-0'>{ElementTitle()}</div>
            </div>
          </div>
        </button>

        {RenderInputActions()}
      </div>

      {/* <div className='pl-6 space-y-2 relative hidden !block'>
        {showFolderDetails && <ConversationList />}
      </div> */}
    </div>
  )
}
