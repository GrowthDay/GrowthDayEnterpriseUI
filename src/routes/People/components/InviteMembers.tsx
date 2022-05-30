import { yupResolver } from '@hookform/resolvers/yup'
import { AddOutlined, CheckCircle, CheckOutlined, CloseOutlined, InfoOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  CircularProgress,
  Collapse,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  MenuItem,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { get, sortBy, toLower } from 'lodash-es'
import moment from 'moment'
import * as React from 'react'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FieldPath, FieldValues } from 'react-hook-form/dist/types'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import useInviteUsersInOrganizationMutation from '../../../api/mutations/useInviteUsersInOrganizationMutation'
import useUpdateSubscriptionMutation from '../../../api/mutations/useUpdateSubscriptionMutation'
import useVerifyEmailsMutation, {
  EmailStatusType,
  VerifyEmailsResponse
} from '../../../api/mutations/useVerifyEmailsMutation'
import useOrganizationQuery from '../../../api/queries/useOrganizationQuery'
import useOrganizationUsersQuery from '../../../api/queries/useOrganizationUsersQuery'
import useProratedAmountQuery from '../../../api/queries/useProratedAmountQuery'
import Flex from '../../../components/Flex'
import Form from '../../../components/forms/Form'
import FormInput from '../../../components/forms/FormInput'
import withDialog from '../../../hoc/withDialog'
import useFormPersist from '../../../hooks/useFormPersist'
import useMobileView from '../../../hooks/useMobileView'
import { OrganizationUpdateSubscription, OrganizationUser } from '../../../types/api'
import { formatCurrency } from '../../../utils/formatters'
import getPrefixedKey from '../../../utils/getPrefixedKey'
import roles, { renderRoleName, renderRoleNameById } from '../../../utils/roles'
import { jsonToXlsxFile } from '../../../utils/sheetsUtil'
import invitePollingState from '../atoms/invitePollingState'
import Uploader from './Uploader'

export type InviteMembersProps = Omit<DialogProps, 'children'>

yup.addMethod(yup.string, 'unique', function (message: string, path: string, mapper: (a: any) => string | number) {
  return this.test('unique', message, function (value) {
    const occurrences =
      get(this, path)
        ?.map(mapper)
        ?.filter(Boolean)
        ?.filter((entity: string | number) => entity === value) ?? []
    return occurrences.length <= 1
  })
})

const validationSchema = (verifyEmailsData?: VerifyEmailsResponse) =>
  yup
    .object()
    .shape({
      invitations: yup.array().of(
        yup.object().shape({
          email: (yup as any)
            .string()
            .required('Required')
            .email('Enter a valid email')
            .unique('Email must be unique', 'from.1.value.invitations', (a: any) => toLower(a?.email).trim())
            .test(
              'exists',
              <>
                Existing account{' '}
                <Tooltip
                  title={
                    <>
                      This email id is already linked with an account. Change email id or{' '}
                      <Link underline="always" color="inherit" target="_blank" href="mailto:support@growthday.com">
                        contact support
                      </Link>
                    </>
                  }
                >
                  <InfoOutlined sx={{ fontSize: 15, mb: -0.35 }} color="inherit" />
                </Tooltip>
              </>,
              (value?: string) => !(verifyEmailsData?.[toLower(value).trim()] === EmailStatusType.USER_EXISTS_IN_SYSTEM)
            )
            .test(
              'member',
              'Already a member',
              (value?: string) =>
                !(verifyEmailsData?.[toLower(value).trim()] === EmailStatusType.USER_EXISTS_IN_ORGANIZATION)
            )
            .test(
              'invalid',
              'Enter a valid email',
              (value?: string) => !(verifyEmailsData?.[toLower(value).trim()] === EmailStatusType.INVALID_EMAIL)
            ),
          roleId: yup.number().nullable().required('Required')
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

const labelledById = 'invite-members-dialog-title'

const InviteMembers: FC<InviteMembersProps> = ({ onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [invited, setInvited] = useState<number | null>(null)
  const setInvitePollingState = useSetRecoilState(invitePollingState)
  const { mutateAsync: updateSubscription, isLoading: isLoadingUpdateSubscription } = useUpdateSubscriptionMutation()
  const { mutateAsync: inviteUsers, isLoading: isInviteLoading } = useInviteUsersInOrganizationMutation()
  const { data: verifyEmailsData, mutateAsync: verifyEmails, isLoading: isVerifyLoading } = useVerifyEmailsMutation()
  const { data: organizationUsers, isLoading: isLoadingSeats } = useOrganizationUsersQuery(
    { page: 0, size: 1 },
    {},
    { cacheTime: 0 }
  )
  const { data: organization } = useOrganizationQuery()
  const mobileView = useMobileView()

  const verifyEmailsDataRef = useRef(verifyEmailsData)

  if (verifyEmailsData) {
    verifyEmailsDataRef.current = verifyEmailsData
  }

  const seatsLeft = (organization?.seats ?? 0) - (organizationUsers?.totalRecords ?? 0)
  const disabled = isInviteLoading || isLoadingUpdateSubscription

  const methods = useForm<IInvitationRequest>({
    defaultValues: {
      invitations: [defaultValues]
    },
    resolver: yupResolver(validationSchema(verifyEmailsDataRef.current)),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })
  const { fields, append, remove, replace } = useFieldArray({
    control: methods.control,
    name: 'invitations'
  })
  useFormPersist(getPrefixedKey('INVITE_MEMBERS'), methods)

  const hasAnyEmail = Boolean(
    methods.getValues('invitations').length > 1 ||
      methods.getValues('invitations')?.some((invitation) => invitation.email)
  )

  const getEmails = useCallback(() => {
    const errors = methods.formState.errors?.invitations
    const invitations = methods.getValues('invitations').filter((value, index) => !errors?.[index])
    return invitations.map(({ email }) => toLower(email).trim()).filter(Boolean) as string[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods, methods.formState.errors])

  const seatsToInvite = getEmails().filter(
    (email) => verifyEmailsDataRef.current?.[email] === EmailStatusType.VALID
  ).length
  const seatsToPurchase = seatsToInvite - seatsLeft
  const totalSeats = seatsToInvite + (organizationUsers?.totalRecords ?? 0)

  const organizationUpdateSubscription: OrganizationUpdateSubscription = {
    totalSeats,
    stripePriceId: organization?.stripePriceId
  }
  const { data: proratedAmount, isFetching: isProratedAmountFetching } = useProratedAmountQuery(
    organizationUpdateSubscription,
    { enabled: seatsToPurchase > 0 && !isVerifyLoading && !isLoadingSeats }
  )

  const handleVerifyEmails = useCallback(() => {
    setTimeout(() => {
      const emails = getEmails()
      if (emails.length) {
        verifyEmails(emails)
      }
    })
  }, [getEmails, verifyEmails])

  useEffect(() => {
    const emails = getEmails()
    if (emails.length) {
      handleVerifyEmails()
    }
  }, [getEmails, handleVerifyEmails])

  useEffect(() => {
    setTimeout(() => {
      if (verifyEmailsDataRef.current) {
        const emails = getEmails()
        if (emails.length) {
          const fieldNames = methods
            .getValues('invitations')
            .reduce<string[]>(
              (names, curr, index) => [
                ...names,
                ...(Boolean(toLower(curr.email).trim()) ? [`invitations.${index}.email`] : [])
              ],
              []
            )
          methods.trigger(fieldNames as any)
        }
      }
    })
  }, [methods, verifyEmailsData, getEmails])

  const handleSubmit = async () => {
    const validEmails = getEmails().filter((email) => verifyEmailsDataRef.current?.[email] === EmailStatusType.VALID)
    if (!isVerifyLoading && !isProratedAmountFetching && !isLoadingSeats && seatsToInvite === validEmails.length) {
      const invitations = methods.getValues('invitations')
      const data = invitations
        .filter((invitation) => validEmails.includes(invitation.email ?? ''))
        .map(({ email, roleId }) => ({
          Email: toLower(email).trim(),
          'Full Name': '',
          Role: roleId,
          Department: ''
        }))
      const file = jsonToXlsxFile(data)
      // TODO: Remove updating subscription while inviting when backend is ready
      if (seatsToPurchase > 0) {
        await updateSubscription(organizationUpdateSubscription)
      }
      await inviteUsers(file)
      methods.reset({ invitations: [defaultValues] })
      setInvitePollingState(moment().add(30, 's').valueOf())
      setInvited(data.length)
    }
  }

  const handleAppend = () => {
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

  const handleFileUpload = async (rows: OrganizationUser[]) => {
    if (rows) {
      const emails = rows.map((row) => row.email) as string[]
      const response = await verifyEmails(emails)
      const sortedRows = sortBy(rows, (row) => (row.email && response[row.email] === EmailStatusType.VALID ? 1 : 0))
      replace(sortedRows)
    }
  }

  const onReset = () => methods.reset()

  if (invited) {
    return (
      <>
        <DialogTitle id={labelledById}>
          <CheckCircle sx={{ mb: -0.75, fontSize: 30 }} color="success" /> {invited} Member{invited === 1 ? '' : 's'}{' '}
          Invited
        </DialogTitle>
        <DialogContent>
          <DialogContentText pb={1}>
            Members will receive an email invitation with a link to create an account.
          </DialogContentText>
        </DialogContent>
      </>
    )
  }

  const addMoreButton = (
    <span>
      <Button
        disabled={disabled}
        size="small"
        sx={{ mb: 0.5, pr: 2 }}
        onClick={handleAppend}
        variant="outlined"
        startIcon={<AddOutlined />}
        data-cy="invite-modal-add-more-button"
      >
        {fields.length > 0 ? 'Add more' : 'Add'}
      </Button>
    </span>
  )

  return (
    <>
      {isVerifyLoading && (
        <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none', zIndex: 1 }} />
      )}
      <DialogTitle id={labelledById}>Invite members</DialogTitle>
      <DialogContent ref={contentRef}>
        <Uploader onUpload={handleFileUpload} disabled={disabled} onRemove={onReset} />
        <Divider light sx={{ '&:before': { content: 'none' }, my: 2 }}>
          <Typography sx={{ ml: -1.2 }} color="text.disabled">
            or manually enter the email address
          </Typography>
        </Divider>
        <Form<IInvitationRequest>
          id="invitation-form"
          methods={methods}
          onSuccess={handleSubmit}
          onError={handleSubmit}
          sx={{ position: 'relative', mb: 2 }}
          data-cy="invite-modal-form"
        >
          {fields.map((item, index) => (
            <Grid alignItems="flex-start" mb={2} spacing={2} container key={item.id}>
              <Grid alignItems="flex-end" container item xs={mobileView ? 7 : 5}>
                <FormInput
                  disabled={disabled}
                  placeholder="example@email.com"
                  name={`invitations.${index}.email`}
                  label={index === 0 ? 'Email Address' : ''}
                  type="email"
                  data-cy="invite-modal-email-input"
                  onBlur={handleVerifyEmails}
                />
              </Grid>
              <Grid alignItems="flex-end" container item xs={3 + (mobileView ? 1 : 0)}>
                <FormInput
                  disabled={disabled}
                  placeholder="Role"
                  name={`invitations.${index}.roleId`}
                  select
                  label={index === 0 ? <>&nbsp;</> : ''}
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
              <Grid flexDirection="column" alignItems="flex-end" container item xs={1}>
                {index === 0 ? <>&nbsp;</> : ''}
                <IconButton size="small" sx={{ mt: 0.5 }} onClick={() => remove(index)}>
                  <CloseOutlined fontSize="small" />
                </IconButton>
              </Grid>
              {!mobileView && index === fields.length - 1 && (
                <Grid flexDirection="column" alignItems="flex-end" container item xs={3} sx={{ mt: 0.5 }}>
                  {index === 0 ? <>&nbsp;</> : ''}
                  {addMoreButton}
                </Grid>
              )}
            </Grid>
          ))}
          {(mobileView || fields.length <= 0) && addMoreButton}
        </Form>
      </DialogContent>
      <Collapse in={seatsToPurchase > 0} sx={{ flexShrink: 0 }}>
        <DialogActions sx={{ display: 'block', bgcolor: 'background.default', borderTop: 'none' }}>
          <Typography color="text.secondary" variant="body2">
            Purchase {seatsToPurchase} seat{seatsToPurchase === 1 ? '' : 's'}
          </Typography>
          <Flex alignItems="center" justifyContent="space-between">
            <Typography variant="body2">Prorated bill (for the remainder of the current year)</Typography>
            <Typography variant="body2" fontWeight={600}>
              {isProratedAmountFetching ? (
                <CircularProgress size={14} />
              ) : (
                <>
                  {formatCurrency((proratedAmount?.subTotalInCents ?? 0) / 100)}
                  <br />
                  <small>(approx)</small>
                </>
              )}
            </Typography>
          </Flex>
        </DialogActions>
      </Collapse>
      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <Stack spacing={1} direction="row">
          <LoadingButton
            disabled={isLoadingSeats || disabled || isProratedAmountFetching || seatsToInvite < 1}
            form="invitation-form"
            loading={isInviteLoading || isLoadingUpdateSubscription}
            variant="contained"
            type="submit"
            data-cy="invite-modal-send-button"
          >
            {seatsToInvite > 0 ? (
              <>
                Invite {seatsToInvite} member{seatsToInvite === 1 ? '' : 's'}
              </>
            ) : (
              <>Send Invite</>
            )}
          </LoadingButton>
          <Button disabled={!hasAnyEmail} color="inherit" size="small" variant="text" onClick={onReset}>
            Reset
          </Button>
        </Stack>
        {!isLoadingSeats && <FormHelperText>Remaining seats: {seatsLeft}</FormHelperText>}
      </DialogActions>
    </>
  )
}

export default withDialog(undefined, { 'aria-labelledby': labelledById })(InviteMembers)
