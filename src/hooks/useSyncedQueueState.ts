import { useState } from 'react'
import useSyncedQueue from './useSyncedQueue'

export default function useSyncedQueueState(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  return [useSyncedQueue(value), setValue] as const
}
