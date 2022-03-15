export type IConfig = {
  apiUrl: string
  authUrl: string
  webUrl: string
  strapiUrl: string
  publicUrl: string
  storagePrefix: string
  muiGridKey: string
  stripePublishKey: string
  userbackKey: string
}

const config: IConfig = {
  apiUrl: process.env.REACT_APP_API_URL!,
  authUrl: process.env.REACT_APP_AUTH_URL!,
  webUrl: process.env.REACT_APP_WEB_URL!,
  strapiUrl: process.env.REACT_APP_STRAPI_URL!,
  publicUrl: process.env.PUBLIC_URL!,
  muiGridKey: process.env.REACT_APP_MUI_GRID_KEY!,
  storagePrefix: process.env.REACT_APP_STORAGE_PREFIX!,
  stripePublishKey: process.env.REACT_APP_STRIPE_PUBLISH_KEY!,
  userbackKey: process.env.REACT_APP_USERBACK_KEY!
}

export default config
