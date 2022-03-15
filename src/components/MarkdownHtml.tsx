import { styled } from '@mui/material'
import { FC } from 'react'
import ReactMarkdown, { Options as ReactMarkdownOptions } from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const StyledReactMarkdown = styled(ReactMarkdown)({
  p: {
    margin: 0
  }
})

const MarkdownHtml: FC<ReactMarkdownOptions> = (props) => (
  <StyledReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget="_blank" {...props} />
)

export default MarkdownHtml
