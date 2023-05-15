import 'highlight.js/styles/atom-one-dark-reasonable.css'
import snarkdown from 'snarkdown'

interface Props {
  text: string
  isFinished: boolean
}

export function TypingEffect({ text, isFinished }: Props) {
  return (
    <div
      className={`${
        !isFinished ? 'after:content-["▋"] after:ml-1 after:animate-typing' : ''
      }`}
      dangerouslySetInnerHTML={{ __html: snarkdown(text) }}
    />
  )
}
