type Props = {
  children: React.ReactNode | undefined
}

export const Avatar: React.FC<Props> = ({ children }) => {
  return (
    <figure className='w-[30px] h-[30px] flex items-center justify-center rounded-sm bg-gptlogo'>
      {children}
    </figure>
  )
}
