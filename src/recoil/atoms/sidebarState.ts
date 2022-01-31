import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'

const key = getPrefixedKey('SIDEBAR')

const sidebarState = atom<boolean>({
  key,
  default: true
})

export default sidebarState
