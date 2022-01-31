import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useModifiedRecoilState from '../hooks/useModifiedRecoilState'
import accessTokenState from '../recoil/atoms/accessTokenState'

export type AuthRouteProps = {
  redirectTo?: string
}

const AuthRoute: FC<AuthRouteProps> = ({ children, redirectTo = '/login' }) => {
  const [accessToken] = useModifiedRecoilState(accessTokenState)
  const location = useLocation()
  return accessToken ? <>{children}</> : <Navigate to={redirectTo} state={{ from: location }} />
}

export default AuthRoute
