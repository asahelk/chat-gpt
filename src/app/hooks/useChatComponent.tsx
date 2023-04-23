// Replace this with the path to your actual autoHeightOnTyping utility function
import { CheckIcon, PencilIcon, TrashIcon } from '@/components/Icons'
import { autoHeightOnTyping } from '@/utils/helper'
import { useEffect, useRef, useState } from 'react'
import { ConversationWithId, FolderWithId, Id } from '../../type'

type ChatComponent = {
  id: Id
  title: string
  isFav?: boolean
  className: string
  callbackOnSubmit: (object: FolderWithId | ConversationWithId) => void
  removeCallback: ({ id }: { id: Id }) => void
}

export function useChatComponent({
  id,
  title,
  isFav,
  className,
  callbackOnSubmit,
  removeCallback
}: ChatComponent) {
  const [isEditing, setIsEditing] = useState(false)
  const [chatTitle, setChatTitle] = useState(title)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  function onHandleEditCheckButton(event: React.MouseEvent<HTMLButtonElement>) {
    setIsEditing(!isEditing)

    if (isEditing) {
      handleSubmit()
    }
  }

  const onHandleTrashCloseButton = () => {
    setIsEditing(false)

    if (!isEditing && removeCallback) {
      removeCallback({ id })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    event.stopPropagation()
    autoHeightOnTyping(event.target)
  }

  const handleInputClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event?.preventDefault()

      handleSubmit()
    }
  }

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    // const { value } = textAreaRef.current
    const value = textAreaRef.current?.value
    // callbackOnSubmit({ id, name: value, isFavorite: isFav })
    // setChatTitle(value)
    setIsEditing(!isEditing)
  }

  const handleFocusTextArea = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    event.currentTarget.setSelectionRange(
      event.currentTarget.value.length,
      event.currentTarget.value.length
    )
  }

  const RenderEditCheckIcon = isEditing ? <CheckIcon /> : <PencilIcon />
  const RenderTrashCloseIcon = isEditing ? <CheckIcon /> : <TrashIcon />

  useEffect(() => {
    const el = textAreaRef?.current as HTMLElement

    autoHeightOnTyping(el)
  }, [isEditing])

  const ElementTitle = () => {
    if (isEditing) {
      return (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <textarea
            onKeyUp={(e) => e.preventDefault()}
            onChange={handleChange}
            ref={textAreaRef}
            tabIndex={0}
            autoFocus
            onFocus={handleFocusTextArea}
            onClick={handleInputClick}
            defaultValue={chatTitle}
            className='text-white rounded-sm px-0 py-0 border-0 ring-blue-500 focus:ring-2 ring-2 sm:text-sm w-full text-base'
          />
        </form>
      )
    }

    return (
      <div className='relative flex-1 overflow-hidden break-all text-ellipsis max-h-5 w-full'>
        {chatTitle}
        <div
          className={`${className} absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l group-focus-within:from-gptCharcoalGray from-gptdarkgray group-hover:from-gptMidnightBlue`}
          data-gradient='true'
        />
      </div>
    )
  }

  const RenderInputActions = () => {
    return (
      <>
        <div className=''>
          <div className='flex items-center justify-center space-x-2'>
            <button
              onClick={onHandleEditCheckButton}
              className='text-gray-500 hover:text-white transiton-all'
            >
              {RenderEditCheckIcon}
            </button>

            <button
              className='text-gray-500 hover:text-white transiton-all'
              onClick={onHandleTrashCloseButton}
            >
              {RenderTrashCloseIcon}
            </button>
          </div>
        </div>
      </>
    )
  }

  return {
    isEditing,
    onHandleEditCheckButton,
    onHandleTrashCloseButton,
    handleChange,
    ElementTitle,
    RenderInputActions
  }
}
