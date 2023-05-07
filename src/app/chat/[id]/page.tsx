'use client'

import { Chat } from '@/components/Chat'
import { useStore } from '@/store/boundStore'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useEffect } from 'react'

export default function ChatId({ params }: { params: Params }) {
  const { id } = params

  const setConversation = useStore((state) => state.setConversation)

  useEffect(() => {
    setConversation({ id })
  }, [id])

  if (typeof document !== 'undefined')
    document.getElementById('mainInput')?.focus()

  return <Chat />
}
