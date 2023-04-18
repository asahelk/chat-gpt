// Replace this with the path to your actual autoHeightOnTyping utility function
import { CheckIcon, CloseIcon, PencilIcon, TrashIcon } from '@/components/Icons'
import { autoHeightOnTyping } from '@/utils/helper'
import { useEffect, useRef, useState } from 'react'

export function useChatComponent({
  id,
  title,
  isFav,
  className,
  callbackOnSubmit,
  removeCallback
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [chatTitle, setChatTitle] = useState(title)
  const textAreaRef = useRef()

  function onHandleEditCheckButton() {
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

  const handleChange = (event) => {
    event.preventDefault()
    event.stopPropagation()
    autoHeightOnTyping(event.target)
  }

  const handleInputClick = (event) => {
    event?.preventDefault()
    event?.stopPropagation()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e?.preventDefault()

      handleSubmit()
    }
  }

  const handleSubmit = (event) => {
    event?.preventDefault()
    const { value } = textAreaRef.current
    callbackOnSubmit({ id, name: value, isFavorite: isFav })
    setChatTitle(value)
    setIsEditing(!isEditing)
  }

  const handleFocusTextArea = (event) => {
    event.currentTarget.setSelectionRange(
      event.currentTarget.value.length,
      event.currentTarget.value.length
    )
  }

  const RenderEditCheckIcon = isEditing ? <CheckIcon /> : <PencilIcon />
  const RenderTrashCloseIcon = isEditing ? <CloseIcon /> : <TrashIcon />

  useEffect(() => {
    const el = textAreaRef?.current

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
          className={`${className} absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l group-focus-within:from-gptCharcoalGray from-gptdarkgray group-hover:from-gpt-midnight-blue`}
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
