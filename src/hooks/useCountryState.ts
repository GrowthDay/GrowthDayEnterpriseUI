import { omit } from 'lodash'
import { keyBy } from 'lodash-es'
import { createRef, MutableRefObject, useMemo } from 'react'
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

export type UseCountryStateReturn = {
  countries: ICountry[]
  countriesMap: Record<string, ICountry>
  getStates: (countryNameOrIso2: string | undefined) => IState[]
  getStatesMap: (countryNameOrIso2: string | undefined) => Record<string, IState>
  getCountry: (countryNameOrIso2: string | undefined) => ICountry | undefined
  loading: boolean
}

export const countryStateRef = createRef<UseCountryStateReturn>() as MutableRefObject<UseCountryStateReturn>

const useCountryState = (): UseCountryStateReturn => {
  const { data, loading } = usePromise<ICountry[]>(
    import('../assets/json/countries-states.json').then((res) => res.default),
    []
  )

  return useMemo(() => {
    const countries: UseCountryStateReturn['countries'] = (data?.map((dt) => omit(dt, 'state')) ?? []) as ICountry[]
    const countriesMap: UseCountryStateReturn['countriesMap'] = keyBy(countries, 'iso2')

    const getCountry: UseCountryStateReturn['getCountry'] = (countryNameOrIso2) =>
      countryNameOrIso2
        ? data?.find(
            (dt) =>
              dt.iso2?.toLowerCase() === countryNameOrIso2?.toLowerCase() ||
              dt.name?.toLowerCase() === countryNameOrIso2?.toLowerCase()
          )
        : undefined

    const getStates: UseCountryStateReturn['getStates'] = (countryNameOrIso2) =>
      getCountry(countryNameOrIso2)?.states ?? []

    const getStatesMap: UseCountryStateReturn['getStatesMap'] = (countryNameOrIso2) =>
      keyBy(getStates(countryNameOrIso2), 'state_code')

    const useCountryStateReturn: UseCountryStateReturn = {
      countries,
      countriesMap,
      getStates,
      getStatesMap,
      getCountry,
      loading
    }

    countryStateRef.current = useCountryStateReturn

    return useCountryStateReturn
  }, [data, loading])
}

export default useCountryState
