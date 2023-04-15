import { SideNav } from '@/components/SideNav'
import Head from 'next/head'

export function Layout({ children }) {
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
