import { Grid } from '@mui/material'
import * as React from 'react'
import { FC, useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form/dist/types'
import useCountryState from '../hooks/useCountryState'
import FormAutocomplete from './forms/FormAutocomplete'
import FormCardElement from './forms/FormCardElement'
import FormInput from './forms/FormInput'
import FormPhoneInput from './forms/FormPhoneInput'

export type StripeCardFormProps = {
  methods: UseFormReturn<any>
  disabled?: boolean
}

const StripeCardForm: FC<StripeCardFormProps> = ({ methods, disabled }) => {
  const { countriesMap, getStatesMap } = useCountryState()
  const countries = useMemo(() => Object.keys(countriesMap), [countriesMap])

  const country = methods.watch('country')
  const statesMap = useMemo(() => getStatesMap(country), [getStatesMap, country])
  const states = useMemo(() => Object.keys(statesMap), [statesMap])

  return (
    <>
      <Grid item xs={12}>
        <FormCardElement placeholder="Card number" disabled={disabled} name="card" label="Card details" />
      </Grid>
      <Grid item xs={12}>
        <FormInput disabled={disabled} placeholder="John Doe" name="fullName" label="Name on card" />
      </Grid>
      <Grid item xs={12}>
        <FormAutocomplete
          disabled={disabled}
          placeholder="Country"
          name="country"
          label="Select your country"
          getOptionLabel={(option: string) => countriesMap[option]?.name ?? ''}
          options={countries}
          onChange={() => methods.setValue('region', '')}
        />
      </Grid>
      {states.length > 0 && (
        <Grid item xs={12}>
          <FormAutocomplete
            disabled={disabled}
            placeholder="State"
            name="region"
            label="Select your state"
            getOptionLabel={(option: string) => statesMap[option]?.name ?? ''}
            options={states}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <FormInput disabled={disabled} placeholder="ZIP/postcode" name="zipCode" label="Enter your zip code" />
      </Grid>
      <Grid item xs={12}>
        <FormPhoneInput
          disabled={disabled}
          country={country}
          placeholder="Mobile"
          name="phoneNumber"
          label="Phone Number"
        />
      </Grid>
    </>
  )
}

export default StripeCardForm
