import { Welcome } from '@/components/Welcome'

type Props = {
  children: React.ReactNode
}

const Home: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Welcome />
      {children}
    </>
  )
}

export default Home
