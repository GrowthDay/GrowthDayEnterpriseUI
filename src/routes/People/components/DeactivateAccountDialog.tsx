import { InfoOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, DialogContent, DialogProps, Tooltip, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FC, useRef } from 'react'
import useDeactivateMutation from '../../../api/mutations/useDeactivateMutation'
import withDialog from '../../../hoc/withDialog'
import { OrganizationUser } from '../../../types/api'
import coerceArray from '../../../utils/coerceArray'

export type DeactivateAccountDialogProps = DialogProps & {
  users?: OrganizationUser | OrganizationUser[]
}

const DeactivateAccountDialog: FC<DeactivateAccountDialogProps> = ({ users: _users, onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const users = useRef(coerceArray(_users)).current
  const handleClose = () => onClose?.({}, 'backdropClick')
  const { mutateAsync, isLoading } = useDeactivateMutation()

  const handleDeactivate = async () => {
    const ids = users.map((user) => user.id)
    await mutateAsync(ids)
    enqueueSnackbar(`Account${users.length === 1 ? '' : 's'} deactivated!`, { variant: 'success' })
    handleClose()
  }

  return (
    <>
      <DialogContent>
        {users.length === 1 ? (
          <Typography color="text.secondary">{users[0].email} will be removed from the next billing cycle</Typography>
        ) : (
          <>
            <Typography gutterBottom color="text.secondary">
              Following accounts will be removed from the next billing cycle
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
        <LoadingButton onClick={handleDeactivate} loading={isLoading}>
          Deactivate
        </LoadingButton>
        <Button disabled={isLoading} variant="text" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Tooltip title="The seat would remain occupied for current billing cycle.">
          <InfoOutlined fontSize="small" color="action" sx={{ position: 'absolute', right: 24 }} />
        </Tooltip>
      </DialogActions>
    </>
  )
}

export default withDialog('Deactivate account?')(DeactivateAccountDialog)
