import { CloseIcon } from './Icons'
import { SideNav } from './SideNav'

interface Props {
  isShowNavOpen: boolean
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Aside: React.FC<Props> = ({ isShowNavOpen, onToggle }) => {
  const buttonClassName = !isShowNavOpen ? '!opacity-0 pointer-events-none' : ''
  const wrapClassName = !isShowNavOpen
    ? '-translate-x-full hidden'
    : 'fixed lg:relative'
  const sideNavClassName = isShowNavOpen
    ? '!translate-x-0 '
    : '-translate-x-full '

  return (
    <>
      <button
        type='button'
        onClick={onToggle}
        className={`${buttonClassName} lg:hidden fixed z-40 left-0 top-0 w-full h-full bg-gptlightgray bg-opacity-75 transition duration-300`}
      />
      <div
        className={`${wrapClassName} top-0 left-0 bottom-0 z-40 transition duration-300 pointer-events-none`}
      >
        <div className='relative flex h-full w-full max-w-xs flex-1 flex-col bg-gptdarkgray pointer-events-auto'>
          <div className='absolute top-0 right-0 -mr-12 pt-2'>
            <button
              onClick={onToggle}
              type='button'
              className={`${
                isShowNavOpen ? 'lg:hidden' : ''
              } ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              <span className='sr-only'>Close sidebar</span>
              <CloseIcon className='w-6 h-6' />
            </button>
          </div>
          <SideNav className={sideNavClassName} />
        </div>
        <div className='w-14 flex-shrink-0' />
      </div>
    </>
  )
}
