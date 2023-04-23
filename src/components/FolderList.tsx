import { useStore } from '@/store/boundStore'
import { useEffect, useState } from 'react'
import { Folder } from './Folder'


export function FolderList() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const foldersList = useStore((state) => state.foldersList)

  const Element = isHydrated ? (
    // Object.entries(foldersInfo).map(([key, foldersInfo]) => {
      foldersList.map(folder => {
        return <Folder key={folder.id}  folder={folder} onToggle={() => void 0}
        // id={folder.id} title={folder.text}
         />
      })
      
    // })
  ) : (
    <span>Loading...</span>
  )

  return <>{Element}</>
}
