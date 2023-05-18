import { useStore } from '@/store/boundStore'
import { RefreshIcon } from './Icons'

function StopGenerationButton() {
  const setStopConversation = useStore((state) => state.setStopConversation)

  const onClickStopGenerating = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setStopConversation({ value: true })
    setTimeout(() => {
      setStopConversation({ value: false })
    }, 1000)
  }

  return (
    <button
      className='text-sm mx-auto mb-3 flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black hover:opacity-50 dark:border-neutral-600 dark:bg-[#343541] dark:text-white md:mb-0 md:mt-2'
      type='button'
      onClick={onClickStopGenerating}
    >
      <div className='flex w-full gap-2 items-center justify-center'>
        <RefreshIcon className='h-3 w-3' />
        Stop generating
      </div>
    </button>
  )
}
