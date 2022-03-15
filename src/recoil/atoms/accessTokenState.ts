import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'
import StorageEffect from '../effects/StorageEffect'

const key = getPrefixedKey('AUTH_TOKEN')

export type AccessTokenStateType = string | null

const accessTokenState = atom<AccessTokenStateType>({
  key,
  default: null,
  effects_UNSTABLE: [StorageEffect(key)]
})

export default accessTokenState
