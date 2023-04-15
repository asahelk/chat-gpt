import { Welcome } from '@/components/Welcome'

export default function Home({ children }) {
  return (
    <>
      <Welcome />
      {children}
    </>
  )
}
