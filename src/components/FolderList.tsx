import { useStore } from '@/store/boundStore'
import { FolderWithId } from '@/type'
import { useEffect, useState } from 'react'
import { Folder } from './Folder'

export function FolderList() {
  const foldersList = useStore((state) => state.foldersList)

  const [folders, setFolders] = useState<FolderWithId[]>()

  useEffect(() => {
    setFolders(foldersList)
  }, [foldersList])

  return folders?.map((folder) => {
    return <Folder key={folder.id} folder={folder} onToggle={() => void 0} />
  })
}
