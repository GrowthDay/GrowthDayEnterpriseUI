import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'

const key = getPrefixedKey('WELCOME')

const welcomeState = atom<boolean>({
  key,
  default: false
})

export default welcomeState
