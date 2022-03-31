import { IConfig } from '.'

const devConfig: IConfig = {
  apiUrl: 'https://api.dev.gday-stack.com',
  authUrl: 'https://auth.dev.gday-stack.com',
  webUrl: 'https://web.dev.gday-stack.com',
  strapiUrl: 'https://strapi.dev.gday-stack.com',
  publicUrl: process.env.PUBLIC_URL!,
  muiGridKey: '17f1df91b534b738ceaca134687015fcT1JERVI6Mzk1MTIsRVhQSVJZPTE2Nzg2NTE4MDAwMDAsS0VZVkVSU0lPTj0x',
  storagePrefix: 'HPX:ENTERPRISE:DEV',
  stripePublishKey:
    'pk_test_51HTsnxBC62uLybCjUicILdtfF3YuLZeWN8C66a5CkgrkUaSdQv3efFg5c1NXTmY31zMRDbVhHFMDCCWfiaSqrsHv006kZ4kpAS',
  userbackKey: '11316|42469|WaPCGDTmDHrZwTnbda3eNCUaW'
}

export default devConfig
