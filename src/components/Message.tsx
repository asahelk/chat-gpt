import { Avatar } from '@/components/Avatar'
import { ChatGPTLogo } from '@/components/Icons'
import { TypingEffect } from '@/components/TypingEffect'
import { UserAvatar } from '@/components/UserAvatar'
import snarkdown from 'snarkdown'
import { ErrorMessage } from './ErrorMessage'

interface Props {
  isAI: boolean
  content: string
  error?: boolean | null
}

export const Message: React.FC<Props> = ({ isAI, content, error }) => {
  const avatar = isAI ? <ChatGPTLogo /> : <UserAvatar />
  const textElement = isAI ? (
    <TypingEffect text={snarkdown(content)} />
  ) : (
    <div
      dangerouslySetInnerHTML={{
        __html: snarkdown(content)
      }}
    />
  )

  const renderContent = () => {
    if (error) return <ErrorMessage />
    return textElement
  }

  return (
    <div className={`text-gray-100 ${isAI ? 'bg-gptlightgray' : 'bg-gptgray'}`}>
      <article className='flex max-w-3xl gap-4 p-6 m-auto'>
        <Avatar>{avatar}</Avatar>
        <div className='min-h-[20px] flex flex-1 flex-col items-start gap-4 whitespace-pre-wrap'>
          <div className='w-full break-words prose-invert'>
            {renderContent()}
          </div>
        </div>
      </article>
    </div>
  )
}
