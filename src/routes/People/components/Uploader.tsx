import { InfoOutlined } from '@mui/icons-material'
import { Box, Collapse, Icon, IconButton, Link, styled, Typography } from '@mui/material'
import { keys, toLower } from 'lodash-es'
import urlJoin from 'proper-url-join'
import { ChangeEvent, FC, ReactNode, useState } from 'react'
import { FilePlus, FileText, Trash } from 'react-feather'
import Flex from '../../../components/Flex'
import config from '../../../config'
import { OrganizationUser } from '../../../types/api'
import roles from '../../../utils/roles'
import { fileToJson, SheetFileTypes } from '../../../utils/sheetsUtil'

export type UploaderProps = {
  onUpload?: (users: OrganizationUser[]) => void | Promise<void>
  onRemove?: () => void
  disabled?: boolean
}

const Wrapper = styled(Box, {
  shouldForwardProp: (propName: string) => !['disabled', 'loading', 'interactive'].includes(propName)
})<{
  disabled?: boolean
  loading?: boolean
  interactive?: boolean
}>(({ theme: { palette, transitions }, disabled, loading, interactive }) => ({
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
  backgroundColor: palette.background.default,
  border: `1px dashed ${palette.divider}`,
  borderRadius: 8,
  padding: 24,
  ...(interactive && !loading && !disabled
    ? {
        cursor: loading ? 'progress' : 'pointer',
        transition: transitions.create('background-color'),
        '&:hover': { backgroundColor: palette.action.hover }
      }
    : {}),
  ...(disabled ? { opacity: 0.72 } : {})
}))

const Input = styled('input')({
  position: 'absolute',
  zIndex: 1,
  opacity: 0,
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer'
})

const parseData = (data: any[] = []): OrganizationUser[] =>
  data
    .map((row) => {
      const rowKeys = keys(row)
      const emailKey = rowKeys.find((key) => toLower(key).includes('email'))
      const roleKey = rowKeys.find((key) => toLower(key).includes('role'))

      const email = emailKey && row[emailKey] ? toLower(row[emailKey]?.toString()).trim() : ''
      const roleIdOrName = roleKey && row[roleKey] ? toLower(row[roleKey]?.toString()).trim() : ''
      const role = roleIdOrName
        ? roles.find((r) => r.id === parseInt(roleIdOrName) || toLower(r.name).trim().includes(roleIdOrName))
        : undefined

      return { email, roleId: role?.id ?? 3 }
    })
    .filter((row) => row.email)

const Uploader: FC<UploaderProps> = ({ onRemove, onUpload, disabled }) => {
  const [file, setFile] = useState<File>()
  const [error, setError] = useState<ReactNode>()
  const [loading, setLoading] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const fileUrl = urlJoin(config.publicUrl, 'files', 'invite-members.xls')
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setError(undefined)
    setLoading(true)
    if (!disabled && !loading && !file) {
      const file = event.target.files?.[0]
      event.target.value = ''
      if (file) {
        const data = await fileToJson(file)
        const rows = parseData(data)
        if (rows.length) {
          await onUpload?.(rows)
          setFile(file)
        } else {
          setError('Please check the uploaded file')
        }
      }
    }
    setLoading(false)
  }
  const handleFileRemove = () => {
    setError(undefined)
    setFile(undefined)
    onRemove?.()
  }

  if (file) {
    return (
      <Wrapper disabled={disabled} sx={{ py: 1.5, px: 2 }}>
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Typography color="primary">
            <Icon component={FileText} sx={{ mr: 0.5, mb: '-6px' }} color="inherit" /> {file.name}
          </Typography>
          <IconButton onClick={handleFileRemove} size="small">
            <Icon component={Trash} fontSize="small" />
          </IconButton>
        </Flex>
      </Wrapper>
    )
  }

  return (
    <>
      <Wrapper
        disabled={disabled}
        loading={loading}
        interactive
        {...(disabled || loading ? {} : { htmlFor: 'invite-file-upload', component: 'label' })}
      >
        {!loading && (
          <Link
            onClick={() => setShowHelp((visible) => !visible)}
            position="absolute"
            zIndex={2}
            right={12}
            top={8}
            variant="caption"
            color="text.secondary"
            fontWeight={400}
          >
            Need help?
          </Link>
        )}
        <Icon component={FilePlus} sx={{ mb: 1 }} fontSize="large" color="primary" />
        {loading ? (
          <Typography variant="body2" color="text.secondary">
            Uploading
          </Typography>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              Drag & drop or{' '}
              <Typography
                component="span"
                variant="inherit"
                fontWeight={500}
                color="primary"
                sx={{ '&:hover': { textDecoration: 'underline' } }}
              >
                browse
              </Typography>{' '}
              CSV or Excel file to upload
            </Typography>
            {error && (
              <Typography variant="body2" color="error.main">
                {error}
              </Typography>
            )}
            <Input
              type="file"
              data-cy="invite-modal-file-input"
              accept={SheetFileTypes}
              id="invite-file-upload"
              disabled={disabled}
              onChange={handleFileUpload}
            />
          </>
        )}
      </Wrapper>
      <Collapse in={showHelp && !loading && !disabled}>
        <Box
          borderTop="none!important"
          borderRadius="0 0 8px 8px"
          border={(theme) => `1px solid ${theme.palette.action.selected}`}
          p={2}
          data-cy="invite-modal-text"
          color="text.secondary"
          sx={{ strong: { fontWeight: 500 } }}
        >
          <Typography mb={2} variant="body2">
            Upload an Excel or .csv file with the following parameters:
          </Typography>
          <Typography variant="body2">
            <strong>Cell A1:</strong> ‘Email’ as the column header
          </Typography>
          <Typography mb={2} variant="body2">
            <strong>Column A:</strong> Company email of every person you want to invite to GrowthDay
          </Typography>
          <Typography variant="body2">
            <strong>Cell B1:</strong> Include ‘Role’ as the column header
          </Typography>
          <Typography mb={2} variant="body2">
            <strong>Column B:</strong> Role of each person (must be Admin or Employee)
          </Typography>
          <Link fontWeight={400} variant="body2" href={fileUrl} download>
            <InfoOutlined sx={{ marginBottom: '-5px', marginRight: 0.5 }} fontSize="small" /> Download an example
            spreadsheet
          </Link>
        </Box>
      </Collapse>
    </>
  )
}

export default Uploader
