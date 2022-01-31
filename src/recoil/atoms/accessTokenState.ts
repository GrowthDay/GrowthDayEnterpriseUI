import { atom } from 'recoil'
import StorageEffect from '../effects/StorageEffect'
import getPrefixedKey from '../../utils/getPrefixedKey'

const key = getPrefixedKey('AUTH_TOKEN')

export type AccessTokenStateType = string | null

const accessTokenState = atom<AccessTokenStateType>({
  key,
  default: null,
  effects_UNSTABLE: [StorageEffect(key)]
})

export default accessTokenState
