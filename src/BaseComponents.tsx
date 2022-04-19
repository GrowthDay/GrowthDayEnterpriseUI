import { FC, lazy, Suspense } from 'react'
import { useRecoilState } from 'recoil'
import useOnlineStatus from './hooks/useOnlineStatus'
import useSyncedQueue from './hooks/useSyncedQueue'
import feedbackModalState from './recoil/atoms/feedbackModalState'
import welcomeState from './recoil/atoms/welcomeState'

const Feedback = lazy(() => import('./features/Feedback/Feedback'))
const Welcome = lazy(() => import('./features/Welcome/Welcome'))
const OfflineDialog = lazy(() => import('./components/OfflineDialog'))

const BaseComponents: FC = () => {
  const isOnline = useOnlineStatus()
  const [feedbackOpen, setFeedbackOpen] = useRecoilState(feedbackModalState)
  const [welcomeOpen, setWelcomeOpen] = useRecoilState(welcomeState)
  const syncedWelcomeOpen = useSyncedQueue(welcomeOpen)
  return (
    <Suspense fallback={null}>
      <OfflineDialog open={!isOnline} />
      <Welcome open={syncedWelcomeOpen} onClose={() => setWelcomeOpen(false)} />
      <Feedback open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </Suspense>
  )
}

export default BaseComponents
