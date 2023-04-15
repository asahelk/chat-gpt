import { useStore } from '@/store/boundStore'
import { useEffect, useState } from 'react'
import { Folder } from './Folder'

const folderList = [
  {
    id: 'fo-14af1b72-aacc-41bd-ad00-27dafe8f5f58',
    title: 'New Folder xd',
    new: false,
    open: false,
    createdAt: '2023-04-08T16:33:05.623Z',
    updatedAt: '2023-04-10T08:02:19.546Z',
    syncedAt: null,
    order: 0
  },
  {
    id: 'fo-10010646-5e58-497a-b37d-38e7c1b513cd',
    title: 'New Folder',
    new: false,
    open: false,
    createdAt: '2023-04-08T16:33:04.027Z',
    updatedAt: '2023-04-10T08:02:19.548Z',
    syncedAt: null,
    order: 1
  },
  {
    id: 'fo-7ed827c9-da8a-44d9-a7b8-d76513c4ae83',
    title: 'New Folder',
    new: false,
    open: true,
    createdAt: '2023-04-10T06:28:41.901Z',
    updatedAt: '2023-04-10T09:56:47.030Z',
    syncedAt: null,
    order: 2
  }
]

export function FolderList() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const foldersInfo = useStore((state) => state.foldersInfo)

  const Element = isHydrated ? (
    Object.entries(foldersInfo).map(([key, foldersInfo]) => {
      return (
        <Folder
          key={foldersInfo.id}
          id={key}
          title={foldersInfo.name}
          draggable
        />
      )
    })
  ) : (
    <span>Loading...</span>
  )

  return <>{Element}</>
}
