import devConfig from './dev'
import prodConfig from './prod'
import uatConfig from './uat'

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

export enum EnvironmentsEnum {
  DEV = 'dev',
  PROD = 'prod',
  UAT = 'uat'
}

export const environments: Record<EnvironmentsEnum, IConfig> = {
  [EnvironmentsEnum.DEV]: devConfig,
  [EnvironmentsEnum.UAT]: uatConfig,
  [EnvironmentsEnum.PROD]: prodConfig
}

export const currentEnvironment = (process.env.REACT_APP_ENV as EnvironmentsEnum) || EnvironmentsEnum.DEV

const config: IConfig = environments[currentEnvironment]

export default config
