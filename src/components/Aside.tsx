'use client'

import { useStore } from '@/store/boundStore'
import { useEffect, useState } from 'react'
import { CloseIcon } from './Icons'
import { SideNav } from './SideNav'

interface Props {}

export const Aside: React.FC<Props> = () => {
  const [isHydrated, setIsHydrated] = useState(false)

  const setIsShowNavOpen = useStore((state) => state.setIsShowNavOpen)
  const isShowNavOpen = useStore((state) => state.isShowNavOpen)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const handleToggle = () => {
    setIsShowNavOpen({ value: !isShowNavOpen })
  }

  let buttonClassName = !isShowNavOpen ? '!opacity-0 pointer-events-none' : ''
  let wrapClassName = !isShowNavOpen
    ? '-translate-x-full hidden'
    : 'fixed lg:relative'

  if (!isHydrated) return <></>

  return (
    <>
      <button
        type='button'
        onClick={handleToggle}
        className={`${buttonClassName} lg:hidden fixed z-40 left-0 top-0 w-full h-full bg-gptlightgray bg-opacity-75 transition duration-300`}
      />
      <div
        className={`${wrapClassName} top-0 left-0 bottom-0 z-40 transition duration-300 pointer-events-none`}
      >
        <div className='relative flex h-full w-full max-w-xs flex-1 flex-col bg-gptdarkgray pointer-events-auto'>
          <div className='absolute top-0 right-0 -mr-12 pt-2'>
            <button
              onClick={handleToggle}
              type='button'
              className={`${
                isShowNavOpen ? 'lg:hidden' : ''
              } ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
            >
              <span className='sr-only'>Close sidebar</span>
              <CloseIcon className='w-6 h-6' />
            </button>
          </div>
          <SideNav />
        </div>
        <div className='w-14 flex-shrink-0' />
      </div>
    </>
  )
}
