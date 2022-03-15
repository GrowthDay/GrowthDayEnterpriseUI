import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'

const key = getPrefixedKey('CHECKOUT_LOADING')

const checkoutLoadingState = atom<boolean>({
  key,
  default: false
})

export default checkoutLoadingState
