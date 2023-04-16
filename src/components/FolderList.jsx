import { useStore } from '@/store/boundStore'
import { useEffect, useState } from 'react'
import { Folder } from './Folder'

export function FolderList() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const foldersInfo = useStore((state) => state.foldersInfo)

  const Element = isHydrated ? (
    Object.entries(foldersInfo).map(([key, foldersInfo]) => {
      return <Folder key={foldersInfo.id} id={key} title={foldersInfo.name} />
    })
  ) : (
    <span>Loading...</span>
  )

  return <>{Element}</>
}
