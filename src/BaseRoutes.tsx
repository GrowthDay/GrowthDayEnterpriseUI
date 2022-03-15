import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import Loading from './components/Loading'

const Setup = lazy(() => import('./routes/Setup/Setup'))
const Login = lazy(() => import('./routes/Login/Login'))
const LoginCallback = lazy(() => import('./routes/Login/LoginCallback'))

const Shell = lazy(() => import('./routes/Shell/Shell'))
const People = lazy(() => import('./routes/People/People'))
const Account = lazy(() => import('./routes/Account/Account'))
const NotFound = lazy(() => import('./routes/NotFound/NotFound'))

const BaseRoutes: FC = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route
        element={
          <AuthRoute>
            <Shell />
          </AuthRoute>
        }
      >
        <Route index element={<Navigate to="people" />} />
        <Route path="people" element={<People />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="setup" element={<Setup />} />
      <Route path="login" element={<Login />} />
      <Route path="login/callback" element={<LoginCallback />} />
    </Routes>
  </Suspense>
)

export default BaseRoutes