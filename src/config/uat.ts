import { IConfig } from '.'

const uatConfig: IConfig = {
  apiUrl: 'https://api.uat.gday-stack.com',
  authUrl: 'https://auth.uat.gday-stack.com',
  webUrl: 'https://web.uat.gday-stack.com',
  strapiUrl: 'https://strapi.uat.gday-stack.com',
  publicUrl: process.env.PUBLIC_URL!,
  muiGridKey: '17f1df91b534b738ceaca134687015fcT1JERVI6Mzk1MTIsRVhQSVJZPTE2Nzg2NTE4MDAwMDAsS0VZVkVSU0lPTj0x',
  storagePrefix: 'HPX:ENTERPRISE:UAT',
  stripePublishKey:
    'pk_test_51I1G0AFBHm5Si8uCCQOhyzJi2h23YyNcbNmpJLXzfX5VxPyCqZ2HjGbuHlixznpxhvNVv1kqOiLPBCO9tnhyXaHL00UV49l4LR',
  userbackKey: '11316|42470|WaPCGDTmDHrZwTnbda3eNCUaW'
}

export default uatConfig
