import { FC } from 'react'
import { QueryClientProvider } from 'react-query'
import BaseComponents from './BaseComponents'
import BaseRoutes from './BaseRoutes'
import Loading from './components/Loading'
import useAuthorizedQueryClient from './hooks/useAuthorizedQueryClient'
import useAxiosInterceptors from './hooks/useAxiosInterceptor'
import 'moment-timezone'

const App: FC = () => {
  const axiosReady = useAxiosInterceptors()
  const queryClient = useAuthorizedQueryClient()

  if (!axiosReady) {
    return <Loading />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BaseRoutes />
      <BaseComponents />
    </QueryClientProvider>
  )
}

export default App
