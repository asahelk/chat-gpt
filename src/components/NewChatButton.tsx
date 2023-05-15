import { useRouter } from 'next/navigation'

import { useStore } from '@/store/boundStore'
import { PlusIcon } from './Icons'

export function NewChatButton() {
  const router = useRouter()

  const setSelectedConversation = useStore(
    (state) => state.setSelectedConversation
  )

  const handleClick = () => {
    // setSelectedConversation({ id: null })
    router.push('/chat')

    document.getElementById('mainInput')?.focus()
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
