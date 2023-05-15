// 'use client'
import { Chat } from '@/components/Chat'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export default function ChatIdPage({ params }: { params: Params }) {
  const { id } = params
  // const { push, replace } = useRouter()
  // const [isHydrated, setIsHydrated] = useState(false)
  // const setSelectedConversationId = useStore(
  //   (state) => state.setSelectedConversation
  // )

  // const selectedConversationId = useStore(
  //   (state) => state.selectedConversationId
  // )
  // const { replace } = useRouter()

  // const conversation = useStore((state) =>
  //   state.conversationsList.find((e) => e.id === id)
  // )

  // console.log('RENDER', conversation)
  console.log('RENDER')
  // console.log('COUNT', count.current)
  // console.log('LA CONVERSATION', conversation)

  // if (conversation) setSelectedConversation({ id })
  // useEffect(() => {
  //   // if (conversation) {
  //   console.log('SETEO')
  //   // setSelectedConversation({ id })
  //   // }
  //   console.log('en el useffect')
  // }, [])

  // useEffect(() => {
  //   // setIsHydrated(true)
  //   if (!conversation) replace('/chat')
  // }, [])

  // if (!isHydrated) return <p>Loading...</p>

  if (typeof document !== 'undefined')
    document.getElementById('mainInput')?.focus()

  return <Chat />
}
