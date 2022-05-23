import { Chip } from '@mui/material'
import { AutocompleteRenderGetTagProps } from '@mui/material/Autocomplete/Autocomplete'
import * as React from 'react'
import { ReactNode } from 'react'
import { emailDomainsRegex } from '../../../utils/regex'

const renderDomainTags = (values: string[], getTagProps: AutocompleteRenderGetTagProps): ReactNode =>
  values.map((value, index) => {
    const isValid = emailDomainsRegex.regex.test(value)
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
