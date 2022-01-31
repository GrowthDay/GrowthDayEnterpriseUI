import { FC, lazy, Suspense } from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import Loading from './components/Loading'

const Login = lazy(() => import('./routes/Login'))
const LoginCallback = lazy(() => import('./routes/Login/LoginCallback'))

const Shell = lazy(() => import('./routes/Shell'))
const Dashboard = lazy(() => import('./routes/Dashboard'))
const Reports = lazy(() => import('./routes/Reports'))
const Users = lazy(() => import('./routes/Users'))
const Learn = lazy(() => import('./routes/Learn'))
const Notifications = lazy(() => import('./routes/Notifications'))
const Profile = lazy(() => import('./routes/Profile'))
const Settings = lazy(() => import('./routes/Settings'))
const NotFound = lazy(() => import('./routes/NotFound'))

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
        <Route index element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="users" element={<Users />} />
        <Route path="learn" element={<Learn />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="login/callback" element={<LoginCallback />} />
    </Routes>
  </Suspense>
)

export default BaseRoutes
