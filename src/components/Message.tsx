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
import 'highlight.js/styles/atom-one-dark.css'
import { useEffect, useState } from 'react'
import snarkdown from 'snarkdown'
import { ErrorMessage } from './ErrorMessage'

export interface Props {
  message: MessageType
}

export const Message: React.FC<Props> = ({ message }) => {
  const { id, isAI, content, error, isFinished } = message

  const [isHydrated, setIsHydrated] = useState(false)
  const [isMessagedCopied, setIsMessageCopied] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const removeContiguousMessages = useStore(
    (state) => state.removeContiguousMessages
  )

  const handleRemoveMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    removeContiguousMessages({ id })
  }

  if (!isHydrated) return <></>

  const avatar = isAI ? <ChatGPTLogo /> : <UserAvatar />
  const textElement = isAI ? (
    <TypingEffect text={snarkdown(content)} isFinished={isFinished} />
  ) : (
    <div
      dangerouslySetInnerHTML={{
        __html: snarkdown(content)
      }}
    />
  )

  const renderContent = () => {
    if (error) return <ErrorMessage />
    return textElement
  }

  const copyOnClick = () => {
    if (!navigator.clipboard) return

    navigator.clipboard.writeText(message.content).then(() => {
      setIsMessageCopied(true)
      setTimeout(() => {
        setIsMessageCopied(false)
      }, 2000)
    })
  }

  const renderIconButtonActions = () => {
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
            e.preventDefault()
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

  return (
    <div
      className={`text-gray-100 group  ${
        isAI ? 'bg-gptlightgray' : 'bg-gptgray'
      }`}
    >
      <article className='flex max-w-3xl gap-4 p-6 m-auto '>
        <div className='flex-shrink-0 flex flex-col relative items-end'>
          <Avatar>{avatar}</Avatar>
          <div className='text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible visible'>
            <button className='dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400'>
              <FilledArrowIcon
                className='h-3 w-3 rotate-180'
                fill='currentColor'
              />
            </button>
            <span className='flex-grow flex-shrink-0'>2 / 2</span>
            <button className='dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400'>
              <FilledArrowIcon className='h-3 w-3' fill='currentColor' />
            </button>
          </div>
        </div>
        <div className='min-h-[20px] flex flex-1 items-start gap-4 whitespace-pre-wrap'>
          <div className='w-full break-words prose-invert'>
            {renderContent()}
          </div>
          <div className='md:-mr-8 ml-1 md:ml-0 flex flex-col md:flex-row gap-4 md:gap-1 items-center md:items-start justify-end md:justify-start'>
            {renderIconButtonActions()}
          </div>
        </div>
      </article>
    </div>
  )
}
