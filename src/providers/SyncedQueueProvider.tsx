import React, { createContext, useCallback, useMemo, useRef, useState } from 'react'

export interface SyncedQueueContextValue {
  activeModal: number | null
  enqueueModal(): number
  dequeueModal(modalNumber: number): void
}

export const SyncedQueueContext = createContext<SyncedQueueContextValue>({
  activeModal: null,
  enqueueModal(): number {
    return -1
  },
  dequeueModal() {
    //empty
  }
})

const SyncedQueueProvider: React.FC = ({ children }) => {
  const modalNumber = useRef(1)
  // Cannot use O(1) map due to React batching
  const [modalQueue, setModalQueue] = useState<number[]>([])
  const activeModal = modalQueue[0] ?? null

  const enqueueModal = useCallback(() => {
    const old = modalNumber.current
    modalNumber.current++
    setModalQueue((q) => [...q, old])
    return old
  }, [])

  const dequeueModal = useCallback((_modalNumber: number) => {
    // Timeout to keep transition graceful
    setTimeout(() => setModalQueue((q) => q.filter((e) => e !== _modalNumber)), 300)
  }, [])

  const value: SyncedQueueContextValue = useMemo(
    () => ({
      activeModal,
      enqueueModal,
      dequeueModal
    }),
    [activeModal, dequeueModal, enqueueModal]
  )

  return <SyncedQueueContext.Provider value={value}>{children}</SyncedQueueContext.Provider>
}

export default SyncedQueueProvider
