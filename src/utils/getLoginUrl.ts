import config from '../config'
import getRedirectUrl from './getRedirectUrl'

const getLoginUrl = () => {
  return `${
    config.authUrl
  }/auth/realms/GrowthDayRealm/protocol/openid-connect/auth?client_id=growth-day-main-client&redirect_uri=${getRedirectUrl()}&response_type=code`
}

export default getLoginUrl
