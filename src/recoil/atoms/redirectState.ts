import { Location } from 'react-router-dom'
import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'
import StorageEffect from '../effects/StorageEffect'

const key = getPrefixedKey('REDIRECT')

export type RedirectStateType = { from: Location } | null

const redirectState = atom<RedirectStateType>({
  key,
  default: null,
  effects: [StorageEffect(key, sessionStorage)]
})

export default redirectState
