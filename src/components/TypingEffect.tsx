import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { useEffect } from 'react'

interface Props {
  text: string
  isFinished: boolean
}

export function TypingEffect({ text, isFinished }: Props) {
  useEffect(() => {
    hljs.highlightAll()
  }, [text, isFinished])

  return (
    <span
      className={`${
        !isFinished ? 'after:content-["▋"] after:ml-1 after:animate-typing' : ''
      }`}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}
