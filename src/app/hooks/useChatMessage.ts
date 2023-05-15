import { useStore } from '@/store/boundStore'
import { Message } from '@/type'
import { getMessagesNodesFromSelectedNode } from '@/utils/helper'
import { useEffect, useState } from 'react'

export const useChatMessage = () => {
  const messages = useStore((state) => state.selectedMessages)

  const [indexMessageSiblingSelected, setIndexMessageSiblingSelected] =
    useState<number | undefined | null>(null)
  const setLastMessage = useStore((state) => state.setLastMessage)
  const lastMessage = useStore((state) => state.lastMessage)
  const [messageSelected, setMessageSelected] = useState<Message>()
  const [filteredMessages, setFilteredMessages] = useState<Message[]>()

  const filterMessages = () => {
    if (!messages.length) return

    const closingMessage = messages[messages.length - 1]

    const nodeMessage = messageSelected ?? closingMessage

    if (!nodeMessage) {
      setFilteredMessages(messages)
      return
    }

    const messagesFromSelectedNode = getMessagesNodesFromSelectedNode({
      list: messages,
      node: nodeMessage
    })

    setFilteredMessages(messagesFromSelectedNode)
  }

  useEffect(() => {
    filterMessages()
  }, [messages, messageSelected])

  useEffect(() => {
    setFilteredMessages(messages)
  }, [])

  useEffect(() => {
    if (!filteredMessages) return
    const lastMessage = filteredMessages[filteredMessages.length - 1]

    setLastMessage({ message: lastMessage })
  }, [filteredMessages])

  return {
    filteredMessages,
    setMessageSelected,
    setIndexMessageSiblingSelected
  }
}
