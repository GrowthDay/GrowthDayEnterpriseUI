import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'

const key = getPrefixedKey('FEEDBACK_MODAL')

const feedbackModalState = atom<boolean>({
  key,
  default: false
})

export default feedbackModalState
