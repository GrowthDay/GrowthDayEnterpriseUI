import { yupResolver } from '@hookform/resolvers/yup'
import { AddOutlined, CloseOutlined, FileUploadOutlined, InfoOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogProps,
  Divider,
  Grid,
  IconButton,
  Link,
  MenuItem,
  styled,
  Typography
} from '@mui/material'
import { camelCase, last, mapKeys, toLower } from 'lodash-es'
import urlJoin from 'proper-url-join'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as XLSX from 'xlsx'
import * as yup from 'yup'
import Flex from '../../components/Flex'
import Form from '../../components/forms/Form'
import FormInput from '../../components/forms/FormInput'
import config from '../../config'
import withDialog from '../../hoc/withDialog'
import roles from '../../utils/roles'

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
        role: yup.string().required('')
      })
    )
  })
  .required()

const defaultValues = {
  email: '',
  role: ''
}

type RowData = typeof defaultValues

type IInvitationRequest = {
  invitations: Array<RowData>
}

const parseData = (data: any[] = []): RowData[] =>
  data
    .map((row) => {
      const rowData = mapKeys(row, (value, key) => camelCase(key)) as RowData
      const role = roles.find(
        (r) => toLower(r.value) === toLower(rowData.role) || toLower(r.label) === toLower(rowData.role)
      )
      return { email: rowData.email, role: role?.value ?? '' }
    })
    .filter((row) => row.email)

const InviteMembers: FC<InviteMembersProps> = ({ onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IInvitationRequest>({
    defaultValues: {
      invitations: [defaultValues]
    },
    resolver: yupResolver(validationSchema)
  })
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'invitations'
  })

  const handleSubmit = async (values: IInvitationRequest) => {
    setLoading(true)
    console.log(values)
    setLoading(false)
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

  const fileUrl = urlJoin(config.publicUrl, 'files', 'invite-members.xls')

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as ArrayBuffer
        const wb = XLSX.read(result)
        const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        const rows = parseData(data)
        const existingEmails = methods.getValues('invitations').map((row) => row.email)
        const filteredRows = rows.filter((row) => !existingEmails.includes(row.email))
        if (!last(existingEmails)) {
          remove(existingEmails.length - 1)
        }
        append(filteredRows)
      }
      reader.readAsArrayBuffer(file)
    }

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <>
      <DialogContent ref={contentRef}>
        <Box mb={3} bgcolor="action.hover" p={2} borderRadius={2}>
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
              onChange={handleFileUpload}
              ref={inputRef}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              id="invite-members-file"
              type="file"
            />
            <Button
              component="span"
              sx={{ ml: 2 }}
              variant="outlined"
              startIcon={<FileUploadOutlined fontSize="small" />}
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
        >
          {fields.map((item, index) => (
            <Grid mb={2} spacing={2} container key={item.id}>
              <Grid alignItems="flex-end" container item xs={5}>
                <FormInput
                  placeholder="example@email.com"
                  name={`invitations.${index}.email`}
                  label={index === 0 ? 'Email Address' : ''}
                  type="email"
                />
              </Grid>
              <Grid alignItems="flex-end" container item xs={fields.length > 1 ? 3 : 4}>
                <FormInput
                  placeholder="Role"
                  name={`invitations.${index}.role`}
                  select
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) =>
                      roles.find((role) => role.value === (value as string))?.label || (
                        <Typography color="text.disabled" component="span">
                          Role
                        </Typography>
                      )
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem value={role.value} key={role.value}>
                      {role.label}
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
              {index === fields.length - 1 && (
                <Grid alignItems="flex-end" container item xs={3}>
                  <Button
                    size="small"
                    sx={{ mb: 0.5 }}
                    onClick={handleAppend}
                    variant="outlined"
                    startIcon={<AddOutlined />}
                  >
                    Add more
                  </Button>
                </Grid>
              )}
            </Grid>
          ))}
        </Form>
      </DialogContent>
      <DialogActions>
        <LoadingButton form="invitation-form" loading={loading} variant="contained" type="submit">
          Send Invite
        </LoadingButton>
      </DialogActions>
    </>
  )
}

export default withDialog('Invite members')(InviteMembers)
