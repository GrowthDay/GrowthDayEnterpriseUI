import { NavigateNextOutlined } from '@mui/icons-material'
import { Breadcrumbs, Container, ContainerProps, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'
import coerceArray from '../utils/coerceArray'
import Flex from './Flex'

export type LayoutProps = ContainerProps & {
  breadcrumbs?: ReactNode | ReactNode[]
  header?: ReactNode
}

const Layout: FC<LayoutProps> = ({ breadcrumbs, header, children, sx, ...props }) => (
  <Container
    {...props}
    sx={[{ py: { xs: 4, md: 8 }, position: 'relative', minHeight: (theme) => theme.spacing(100) }, ...coerceArray(sx)]}
  >
    <Flex
      sx={{ mb: 2 }}
      flexDirection={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ sm: 'center' }}
    >
      <Flex alignItems="center">
        {breadcrumbs && (
          <Breadcrumbs
            sx={{ mb: { xs: header ? 1 : 0, sm: 0 } }}
            separator={<NavigateNextOutlined fontSize="small" color="disabled" />}
          >
            {['Enterprise', ...coerceArray(breadcrumbs)].map((text, index) => (
              <Typography variant="body2" color="text.disabled" key={index}>
                {text}
              </Typography>
            ))}
          </Breadcrumbs>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="flex-end">
        {header}
      </Flex>
    </Flex>
    {children}
  </Container>
)

export default Layout
