import { atom } from 'recoil'
import StorageEffect from '../../../recoil/effects/StorageEffect'
import getPrefixedKey from '../../../utils/getPrefixedKey'

const key = getPrefixedKey('INVITE_POLLING')

const invitePollingState = atom<number | null>({
  key,
  default: null,
  effects: [StorageEffect(key, window.localStorage)]
})

export default invitePollingState
