import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'
import useLoginMutation from '../../../api/mutations/useLoginMutation'
import useIsMounted from '../../../hooks/useIsMounted'
import useModifiedRecoilState from '../../../hooks/useModifiedRecoilState'
import useQueryParams from '../../../hooks/useQueryParams'
import redirectState from '../../../recoil/atoms/redirectState'
import getRedirectUrl from '../../../utils/getRedirectUrl'

const LoginCallback: FC = () => {
  const navigate = useNavigate()
  const [redirect, , removeRedirect] = useModifiedRecoilState(redirectState)
  const params = useQueryParams<{ code: string }>()
  const { mutateAsync } = useLoginMutation()
  const isMountedRef = useIsMounted()

  useEffect(() => {
    const execute = async () => {
      if (params.code) {
        try {
          await mutateAsync({ code: params.code, redirectUri: getRedirectUrl() })
        } catch (e) {}
      }
      if (isMountedRef.current) {
        removeRedirect()
        navigate(redirect?.from || '/')
      }
    }
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, removeRedirect, mutateAsync, isMountedRef, params.code])

  return <></>
}

export default LoginCallback
