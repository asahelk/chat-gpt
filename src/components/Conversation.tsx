import { useChatComponent } from '@/app/hooks/useChatComponent';
import { useStore } from '@/store/boundStore';
import { ConversationWithId } from '@/type';
import { useState } from 'react';
import { MessageFavIcon, StarIcon } from './Icons';

interface Props {
  conversation: ConversationWithId
  // id: Id
  // title: string
  // isFavorite: boolean
  isFavoriteList: boolean
  background?: string
  bggradient?: string
}


export const Conversation: React.FC<Props> = ({
  conversation,
  // id,
  // title,
  // isFavorite,
  isFavoriteList,
  ...inputProps
}) =>{
  const { background, bggradient } = inputProps

  const [isFav, setIsFav] = useState(conversation.isFavorite)
  const removeConversation = useStore((state) => state.removeConversation)

  const updateConversation = useStore((state) => state.updateConversation)

  const { RenderInputActions, ElementTitle } = useChatComponent({
    id : conversation.id,
    title: conversation.text,
    className: bggradient as string,
    isFav,
    callbackOnSubmit: () => updateConversation,
    removeCallback: removeConversation
  })

  const selectConversation = useStore((state) => state.selectConversation)

  function handleFavorite() {
    updateConversation({ ...conversation, isFavorite: !isFav })
    setIsFav(!isFav)
  }

  return (
    <div
      {...inputProps}
      onClick={() => selectConversation({ id: conversation.id })}
      className={`${background} focus-within:bg-gptCharcoalGray relative flex items-center gap-3 px-3 py-3 break-all cursor-pointer group hover:bg-gptMidnightBlue`}
    >
      <MessageFavIcon
        className={`text-gray-300 h-5 w-5 flex-shrink-0 hidden sm:block ${
          isFav ? 'sm:hidden' : 'sm:group-hover:hidden'
        }`}
      />
      <button
        onClick={handleFavorite}
        className={`flex-shrink-0 ${
          isFav ? '' : 'sm:hidden sm:group-hover:block'
        }`}
      >
        <StarIcon
          className={`${
            isFav
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
