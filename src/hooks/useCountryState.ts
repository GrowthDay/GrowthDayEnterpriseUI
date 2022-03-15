import { omit } from 'lodash'
import { keyBy } from 'lodash-es'
import { useMemo } from 'react'
import usePromise from './usePromise'

export type ICountry = {
  name: string
  iso2: string
  emoji: string
  states: IState[]
}

export type IState = {
  name: string
  state_code: string
}

const useCountryState = () => {
  const { data, loading } = usePromise<ICountry[]>(
    import('../assets/json/countries-states.json').then((res) => res.default),
    []
  )

  return useMemo(() => {
    const countries = (data?.map((dt) => omit(dt, 'state')) ?? []) as ICountry[]
    const countriesMap = keyBy(countries, 'iso2')

    const getCountry = (countryNameOrIso2: string | undefined) =>
      (countryNameOrIso2
        ? data?.find(
            (dt) =>
              dt.iso2?.toLowerCase() === countryNameOrIso2?.toLowerCase() ||
              dt.name?.toLowerCase() === countryNameOrIso2?.toLowerCase()
          )
        : undefined) as ICountry | undefined

    const getStates = (countryNameOrIso2: string | undefined) =>
      (getCountry(countryNameOrIso2)?.states ?? []) as IState[]

    const getStatesMap = (countryNameOrIso2: string | undefined) => keyBy(getStates(countryNameOrIso2), 'state_code')

    return { countries, countriesMap, getStates, getStatesMap, getCountry, loading }
  }, [data, loading])
}

export default useCountryState
