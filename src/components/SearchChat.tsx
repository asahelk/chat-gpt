import { useStore } from '@/store/boundStore'
import { CloseIcon } from './Icons'

export function SearchChat() {
  const searchTerm = useStore((state) => state.searchTerm)
  const setSearchTerm = useStore((state) => state.setSearchTerm)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm({ value: event.target.value })
  }

  function handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
    setSearchTerm({ value: '' })
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode == 27) {
      event?.preventDefault()
      setSearchTerm({ value: '' })
    }
  }

  return (
    <div className='relative w-full'>
      <input
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className='text-white px-4 py-1 rounded-md text-sm w-full h-10 border-white/20 outline-none placeholder-gray-200/60'
        value={searchTerm}
        // className='h-10 p-3 mb-4 rounded-md outline-none border-white/20'
        type='text'
        placeholder='Search chats...'
      />

      {searchTerm.trim() && (
        <button
          onClick={handleCancel}
          className='absolute right-0 top-0 bottom-0 flex items-center justify-center px-2 text-white hover:text-neutral-400'
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}
