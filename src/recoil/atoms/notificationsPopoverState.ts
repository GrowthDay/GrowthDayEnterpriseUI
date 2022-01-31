import { PopupState } from 'material-ui-popup-state/core'
import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'

const key = getPrefixedKey('NOTIFICATIONS_POPOVER')

const notificationsPopoverState = atom<PopupState | undefined>({
  key,
  default: undefined
})

export default notificationsPopoverState
