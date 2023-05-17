import { useChatComponent } from '@/app/hooks/useChatComponent'
import { CHAT_TYPES } from '@/constants'
import { useStore } from '@/store/boundStore'
import { ConversationWithId } from '@/type'
import { useParams, useRouter } from 'next/navigation'

import Link from 'next/link'
import { MessageFavIcon, StarIcon } from './Icons'

interface Props {
  conversation: ConversationWithId
  isFavoriteList: boolean
  background?: string
  bggradient?: string
}

export const Conversation: React.FC<Props> = ({
  conversation,
  isFavoriteList,
  ...inputProps
}) => {
  const { replace, push } = useRouter()

  const params = useParams()

  const removeConversation = useStore((state) => state.removeConversation)

  const updateConversation = useStore((state) => state.updateConversation)

  const selectedConversationId = useStore(
    (state) => state.selectedConversationId
  )
  const {
    background = '',
    bggradient = selectedConversationId === conversation.id
      ? 'from-gptCharcoalGray'
      : ''
  } = inputProps

  const handleRemoveConversation = () => {
    const id = params?.id

    if (selectedConversationId && selectedConversationId === conversation.id)
      replace('/chat')

    removeConversation({ id: conversation.id })
  }

  const { RenderButtonsActions, ElementTitle } =
    useChatComponent<ConversationWithId>({
      id: conversation.id,
      title: conversation.text,
      className: bggradient || '',
      previewLastMessage: conversation.previewLastMessage || '',
      type: CHAT_TYPES.CHAT,
      callbackOnSubmit: (conversation) => updateConversation(conversation),
      removeCallback: handleRemoveConversation
    })

  const setSelectedConversation = useStore(
    (state) => state.setSelectedConversation
  )

  function handleFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    updateConversation({
      ...conversation,
      isFavorite: !conversation.isFavorite
    })
  }

  function handleClickConversation(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault()

    if (params?.id !== conversation.id) {
      // setSelectedConversation({ id: null })
      push(`chat/${conversation.id}`)
    }
  }

  return (
    <Link
      href={`/chat/${conversation.id}`}
      // onClick={handleClickConversation}
      {...inputProps}
      prefetch={false}
      draggable={false}
      // onClick={() => selectConversation({ id: conversation.id })}
      className={`${background} ${
        selectedConversationId === conversation.id ? 'bg-gptCharcoalGray' : ''
      } focus-within:bg-gptCharcoalGray relative flex items-center gap-3 pl-3 py-3 break-all cursor-pointer group hover:bg-gptMidnightBlue min-h-[50px]`}
    >
      <MessageFavIcon
        className={`text-gray-300 h-5 w-5 flex-shrink-0 hidden sm:block ${
          conversation.isFavorite ? 'sm:hidden' : 'sm:group-hover:hidden'
        }`}
      />
      <button
        onClick={handleFavorite}
        className={`flex-shrink-0 ${
          conversation.isFavorite ? '' : 'sm:hidden sm:group-hover:block'
        }`}
      >
        <StarIcon
          className={`${
            conversation.isFavorite
              ? 'text-yellow-500 fill-yellow-500'
              : 'text-gray-300 stroke-gray-300'
          } ${isFavoriteList ? 'h-4 w-4' : 'h-5 w-5'}`}
        />
      </button>
      {ElementTitle()}
      {RenderButtonsActions()}
    </Link>
  )
}
