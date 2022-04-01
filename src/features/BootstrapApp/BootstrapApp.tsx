import { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useLogoutMutation from '../../api/mutations/useLogoutMutation'
import useKeycloakCookieQuery from '../../api/queries/useKeycloakCookieQuery'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import useOrganizationUserQuery from '../../api/queries/useOrganizationUserQuery'
import Loading from '../../components/Loading'
import accessTokenState from '../../recoil/atoms/accessTokenState'
import { isAdminRole } from '../../utils/roles'

const BootstrapApp: FC = () => {
  const accessToken = useRecoilValue(accessTokenState)
  const { mutateAsync: logout, isLoading: logoutLoading } = useLogoutMutation()
  const [loading, setLoading] = useState(true)
  const { isLoading: userLoading, data: user } = useOrganizationUserQuery({
    enabled: Boolean(!logoutLoading && accessToken)
  })
  const { isLoading: organizationLoading } = useOrganizationQuery()
  useKeycloakCookieQuery()

  useEffect(() => {
    ;(async () => {
      const shouldLogout = user && (!user.organizationId || !isAdminRole(user.roleId))
      if (shouldLogout) {
        await logout()
        setLoading(false)
      }
    })()
  }, [user, logout])

  useEffect(() => {
    if (!userLoading && !organizationLoading && (user ? user.organizationId : true)) {
      setLoading(false)
    }
  }, [logoutLoading, userLoading, organizationLoading, user])

  return loading ? <Loading /> : <Outlet />
}

export default BootstrapApp
