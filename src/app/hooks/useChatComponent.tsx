import { CheckIcon, CloseIcon, PencilIcon, TrashIcon } from '@/components/Icons'
import { CHAT_TYPES } from '@/constants'
import { Id } from '@/type'
import { autoHeightOnTyping } from '@/utils/helper'
import { useEffect, useRef, useState } from 'react'
import { useTreeSideNav } from './useTreeSideNav'

type ChatComponent<T> = {
  id: Id
  title: string
  type: keyof typeof CHAT_TYPES
  className: string
  previewLastMessage: string
  callbackOnSubmit: (object: T) => void
  removeCallback: ({ id }: { id: Id }) => void
}

export function useChatComponent<T>({
  id,
  title,
  className,
  type,
  previewLastMessage,
  callbackOnSubmit,
  removeCallback
}: ChatComponent<T>) {
  const ACTION_STATUS = {
    IS_EDITING: 'IS_EDITING',
    IS_REMOVING: 'IS_REMOVING',
    NORMAL: 'NORMAL'
  }

  const [currentStatus, setCurrentStatus] = useState(ACTION_STATUS.NORMAL)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { updateConversationsOnRemoveFolder } = useTreeSideNav()

  useEffect(() => {
    if (currentStatus === ACTION_STATUS.IS_EDITING) {
      const el = textAreaRef?.current as HTMLElement

      autoHeightOnTyping(el)
    }
  }, [currentStatus === ACTION_STATUS.IS_EDITING])

  const onHandleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    if (removeCallback) {
      removeCallback({ id })

      if (type === CHAT_TYPES.FOLDER) updateConversationsOnRemoveFolder({ id })
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
    if (event.key === 'Escape') {
      event?.preventDefault()
      setCurrentStatus(ACTION_STATUS.NORMAL)
      return
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event?.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    setCurrentStatus(ACTION_STATUS.NORMAL)

    const value = textAreaRef.current?.value || ''

    if (title && title.toLocaleLowerCase() === value.toLocaleLowerCase()) return

    const obj = { id, text: value } as T
    callbackOnSubmit(obj)
  }

  const handleFocusTextArea = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    event.currentTarget.setSelectionRange(
      event.currentTarget.value.length,
      event.currentTarget.value.length
    )
  }

  const ButtonsActions = {
    [ACTION_STATUS.NORMAL]: (
      <>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setCurrentStatus(ACTION_STATUS.IS_EDITING)
          }}
          className='text-gray-500 hover:text-white transiton-all'
        >
          <PencilIcon />
        </button>
        <button
          className='text-gray-500 hover:text-white transiton-all'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setCurrentStatus(ACTION_STATUS.IS_REMOVING)
          }}
        >
          <TrashIcon />
        </button>
      </>
    ),
    [ACTION_STATUS.IS_EDITING]: (
      <>
        <button
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            handleSubmit()
          }}
          className='text-gray-500 hover:text-white transiton-all'
        >
          <CheckIcon />
        </button>
        <button
          className='text-gray-500 hover:text-white transiton-all'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setCurrentStatus(ACTION_STATUS.NORMAL)
          }}
        >
          <CloseIcon />
        </button>
      </>
    ),
    [ACTION_STATUS.IS_REMOVING]: (
      <>
        <button
          onClick={onHandleRemove}
          className='text-gray-500 hover:text-white transiton-all'
        >
          <CheckIcon />
        </button>
        <button
          className='text-gray-500 hover:text-white transiton-all'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setCurrentStatus(ACTION_STATUS.NORMAL)
          }}
        >
          <CloseIcon />
        </button>
      </>
    )
  }

  const ElementTitle = () => {
    if (currentStatus === ACTION_STATUS.IS_EDITING) {
      return (
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className='w-full flex flex-1 flex-col '
        >
          <textarea
            onKeyUp={(e) => e.preventDefault()}
            onChange={handleChange}
            ref={textAreaRef}
            tabIndex={0}
            autoFocus
            onFocus={handleFocusTextArea}
            onClick={handleInputClick}
            defaultValue={title}
            className='text-white rounded-sm px-0 py-0 focus:ring-blue-500 focus:ring-1 sm:text-sm w-full text-base border-0 outline-none '
          />
          <span
            dangerouslySetInnerHTML={{
              __html: previewLastMessage
            }}
            className='font-extralight text-xs text-gray-400'
          />
        </form>
      )
    }

    return (
      <div className='relative flex flex-1 flex-col overflow-hidden break-all text-ellipsis min-h-[20px] w-full'>
        <span className='truncate'>{title}</span>
        <span
          dangerouslySetInnerHTML={{
            __html: previewLastMessage
          }}
          className='font-extralight text-xs truncate text-gray-400'
        />

        <div
          className={`${className} absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l group-focus-within:from-gptCharcoalGray  group-hover:from-gptMidnightBlue`}
          data-gradient='true'
        />
      </div>
    )
  }

  const RenderButtonsActions = () => {
    return (
      <>
        <div className='pr-3'>
          <div className='flex items-center justify-center space-x-2'>
            {ButtonsActions[currentStatus]}
          </div>
        </div>
      </>
    )
  }

  return {
    currentStatus,
    ElementTitle,
    RenderButtonsActions
  }
}
