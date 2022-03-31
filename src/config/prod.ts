import { IConfig } from '.'

const prodConfig: IConfig = {
  apiUrl: 'https://api.prod.gday-stack.com',
  authUrl: 'https://auth.growthday.com',
  webUrl: 'https://app.growthday.com',
  strapiUrl: 'https://strapi.growthday.com',
  publicUrl: process.env.PUBLIC_URL!,
  muiGridKey: '17f1df91b534b738ceaca134687015fcT1JERVI6Mzk1MTIsRVhQSVJZPTE2Nzg2NTE4MDAwMDAsS0VZVkVSU0lPTj0x',
  storagePrefix: 'HPX:ENTERPRISE:PROD',
  stripePublishKey:
    'pk_live_51I1G0AFBHm5Si8uC6z8dO4o0uwwcmlmIRtfzP4ZC802fFdEqOxsViK7qcQlXygitOVyBoLo6uJL4PHqkqIxuhtFg00B6t0xh8u',
  userbackKey: '11316|23641|WaPCGDTmDHrZwTnbda3eNCUaW'
}

export default prodConfig
