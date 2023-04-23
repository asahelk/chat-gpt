import { SideNav } from '@/components/SideNav'
import Head from 'next/head'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Chat GPT</title>
      </Head>
      <div className='relative w-full h-screen bg-gptgray'>
        <SideNav />
        {children}
      </div>
    </>
  )
}
