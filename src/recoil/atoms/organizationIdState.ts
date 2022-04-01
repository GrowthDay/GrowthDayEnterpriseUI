import { atom } from 'recoil'
import getPrefixedKey from '../../utils/getPrefixedKey'
import StorageEffect from '../effects/StorageEffect'

const key = getPrefixedKey('ORGANIZATION_ID')

export type OrganizationIdStateType = string | null

const organizationIdState = atom<OrganizationIdStateType>({
  key,
  default: null,
  effects: [StorageEffect(key, window.sessionStorage)]
})

export default organizationIdState
