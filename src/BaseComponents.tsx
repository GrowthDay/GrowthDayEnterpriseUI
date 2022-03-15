import { FC, lazy, Suspense } from 'react'
import { useRecoilState } from 'recoil'
import useOnlineStatus from './hooks/useOnlineStatus'
import feedbackModalState from './recoil/atoms/feedbackModalState'

const Feedback = lazy(() => import('./features/Feedback/Feedback'))
const OfflineDialog = lazy(() => import('./components/OfflineDialog'))

const BaseComponents: FC = () => {
  const isOnline = useOnlineStatus()
  const [feedbackOpen, setFeedbackOpen] = useRecoilState(feedbackModalState)
  return (
    <Suspense fallback={null}>
      <OfflineDialog open={!isOnline} />
      <Feedback open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </Suspense>
  )
}

export default BaseComponents
