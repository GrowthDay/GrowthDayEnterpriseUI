import { CloseOutlined } from '@mui/icons-material'
import { Dialog, DialogProps, DialogTitle, IconButton } from '@mui/material'
import { nanoid } from 'nanoid'
import React, { ReactNode, useRef } from 'react'
import useMobileView from '../hooks/useMobileView'

const withDialog =
  (title?: ReactNode, dialogProps?: Partial<DialogProps>) =>
  <P extends {}>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const labelledByRef = useRef(`dialog-title-${nanoid()}`)
    const mobileView = useMobileView()
    const allDialogProps = { ...dialogProps, ...props } as unknown as DialogProps
    return (
      <Dialog fullScreen={mobileView} {...allDialogProps} aria-labelledby={title ? labelledByRef.current : undefined}>
        {allDialogProps.onClose && (
          <IconButton
            onClick={() => allDialogProps.onClose?.({}, 'backdropClick')}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
              zIndex: 1
            }}
          >
            <CloseOutlined />
          </IconButton>
        )}
        {title && <DialogTitle id={labelledByRef.current}>{title}</DialogTitle>}
        <Component {...(props as P)} />
      </Dialog>
    )
  }

export default withDialog
