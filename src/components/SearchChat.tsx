import { useStore } from '@/store/boundStore'

export function SearchChat() {
  const searchTerm = useStore((state) => state.searchTerm)
  const setSearchTerm = useStore((state) => state.setSearchTerm)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm({ value: event.target.value })
  }

  return (
    <>
      <input
        onChange={handleChange}
        className='text-white px-4 py-1 rounded-md text-sm w-full h-10 border-white/20 outline-none placeholder-gray-200/60'
        value={searchTerm}
        // className='h-10 p-3 mb-4 rounded-md outline-none border-white/20'
        type='text'
        placeholder='Search chats...'
      />
    </>
  )
}
