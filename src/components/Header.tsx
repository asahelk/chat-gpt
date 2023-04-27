import { MenuIconButton } from './MenuIconButton'

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <div className='hide-when-print sticky top-0 z-30 bg-white dark:bg-gptlightgray backdrop-blur'>
      <div className='flex absolute left-1 top-0 bottom-0 items-center justify-center'>
        <MenuIconButton />
      </div>
      <div className='flex items-center justify-center w-full p-2 border-bottom-2 border-gray-200 shadow-bottom flex-col min-w-0'>
        <div className='font-semibold truncate w-full text-center px-12 text-black dark:text-white'>
          (Example) Generating domain names
        </div>
        <div className='text-xs text-gray-400 w-full truncate text-center px-16 space-x-1'>
          <span className='shrink-0'>GPT-3.5</span>
          <span className='hidden sm:inline-block'>⋅</span>
          <span className='hidden sm:inline-block'>3 messages</span>
          <span className='hidden sm:inline-block'>⋅</span>
          <span className='hidden sm:inline-block'>64/4098 tokens</span>
        </div>
      </div>
    </div>
  )
}
