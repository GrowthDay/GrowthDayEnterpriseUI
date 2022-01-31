import { FC, useEffect } from 'react'
import { useLocation, Location } from 'react-router-dom'
import Loading from '../../components/Loading'
import useModifiedRecoilState from '../../hooks/useModifiedRecoilState'
import useOnlineStatus from '../../hooks/useOnlineStatus'
import redirectState from '../../recoil/atoms/redirectState'
import getLoginUrl from '../../utils/getLoginUrl'

const Login: FC = () => {
  const { state } = useLocation()
  const [, setRedirect] = useModifiedRecoilState(redirectState)
  const isOnline = useOnlineStatus()
  useEffect(() => {
    if (state) {
      setRedirect(state as { from: Location })
    }
    if (isOnline) {
      window.location.href = getLoginUrl()
    }
  }, [isOnline, state])
  return <Loading />
}

export default Login
