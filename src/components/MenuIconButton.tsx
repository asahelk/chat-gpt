'use client'

import { useStore } from '@/store/boundStore'
import { MenuIcon } from './Icons'

export function MenuIconButton() {
  const setIsShowNavOpen = useStore((state) => state.setIsShowNavOpen)
  const isShowNavOpen = useStore((state) => state.isShowNavOpen)

  const handleToggle = () => {
    setIsShowNavOpen({ value: !isShowNavOpen })
  }

  return (
    <button
      type='button'
      onClick={handleToggle}
      className='inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:text-gray-100'
    >
      <span className='sr-only'>Open sidebar</span>
      <MenuIcon />
    </button>
  )
}
