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
        <FormCardElement
          placeholder="Card number"
          disabled={disabled}
          name="card"
          label="Card details"
          data-cy="stripe-card-number-input"
        />
      </Grid>
      <Grid item xs={12}>
        <FormInput
          disabled={disabled}
          placeholder="John Doe"
          name="fullName"
          label="Name on card"
          data-cy="stripe-card-name-input"
        />
      </Grid>
      <Grid item xs={12}>
        <FormAutocomplete
          disabled={disabled}
          placeholder="Select country"
          name="country"
          label="Country"
          getOptionLabel={(option: string) => countriesMap[option]?.name ?? ''}
          options={countries}
          onChange={() => methods.setValue('region', '')}
          data-cy="stripe-card-country-dropdown"
        />
      </Grid>
      {states.length > 0 && (
        <Grid item xs={12}>
          <FormAutocomplete
            disabled={disabled}
            placeholder="Select state"
            name="region"
            label="State"
            getOptionLabel={(option: string) => statesMap[option]?.name ?? ''}
            options={states}
            data-cy="stripe-card-state-dropdown"
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <FormInput disabled={disabled} name="zipCode" label="Zip/postcode" data-cy="stripe-card-zip-input" />
      </Grid>
      <Grid item xs={12}>
        <FormPhoneInput
          disabled={disabled}
          country={country}
          name="phoneNumber"
          label="Phone Number"
          data-cy="stripe-card-phone-input"
        />
      </Grid>
    </>
  )
}

export default StripeCardForm
