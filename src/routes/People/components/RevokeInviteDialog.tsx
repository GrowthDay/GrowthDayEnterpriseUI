import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogProps, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FC, useRef } from 'react'
import useRevokeMutation from '../../../api/mutations/useRevokeMutation'
import withDialog from '../../../hoc/withDialog'
import { OrganizationUser } from '../../../types/api'
import coerceArray from '../../../utils/coerceArray'

export type RevokeInviteDialogProps = DialogProps & {
  users?: OrganizationUser | OrganizationUser[]
}

const RevokeInviteDialog: FC<RevokeInviteDialogProps> = ({ users: _users, onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const users = useRef(coerceArray(_users)).current
  const handleClose = () => onClose?.({}, 'backdropClick')
  const { mutateAsync, isLoading } = useRevokeMutation()

  const handleRevoke = async () => {
    const ids = users.map((user) => user.id)
    await mutateAsync(ids)
    enqueueSnackbar(`Invitation${users.length === 1 ? '' : 's'} revoked!`, { variant: 'success' })
    handleClose()
  }
  return (
    <>
      <DialogContent>
        {users.length === 1 ? (
          <Typography color="text.secondary">
            Are you sure you want to revoke the invitation to {users[0].email}? If revoked, the seat will become
            available for reassignment.
          </Typography>
        ) : (
          <>
            <Typography gutterBottom color="text.secondary">
              If revoked, the following seats will be available for reassignment
            </Typography>
            {users.map((user) => (
              <Typography key={user.id} color="text.secondary">
                {user.email}
              </Typography>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ borderTop: 'none', paddingTop: 0 }}>
        <LoadingButton onClick={handleRevoke} loading={isLoading}>
          Revoke
        </LoadingButton>
        <Button disabled={isLoading} variant="text" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  )
}

export default withDialog('Revoke invitation?')(RevokeInviteDialog)
