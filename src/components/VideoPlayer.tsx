import { FC } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import AspectRatio, { AspectRatioProps } from './AspectRatio'

export type VideoPlayerProps = ReactPlayerProps & {
  ContainerProps?: Partial<AspectRatioProps>
}

const VideoPlayer: FC<VideoPlayerProps> = ({ ContainerProps, ...props }) => (
  <AspectRatio ratio="16 / 9" width="100%" overflow="hidden" {...ContainerProps}>
    <ReactPlayer width="100%" height="100%" {...props} />
  </AspectRatio>
)

export default VideoPlayer
