import { useChatComponent } from '@/app/hooks/useChatComponent'
import { useStore } from '@/store/boundStore'
import { useState } from 'react'
import { MessageFavIcon, StarIcon } from './Icons'

export function Conversation({ id, title, isFavorite, ...inputProps }) {
  const [isFav, setIsFav] = useState(isFavorite)
  const removeConversation = useStore((state) => state.removeConversation)
  const { isfavoritelist } = inputProps

  const updateConversation = useStore((state) => state.updateConversation)

  const { RenderInputActions, ElementTitle } = useChatComponent({
    id,
    title,
    callbackOnSubmit: updateConversation,
    isFav,
    removeCallback: removeConversation
  })

  const selectConversation = useStore((state) => state.selectConversation)

  function handleFavorite() {
    updateConversation({ id, name: title, isFavorite: !isFav })
    setIsFav(!isFav)
  }

  return (
    <div
      {...inputProps}
      onClick={() => selectConversation({ id })}
      className='focus-within:bg-[#18191a] relative flex items-center gap-3 pl-2 py-3 break-all cursor-pointer group hover:bg-[#2A2B32]'
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
          } ${isfavoritelist ? 'h-4 w-4' : 'h-5 w-5'}`}
        />
      </button>
      {ElementTitle()}
      {RenderInputActions()}
    </div>
  )
}
