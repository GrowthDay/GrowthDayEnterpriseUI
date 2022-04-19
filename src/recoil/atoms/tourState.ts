import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'

const key = getPrefixedKey('TOUR')

const tourState = atom<boolean>({
  key,
  default: false
})

export default tourState
