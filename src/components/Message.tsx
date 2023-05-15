import { Avatar } from '@/components/Avatar'
import {
  ChatGPTLogo,
  CheckIcon,
  ClipboardIcon,
  FilledArrowIcon,
  PencilIcon,
  TrashIcon
} from '@/components/Icons'
import { TypingEffect } from '@/components/TypingEffect'
import { UserAvatar } from '@/components/UserAvatar'
import { useStore } from '@/store/boundStore'
import { Message as MessageType } from '@/type'
import { autoHeightOnTyping } from '@/utils/helper'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import { useRouter } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import snarkdown from 'snarkdown'
import { ErrorMessage } from './ErrorMessage'

export interface Props {
  message: MessageType
  index: number
  setMessageSelected: Dispatch<SetStateAction<MessageType | undefined>>
  setIndexMessageSiblingSelected: Dispatch<
    SetStateAction<number | undefined | null>
  >
}

const DIRECTION_TYPE = Object.freeze({
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
})

export const Message: React.FC<Props> = ({
  message,
  index,
  setMessageSelected,
  setIndexMessageSiblingSelected
}) => {
  const {
    id,
    isAI,
    content,
    error,
    isFinished,
    siblingsInclusive,
    parentId,
    conversationId
  } = message

  const [text, setText] = useState<string>(content)

  const [isHydrated, setIsHydrated] = useState(false)
  const [isMessagedCopied, setIsMessageCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const { replace } = useRouter()

  const sendPrompt = useStore((state) => state.sendPrompt)

  const removeConversation = useStore((state) => state.removeConversation)

  const selectedMessages = useStore((state) => state.selectedMessages)

  const removeContiguousMessages = useStore(
    (state) => state.removeContiguousMessages
  )

  const handleRemoveMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMessageSelected(undefined)
    removeContiguousMessages({ id, index })

    if (!siblingsInclusive.length && selectedMessages.length === 2) {
      removeConversation({ id: conversationId })
      replace('/chat')
    }
  }

  // if (!isHydrated) return <></>

  const avatar = isAI ? <ChatGPTLogo /> : <UserAvatar />

  const textElement = useMemo(() => {
    return isAI ? (
      <TypingEffect text={content} isFinished={isFinished} />
    ) : (
      <div
        className='pl-1'
        dangerouslySetInnerHTML={{
          __html: snarkdown(content)
        }}
      />
    )
  }, [content, isFinished])

  useEffect(() => {
    hljs.highlightAll()
  }, [textElement])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    event.stopPropagation()
    autoHeightOnTyping(event.target)
  }

  const handleFocusTextArea = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    event.currentTarget.setSelectionRange(
      event.currentTarget.value.length,
      event.currentTarget.value.length
    )
  }

  const textAreaMessage = (
    <>
      <textarea
        onChange={handleChange}
        ref={textAreaRef}
        defaultValue={content}
        autoFocus
        onFocus={handleFocusTextArea}
        className='m-0 resize-none pl-1 border-0 bg-transparent p-0 focus:ring-1 focus:ring-blue-500 outline-none text-base rounded-sm'
      />

      <div className='text-center mt-2 flex justify-center text-sm'>
        <button className='bg-gptlogo relative py-2 px-3 rounded mr-2 text-white border-transparent border hover:bg-gptJungleGreen'>
          <div className='flex w-full items-center justify-center gap-2'>
            Save &amp; Submit
          </div>
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className='border relative py-2 px-3 rounded border-gptGunmetal hover:bg-gptlightgray'
        >
          <div className='flex w-full items-center justify-center gap-2'>
            Cancel
          </div>
        </button>
      </div>
    </>
  )

  const renderContent = () => {
    if (error) return <ErrorMessage />

    if (isEditing) return textAreaMessage

    return textElement
  }

  const copyOnClick = () => {
    if (!navigator.clipboard) return

    navigator.clipboard.writeText(content).then(() => {
      setIsMessageCopied(true)
      setTimeout(() => {
        setIsMessageCopied(false)
      }, 2000)
    })
  }

  const showFractionalNumbers = () => {
    const { id, siblingsInclusive } = message
    const currentNumber = siblingsInclusive.findIndex((e) => e === id) + 1
    return `${currentNumber} / ${siblingsInclusive.length}`
  }

  const renderIconButtonActions = () => {
    if (isEditing) return
    if (isAI) {
      if (isMessagedCopied) {
        return <CheckIcon />
      }
      return (
        <button
          onClick={copyOnClick}
          className='text-gray-400 hover:text-white transiton-all invisible group-hover:visible focus:visible dark:text-gray-400 dark:hover:text-gray-300'
        >
          <ClipboardIcon />
        </button>
      )
    }

    return (
      <>
        <button
          onClick={(e) => {
            setIsEditing(true)
          }}
          className='text-gray-400 hover:text-white transiton-all invisible group-hover:visible focus:visible dark:text-gray-400 dark:hover:text-gray-300'
        >
          <PencilIcon />
        </button>
        <button
          className='text-gray-400 hover:text-white transiton-all invisible group-hover:visible focus:visible dark:text-gray-400 dark:hover:text-gray-300'
          onClick={handleRemoveMessage}
        >
          <TrashIcon />
        </button>
      </>
    )
  }

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    event?.stopPropagation()

    const value = textAreaRef.current?.value || ''

    const obj = { ...message, content: value }
    sendPrompt({ prompt: value, message: obj })
    setMessageSelected(undefined)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Escape') {
      event?.preventDefault()

      return
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event?.preventDefault()
      handleSubmit()
    }
  }

  const handleSiblingSelection = ({
    directionType
  }: {
    directionType: keyof typeof DIRECTION_TYPE
  }) => {
    const { siblingsInclusive } = message
    let indexSelected = siblingsInclusive.findIndex((e) => e === id)

    if (directionType === DIRECTION_TYPE.LEFT) indexSelected -= 1
    else indexSelected += 1

    setIndexMessageSiblingSelected(indexSelected)

    const nextMessageSelected = selectedMessages.find(
      (e) => e.id === siblingsInclusive[indexSelected]
    )

    setMessageSelected(nextMessageSelected)
  }

  const renderFractionalNumbers = () => {
    const indexSelected = siblingsInclusive.findIndex((e) => e === id)

    return siblingsInclusive.length > 1 ? (
      <div className='text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible visible'>
        <button
          disabled={indexSelected === 0}
          onClick={() =>
            handleSiblingSelection({ directionType: DIRECTION_TYPE.LEFT })
          }
          className='dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400'
        >
          <FilledArrowIcon className='h-3 w-3 rotate-180' fill='currentColor' />
        </button>

        <span className='flex-grow flex-shrink-0'>
          {showFractionalNumbers()}
        </span>

        <button
          disabled={indexSelected >= siblingsInclusive.length - 1}
          onClick={() =>
            handleSiblingSelection({ directionType: DIRECTION_TYPE.RIGHT })
          }
          className='dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400'
        >
          <FilledArrowIcon className='h-3 w-3' fill='currentColor' />
        </button>
      </div>
    ) : (
      <></>
    )
  }

  return (
    <div
      className={`text-gray-100 group  ${
        isAI ? 'bg-gptlightgray' : 'bg-gptgray'
      }`}
    >
      <article className='flex max-w-3xl gap-4 p-6 m-auto '>
        <div className='flex-shrink-0 flex flex-col relative items-end'>
          <Avatar>{avatar}</Avatar>
          {renderFractionalNumbers()}
        </div>
        <div className='min-h-[20px] flex flex-1 items-start gap-4 whitespace-pre-wrap'>
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className='flex flex-grow flex-col gap-3'
          >
            {renderContent()}
          </form>
          <div className='md:-mr-8 ml-1 md:ml-0 flex flex-col md:flex-row gap-4 md:gap-1 items-center md:items-start justify-end md:justify-start'>
            {renderIconButtonActions()}
          </div>
        </div>
      </article>
    </div>
  )
}
