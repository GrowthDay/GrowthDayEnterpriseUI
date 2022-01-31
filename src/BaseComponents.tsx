import { FC, lazy, Suspense } from 'react'

const FeedbackDialog = lazy(() => import('./features/Feedback/FeedbackDialog'))
const OfflineDialog = lazy(() => import('./components/OfflineDialog'))
const NotificationsPopover = lazy(() => import('./routes/Notifications/NotificationsPopover'))

const BaseComponents: FC = () => (
  <Suspense fallback={null}>
    <OfflineDialog />
    <FeedbackDialog />
    <NotificationsPopover />
  </Suspense>
)

export default BaseComponents
