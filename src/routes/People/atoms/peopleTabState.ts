import { atom } from 'recoil'
import StorageEffect from '../../../recoil/effects/StorageEffect'
import getPrefixedKey from '../../../utils/getPrefixedKey'

const key = getPrefixedKey('PEOPLE_TAB')

const peopleTabState = atom<string>({
  key,
  default: '1',
  effects: [StorageEffect(key, window.sessionStorage)]
})

export default peopleTabState
