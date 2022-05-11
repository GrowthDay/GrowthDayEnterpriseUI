import { Dialog, DialogProps, DialogTitle } from '@mui/material'
import { nanoid } from 'nanoid'
import React, { ReactNode, useRef } from 'react'
import CloseButton from '../components/CloseButton'
import useMobileView from '../hooks/useMobileView'

const withDialog =
  (title?: ReactNode, dialogProps?: Partial<DialogProps>) =>
  <P extends {}>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const labelledByRef = useRef(`dialog-title-${nanoid()}`)
    const mobileView = useMobileView()
    const allDialogProps = { ...dialogProps, ...props } as unknown as DialogProps
    return (
      <Dialog
        fullScreen={mobileView}
        closeAfterTransition
        {...allDialogProps}
        {...(title ? { 'aria-labelledby': labelledByRef.current } : {})}
      >
        {allDialogProps.onClose && <CloseButton onClick={() => allDialogProps.onClose?.({}, 'backdropClick')} />}
        {title && <DialogTitle id={labelledByRef.current}>{title}</DialogTitle>}
        <Component {...(props as P)} />
      </Dialog>
    )
  }

export default withDialog
