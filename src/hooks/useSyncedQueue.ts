import { useContext, useEffect, useRef } from 'react'
import { SyncedQueueContext } from '../providers/SyncedQueueProvider'

export default function useSyncedQueue(value: boolean) {
  const { dequeueModal, enqueueModal, activeModal } = useContext(SyncedQueueContext)
  const modalNumber = useRef<number | null>(null)

  useEffect(() => {
    if (value) {
      modalNumber.current = enqueueModal()
    }
    return () => {
      modalNumber.current && dequeueModal(modalNumber.current)
      modalNumber.current = null
    }
  }, [dequeueModal, enqueueModal, value])

  return value && Boolean(activeModal) && activeModal === modalNumber.current
}
