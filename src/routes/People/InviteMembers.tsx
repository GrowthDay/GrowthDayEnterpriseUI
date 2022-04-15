import { yupResolver } from '@hookform/resolvers/yup'
import { AddOutlined, CheckOutlined, CloseOutlined, FileUploadOutlined, InfoOutlined } from '@mui/icons-material'
import { alpha } from '@mui/system/colorManipulator'
import { LoadingButton } from '@mui/lab'
import {
  Backdrop,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogProps,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  Link,
  MenuItem,
  styled,
  Theme,
  Tooltip,
  Typography
} from '@mui/material'
import { camelCase, mapKeys, toLower, uniqBy } from 'lodash-es'
import moment from 'moment'
import urlJoin from 'proper-url-join'
import { ChangeEvent, FC, useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import useInviteUsersInOrganizationMutation from '../../api/mutations/useInviteUsersInOrganizationMutation'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import useOrganizationUsersQuery from '../../api/queries/useOrganizationUsersQuery'
import Flex from '../../components/Flex'
import Form from '../../components/forms/Form'
import FormInput from '../../components/forms/FormInput'
import Loading from '../../components/Loading'
import config from '../../config'
import withDialog from '../../hoc/withDialog'
import useFormPersist from '../../hooks/useFormPersist'
import useMobileView from '../../hooks/useMobileView'
import { OrganizationUser } from '../../types/api'
import getPrefixedKey from '../../utils/getPrefixedKey'
import roles, { renderRoleName, renderRoleNameById } from '../../utils/roles'
import { fileToJson, jsonToXlsxFile, SheetFileTypes } from '../../utils/sheetsUtil'
import invitePollingState from './atoms/invitePollingState'

const Input = styled('input')({
  display: 'none'
})

export type InviteMembersProps = Omit<DialogProps, 'children'>

const validationSchema = yup
  .object()
  .shape({
    invitations: yup.array().of(
      yup.object().shape({
        email: yup.string().required(''),
        roleId: yup.number().nullable().required('')
      })
    )
  })
  .required()

const defaultValues: OrganizationUser = {
  email: '',
  roleId: 3
}

type IInvitationRequest = {
  invitations: Array<OrganizationUser>
}

const parseData = (data: any[] = []): OrganizationUser[] =>
  data
    .map((row) => {
      const rowData = mapKeys(row, (value, key) => camelCase(key))
      const role = roles.find(
        (r) => r.id === parseInt(rowData.role as string) || toLower(r.name).includes(toLower(rowData.role?.toString()))
      )
      return { email: rowData.email, roleId: role?.id ?? 3 }
    })
    .filter((row) => row.email)

const errorMessage = 'You cannot invite more users as you have used all your seats. Add more seats to invite users'

const InviteMembers: FC<InviteMembersProps> = ({ onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const setInvitePollingState = useSetRecoilState(invitePollingState)
  const { mutateAsync, isLoading } = useInviteUsersInOrganizationMutation()
  const { data, isLoading: isLoadingSeats } = useOrganizationUsersQuery({ page: 0, size: 1 }, {}, { cacheTime: 0 })
  const { data: organization } = useOrganizationQuery()
  const mobileView = useMobileView()
  const seatsLeft = (organization?.seats ?? 0) - (data?.totalRecords ?? 0)
  const canInvite = seatsLeft > 0
  const disabled = isLoadingSeats || !canInvite

  const methods = useForm<IInvitationRequest>({
    defaultValues: {
      invitations: [defaultValues]
    },
    resolver: yupResolver(validationSchema)
  })
  const { fields, append, remove, replace } = useFieldArray({
    control: methods.control,
    name: 'invitations'
  })
  useFormPersist(getPrefixedKey('INVITE_MEMBERS'), methods)

  const handleSubmit = async (values: IInvitationRequest) => {
    if (canInvite) {
      const data = values.invitations.slice(0, seatsLeft).map(({ email, roleId }) => ({
        Email: email,
        'Full Name': '',
        Role: roleId,
        Department: ''
      }))
      const file = jsonToXlsxFile(data)
      await mutateAsync(file)
      methods.reset({ invitations: [defaultValues] })
      setInvitePollingState(moment().add(30, 's').valueOf())
      onClose?.({}, 'backdropClick')
    }
  }

  const handleAppend = () => {
    const invitations = methods.getValues('invitations')
    if (canInvite && seatsLeft > invitations.length) {
      append(defaultValues)
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: 'smooth'
          })
        }
      })
    }
  }

  const fileUrl = urlJoin(config.publicUrl, 'files', 'invite-members.xls')

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (canInvite && file) {
      const data = await fileToJson(file)
      const rows = parseData(data)
      const invitations = methods.getValues('invitations').filter((row) => row.email)
      const newInvitations = uniqBy([...invitations, ...rows], (row) => toLower(row.email)).slice(0, seatsLeft)
      replace(newInvitations)
    }
  }

  const addMoreButton = (
    <Tooltip title={canInvite ? '' : errorMessage}>
      <span>
        <Button
          disabled={disabled || seatsLeft <= fields.length}
          size="small"
          sx={{ mb: 0.5 }}
          onClick={handleAppend}
          variant="outlined"
          startIcon={<AddOutlined />}
          data-cy="invite-modal-add-more-button"
        >
          Add more
        </Button>
      </span>
    </Tooltip>
  )

  return (
    <>
      <DialogContent ref={contentRef}>
        <Box mb={3} bgcolor="action.hover" p={2} borderRadius={2} data-cy="invite-modal-text">
          <Typography variant="body2" paragraph>
            Upload an Excel or .csv file with the following parameters:
          </Typography>
          <Typography variant="body2" paragraph>
            Column A: Include the email of every person you want to make GrowthDay available to.
          </Typography>
          <Typography variant="body2" paragraph>
            Cell A1: Include a column header (ie Email Address)
          </Typography>
          <Typography variant="body2" paragraph>
            Then add additional columns to segment reporting. Each additional column must contain a unique header and
            these additional columns should not include any identifying information (ie. first name, last name, SSN)
          </Typography>
          <Link variant="body2" href={fileUrl} download>
            <InfoOutlined sx={{ verticalAlign: 'text-bottom' }} fontSize="small" /> Need help? See an example
            spreadsheet?
          </Link>
        </Box>
        <Flex mb={3} alignItems="center">
          <Typography variant="body2">New file:</Typography>
          <label htmlFor="invite-members-file">
            <Input
              disabled={disabled}
              onChange={handleFileUpload}
              accept={SheetFileTypes}
              id="invite-members-file"
              type="file"
              data-cy="invite-modal-file-input"
            />
            <Button
              disabled={disabled}
              component="span"
              sx={{ ml: 2 }}
              variant="outlined"
              startIcon={<FileUploadOutlined fontSize="small" />}
              data-cy="invite-modal-upload-button"
            >
              Upload xls or csv
            </Button>
          </label>
        </Flex>
        <Divider light sx={{ '&:before': { content: 'none' } }}>
          <Typography sx={{ ml: -1.2 }} color="text.disabled">
            or manually enter the email address
          </Typography>
        </Divider>
        <Form<IInvitationRequest>
          id="invitation-form"
          methods={methods}
          onSuccess={handleSubmit}
          sx={{ position: 'relative', my: 2 }}
          data-cy="invite-modal-form"
        >
          {fields.map((item, index) => (
            <Grid mb={2} spacing={2} container key={item.id}>
              <Grid alignItems="flex-end" container item xs={mobileView ? 7 : 5}>
                <FormInput
                  disabled={disabled}
                  placeholder="example@email.com"
                  name={`invitations.${index}.email`}
                  label={index === 0 ? 'Email Address' : ''}
                  type="email"
                  data-cy="invite-modal-email-input"
                />
              </Grid>
              <Grid alignItems="flex-end" container item xs={(fields.length > 1 ? 3 : 4) + (mobileView ? 1 : 0)}>
                <FormInput
                  disabled={disabled}
                  placeholder="Role"
                  name={`invitations.${index}.roleId`}
                  select
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) =>
                      renderRoleNameById(value as number) || (
                        <Typography color="text.disabled" component="span">
                          Role
                        </Typography>
                      )
                  }}
                  data-cy="invite-modal-role-input"
                >
                  {roles.map((role) => (
                    <MenuItem
                      value={role.id}
                      key={role.id}
                      sx={{
                        minWidth: 140,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '&:not(.Mui-selected) .MuiSvgIcon-root': { display: 'none' }
                      }}
                      data-cy={`invite-modal-role-${role.name}`}
                    >
                      {renderRoleName(role)} <CheckOutlined sx={{ ml: 2 }} color="primary" fontSize="small" />
                    </MenuItem>
                  ))}
                </FormInput>
              </Grid>
              {fields.length > 1 && (
                <Grid alignItems="flex-end" container item xs={1}>
                  <IconButton size="small" sx={{ mb: 0.75 }} onClick={() => remove(index)}>
                    <CloseOutlined fontSize="small" />
                  </IconButton>
                </Grid>
              )}
              {!mobileView && index === fields.length - 1 && (
                <Grid alignItems="flex-end" container item xs={3}>
                  {addMoreButton}
                </Grid>
              )}
            </Grid>
          ))}
          {mobileView && addMoreButton}
        </Form>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <LoadingButton
          sx={{ mr: 2, flexShrink: 0 }}
          disabled={disabled}
          form="invitation-form"
          loading={isLoading}
          variant="contained"
          type="submit"
          data-cy="invite-modal-send-button"
        >
          Send Invite
        </LoadingButton>
        {!canInvite && <FormHelperText error>{errorMessage}</FormHelperText>}
      </DialogActions>
      <Backdrop
        sx={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: (theme: Theme) => alpha(theme.palette.background.paper, 0.5)
        }}
        open={isLoadingSeats}
      >
        <Loading />
      </Backdrop>
    </>
  )
}

export default withDialog('Invite members')(InviteMembers)
