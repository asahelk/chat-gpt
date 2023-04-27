import { useChatComponent } from '@/app/hooks/useChatComponent'
import { useStore } from '@/store/boundStore'
import { ConversationWithId } from '@/type'
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
  const { background = '', bggradient = '' } = inputProps

  const removeConversation = useStore((state) => state.removeConversation)

  const updateConversation = useStore((state) => state.updateConversation)

  const { RenderInputActions, ElementTitle } =
    useChatComponent<ConversationWithId>({
      id: conversation.id,
      title: conversation.text,
      className: bggradient || '',
      callbackOnSubmit: (conversation) => updateConversation(conversation),
      removeCallback: removeConversation
    })

  const selectConversation = useStore((state) => state.selectConversation)

  function handleFavorite() {
    updateConversation({
      ...conversation,
      isFavorite: !conversation.isFavorite
    })
  }

  return (
    <div
      {...inputProps}
      onClick={() => selectConversation({ id: conversation.id })}
      className={`${background} focus-within:bg-gptCharcoalGray relative flex items-center gap-3 pl-3 py-3 break-all cursor-pointer group hover:bg-gptMidnightBlue`}
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
      {RenderInputActions()}
    </div>
  )
}
