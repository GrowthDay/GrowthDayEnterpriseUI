export interface IConfig {
  apiUrl: string
  authUrl: string
  storagePrefix: string
  mixpanel: {
    apiUrl: string
    projectId: string
    username: string
    password: string
  }
}

const config: IConfig = {
  authUrl: process.env.REACT_APP_AUTH_URL!,
  apiUrl: process.env.REACT_APP_API_URL!,
  storagePrefix: process.env.REACT_APP_STORAGE_PREFIX!,
  mixpanel: {
    apiUrl: process.env.REACT_APP_MIXPANEL_API_URL!,
    projectId: process.env.REACT_APP_MIXPANEL_PROJECT_ID!,
    username: process.env.REACT_APP_MIXPANEL_USERNAME!,
    password: process.env.REACT_APP_MIXPANEL_PASSWORD!
  }
}

export default config
