import { useStore } from '@/store/boundStore'
import { PlusIcon } from './Icons'

export function NewChatButton() {
  const addNewConversation = useStore((state) => state.addNewConversation)

  return (
    <button
      onClick={() =>
        addNewConversation({ name: 'New conversation', isFavorite: false })
      }
      className='text-white group flex items-center rounded-md px-4 h-10 gap-2 text-sm font-medium w-full transition-all hover:bg-gray-500/30 border-white/20 border'
    >
      <PlusIcon />
      New chat
    </button>
  )
}
