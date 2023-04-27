import { Aside } from './Aside'
import { ChatForm } from './CreatePrompt'
import { Header } from './Header'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='relative w-full flex h-screen bg-gptgray'>
      <Aside />

      <div className={`flex flex-col w-full h-full`}>
        <main className='overflow-hidden flex flex-col relative h-full w-full'>
          <Header />
          {children}
          <ChatForm />
        </main>
      </div>
    </div>
  )
}
