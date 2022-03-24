import urlJoin from 'proper-url-join'
import config from '../config'
import useAuthOrganization from './useAuthOrganization'

const useInvitationLink = () => {
  const organization = useAuthOrganization()
  return urlJoin(config.webUrl, 'enterprise', 'join', organization?.organizationSubscribeLink)
}

export default useInvitationLink
