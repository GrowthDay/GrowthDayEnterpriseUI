import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import useOrganizationUserQuery from '../../api/queries/useOrganizationUserQuery'
import Loading from '../../components/Loading'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

const Shell: FC = () => {
  const { isLoading: organizationLoading, isLoadingError: organizationLoadingError } = useOrganizationQuery()
  const { isLoading: organizationUserLoading, isLoadingError: organizationUserLoadingError } =
    useOrganizationUserQuery()

  const isLoading = organizationLoading || organizationUserLoading
  const isLoadingError = organizationLoadingError || organizationUserLoadingError

  if (isLoading || isLoadingError) {
    return <Loading />
  }

  return (
    <>
      <Header />
      <Sidebar>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Sidebar>
    </>
  )
}

export default Shell
