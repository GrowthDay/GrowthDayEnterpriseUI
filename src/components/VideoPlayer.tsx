import { Box, Paper, styled } from '@mui/material'
import { FC } from 'react'
import ReactPlayer from 'react-player'

export type VideoPlayerProps = {
  url: string
}

const StyledReactPlayer = styled(ReactPlayer)({
  position: `absolute`,
  top: 0,
  left: 0
})

const VideoPlayer: FC<VideoPlayerProps> = ({ url }) => (
  <Paper
    sx={{
      mt: -6,
      width: '100%',
      maxWidth: 480,
      mb: 2,
      borderRadius: 2,
      overflow: 'hidden'
    }}
  >
    <Box
      sx={{
        position: `relative`,
        paddingTop: `56.25%`
      }}
    >
      <StyledReactPlayer url={url} width="100%" height="100%" />
    </Box>
  </Paper>
)

export default VideoPlayer
