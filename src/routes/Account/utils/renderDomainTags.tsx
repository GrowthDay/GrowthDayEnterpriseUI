import { Chip } from '@mui/material'
import { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete/Autocomplete'
import * as React from 'react'
import { ReactNode } from 'react'
import emailDomainRegex from '../../../utils/emailDomainRegex'

const renderDomainTags = (values: string[], getTagProps: AutocompleteRenderGetTagProps): ReactNode =>
  values.map((value, index) => {
    const isValid = emailDomainRegex.test(value)
    return (
      <Chip
        {...getTagProps({ index })}
        size="small"
        sx={{ borderRadius: 4 }}
        color={isValid ? 'secondary' : 'error'}
        label={value}
      />
    )
  })

export default renderDomainTags
