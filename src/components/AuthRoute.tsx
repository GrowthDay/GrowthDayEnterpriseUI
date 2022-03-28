import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useOrganizationQuery from '../api/queries/useOrganizationQuery'
import accessTokenState from '../recoil/atoms/accessTokenState'

export type AuthRouteProps = {
  redirectTo?: string
}

const AuthRoute: FC<AuthRouteProps> = ({ children, redirectTo = '/login' }) => {
  const accessToken = useRecoilValue(accessTokenState)
  const { data: organization } = useOrganizationQuery()
  const location = useLocation()
  if (!accessToken) {
    return <Navigate to={redirectTo} state={{ from: location }} />
  }
  if (accessToken && organization && !organization.seats) {
    return <Navigate to="/setup" state={{ from: location }} />
  }
  return <>{children}</>
}

export default AuthRoute
