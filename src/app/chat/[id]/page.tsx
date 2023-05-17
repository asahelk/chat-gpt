// 'use client'
import { Chat } from '@/components/Chat'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export default function ChatIdPage({ params }: { params: Params }) {
  if (typeof document !== 'undefined')
    document.getElementById('mainInput')?.focus()

  return <Chat />
}
