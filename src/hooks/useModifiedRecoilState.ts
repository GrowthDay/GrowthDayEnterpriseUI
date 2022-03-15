import { useMemo } from 'react'
import { RecoilState, Resetter, SetterOrUpdater, useRecoilState, useResetRecoilState } from 'recoil'

const useModifiedRecoilState = <T>(recoilState: RecoilState<T>): [T, SetterOrUpdater<T>, Resetter] => {
  const [state, setState] = useRecoilState(recoilState)
  const resetState = useResetRecoilState(recoilState)
  return useMemo(() => [state, setState, resetState], [state, setState, resetState])
}

export default useModifiedRecoilState
