import { Aside } from '@/components/Aside'
import { ChatForm } from '@/components/CreatePrompt'
import { Header } from '@/components/Header'
import Providers from '@/utils/provider'
import '../styles/globals.css'

type Props = {
  children: React.ReactNode
}

export const metadata = {
  title: 'Chat GPT',
  description: 'Generated by create next app'
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <title>Chat GPT</title>
      </head>
      <body>
        <Providers>
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
        </Providers>
      </body>
    </html>
  )
}
export default RootLayout