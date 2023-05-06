import { useRouter } from 'next/navigation'

import { useStore } from '@/store/boundStore'
import { PlusIcon } from './Icons'

export function NewChatButton() {
  const router = useRouter()

  const setConversation = useStore((state) => state.setConversation)

  const handleClick = () => {
    setConversation({ id: null })

    router.push('/chat')
  }

  return (
    <button
      onClick={handleClick}
      className='text-white group flex items-center rounded-md px-4 h-10 gap-2 text-sm font-medium w-full transition-all hover:bg-gray-500/30 border-white/20 border'
    >
      <PlusIcon />
      New chat
    </button>
  )
}
