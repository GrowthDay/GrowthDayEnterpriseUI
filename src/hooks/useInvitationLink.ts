import urlJoin from 'proper-url-join'
import useOrganizationQuery from '../api/queries/useOrganizationQuery'
import config from '../config'

const useInvitationLink = () => {
  const { data: organization } = useOrganizationQuery()
  return urlJoin(config.webUrl, 'enterprise', 'join', organization?.organizationSubscribeLink)
}

export default useInvitationLink
