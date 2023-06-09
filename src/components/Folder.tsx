import { useChatComponent } from '@/app/hooks/useChatComponent'
import { useTreeSideNav } from '@/app/hooks/useTreeSideNav'
import { CHAT_TYPES } from '@/constants'
import { useStore } from '@/store/boundStore'
import type { FolderWithId } from '@/type'
import { ArrowDownIcon, ArrowRightIcon } from './Icons'

interface Props {
  folder: FolderWithId
  background?: string
  bggradient?: string
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Folder: React.FC<Props> = ({
  folder,
  onToggle,
  ...inputProps
}) => {
  const { background = '', bggradient = '' } = inputProps

  const removeFolder = useStore((state) => state.removeFolder)
  const updateFolder = useStore((state) => state.updateFolder)

  const { filteredSearch } = useTreeSideNav()
  const chatsQuantity = filteredSearch?.filter(
    (e) => e.parent === folder.id
  ).length

  const { ElementTitle, RenderButtonsActions } = useChatComponent<FolderWithId>(
    {
      id: folder.id,
      title: folder.text,
      className: bggradient,
      type: CHAT_TYPES.FOLDER,
      callbackOnSubmit: (folder) => updateFolder(folder),
      removeCallback: removeFolder,
      previewLastMessage: ''
    }
  )

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    // onToggle(event)
    updateFolder({
      ...folder,
      isOpen: !folder.isOpen
    })
  }

  const renderArrowIcon = folder.isOpen ? <ArrowDownIcon /> : <ArrowRightIcon />

  return (
    <div
      {...inputProps}
      className={`${background} focus-within:bg-gptCharcoalGray focus-within:text-white text-gray-300 hover:bg-gptMidnightBlue hover:text-white group flex items-center text-sm font-medium w-full space-x-2 justify-between overflow-hidden min-h-[50px]`}
      role='button'
      tabIndex={0}
      aria-disabled='false'
      aria-roledescription='sortable'
      aria-describedby='DndDescribedBy-1'
    >
      <button
        onClick={handleClick}
        className='flex items-center justify-start space-x-2 min-w-0 w-full py-2 text-sm pl-2'
      >
        {renderArrowIcon}
        <div className='space-y-1 text-left flex-1 min-w-0'>
          <div className='text-gray-100 w-full flex gap-1'>
            <div className='ml-1 whitespace-nowrap opacity-50'>
              ({chatsQuantity} chats)
            </div>
            <div className='w-full min-w-0'>{ElementTitle()}</div>
          </div>
        </div>
      </button>

      {RenderButtonsActions()}
    </div>
  )
}
