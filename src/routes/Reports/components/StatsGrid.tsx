import { ArrowDropDownRounded, ArrowDropUpRounded } from '@mui/icons-material'
import { Box, Grid, Paper, styled, Theme, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import { StatsProps } from './Stats'

export type StatsGridProps = {
  items: Pick<StatsProps, 'count' | 'title' | 'delta'>[]
}

const StatsGridItem: FC<StatsGridProps['items'][0]> = ({ title, delta, count }) => (
  <Box py={6} px={4} textAlign="center">
    <Typography mb={1} variant="h5" fontWeight="bold">
      {count}
    </Typography>
    <Typography color="text.secondary" variant="subtitle2">
      {title}
    </Typography>
    {Boolean(delta) && typeof delta !== 'undefined' && (
      <Typography color="text.disabled" variant="subtitle2">
        {delta < 0 ? (
          <Typography fontWeight={600} component="span" color="error.main">
            <ArrowDropDownRounded fontSize="large" sx={{ verticalAlign: 'bottom', m: -0.75, mr: -1.25 }} />{' '}
            {Math.abs(delta)}%
          </Typography>
        ) : (
          <Typography fontWeight={600} component="span" color="success.main">
            <ArrowDropUpRounded fontSize="large" sx={{ verticalAlign: 'bottom', m: -0.75, mr: -1.25 }} />{' '}
            {Math.abs(delta)}%
          </Typography>
        )}
      </Typography>
    )}
  </Box>
)

const Frame = styled(Box)({
  position: 'absolute',
  zIndex: 1,
  pointerEvents: 'none'
})

const StatsGrid: FC<StatsGridProps> = ({ items }) => {
  const theme = useTheme<Theme>()
  const border = `1px solid ${theme.palette.divider}`
  const borderBg = `1px solid ${theme.palette.background.paper}`
  return (
    <Paper
      elevation={1}
      sx={{
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Frame border={borderBg} left={0} top={0} right={0} bottom={0} />
      <Grid container>
        {items.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} borderBottom={border} position="relative" zIndex={0}>
            <Frame borderRight={border} right={0} top={24} bottom={24} />
            <StatsGridItem {...item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default StatsGrid
