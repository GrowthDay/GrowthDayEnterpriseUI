import { FC, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useLogoutMutation from '../../api/mutations/useLogoutMutation'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import useOrganizationUserQuery from '../../api/queries/useOrganizationUserQuery'
import Loading from '../../components/Loading'

const BootstrapApp: FC = () => {
  const { mutateAsync, isLoading: logoutLoading } = useLogoutMutation()
  const [loading, setLoading] = useState(true)
  const { isLoading: userLoading, data: user } = useOrganizationUserQuery({ enabled: !logoutLoading })
  const { isLoading: organizationLoading } = useOrganizationQuery()

  useEffect(() => {
    ;(async () => {
      if (user && !user.organizationId) {
        await mutateAsync()
        setLoading(false)
      }
    })()
  }, [user, mutateAsync])

  useEffect(() => {
    if (!userLoading && !organizationLoading && (user ? user.organizationId : true)) {
      setLoading(false)
    }
  }, [logoutLoading, userLoading, organizationLoading, user])

  return loading ? <Loading /> : <Outlet />
}

export default BootstrapApp
