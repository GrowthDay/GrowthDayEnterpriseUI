import { Box, Button, Divider, InputAdornment, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FC, ReactNode } from 'react'
import useCopyToClipboard from '../hooks/useCopyToClipboard'
import Flex from './Flex'

export type CopyTextProps = {
  label?: ReactNode
  text?: string
}

const CopyText: FC<CopyTextProps> = ({ text, label }) => {
  const [, copy] = useCopyToClipboard()
  const { enqueueSnackbar } = useSnackbar()
  const handleCopy = async () => {
    await copy(text ?? '')
    enqueueSnackbar('Copied!', {
      autoHideDuration: 1000
    })
  }
  return (
    <Flex maxWidth="100%" alignItems="center">
      <Typography flexShrink={0} variant="body2">
        {label}
      </Typography>
      <Box mx={1} />
      <TextField
        sx={{
          flex: 1,
          backgroundColor: (theme) => theme.palette.common.white,
          borderRadius: 1,
          p: (theme) => theme.spacing(0.5, 0.5, 0.5, 2)
        }}
        InputProps={{
          readOnly: true,
          disableUnderline: true,
          sx: { fontSize: 14 },
          endAdornment: (
            <InputAdornment sx={{ height: 'auto' }} position="end">
              <Divider flexItem orientation="vertical" sx={{ mr: 0.5 }} />
              <Button onClick={handleCopy} size="small" variant="text">
                COPY
              </Button>
            </InputAdornment>
          )
        }}
        value={text}
        variant="standard"
      />
    </Flex>
  )
}

export default CopyText
