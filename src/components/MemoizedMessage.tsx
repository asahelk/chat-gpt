import { FC, memo } from 'react'
import { Message, Props } from './Message'

export const MemoizedMessage: FC<Props> = memo(
  Message,
  (prevProps, nextProps) => prevProps.message === nextProps.message
)
