import axios from 'axios'
import Cookies from 'js-cookie'
import { keyBy, omit } from 'lodash-es'
import { createRef, MutableRefObject, useMemo } from 'react'
import { useQuery } from 'react-query'
import getPrefixedKey from '../utils/getPrefixedKey'
import usePromise from './usePromise'

export type ICountry = {
  name: string
  iso2: string
  emoji: string
  states: IState[]
  currency: string
  currency_name: string
  currency_symbol: string
}

export type IState = {
  name: string
  state_code: string
}

export type UseCountryStateReturn = {
  countries: ICountry[]
  countriesMap: Record<string, ICountry>
  getStates: (countryNameOrIso2: string | undefined | null) => IState[]
  getStatesMap: (countryNameOrIso2: string | undefined | null) => Record<string, IState>
  getCountry: (countryNameOrIso2: string | undefined | null) => ICountry | undefined | null
  getState: (
    countryNameOrIso2: string | undefined | null,
    stateNameOrIso2: string | undefined | null
  ) => IState | undefined | null
  renderCountry: (countryNameOrIso2: string | undefined | null) => string | undefined | null
  renderState: (
    countryNameOrIso2: string | undefined | null,
    stateNameOrIso2: string | undefined | null
  ) => string | undefined | null
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

    const getState: UseCountryStateReturn['getState'] = (countryNameOrIso2, stateNameOrIso2) => {
      const country = getCountry(countryNameOrIso2)
      return country && stateNameOrIso2
        ? country?.states?.find(
            (dt) =>
              dt.state_code?.toLowerCase() === stateNameOrIso2?.toLowerCase() ||
              dt.name?.toLowerCase() === stateNameOrIso2?.toLowerCase()
          )
        : undefined
    }

    const renderCountry: UseCountryStateReturn['renderCountry'] = (countryNameOrIso2) =>
      getCountry(countryNameOrIso2)?.name || countryNameOrIso2
    const renderState: UseCountryStateReturn['renderState'] = (countryNameOrIso2, stateNameOrIso2) =>
      getState(countryNameOrIso2, stateNameOrIso2)?.name || stateNameOrIso2

    const useCountryStateReturn: UseCountryStateReturn = {
      countries,
      countriesMap,
      getStates,
      getStatesMap,
      getCountry,
      getState,
      loading,
      renderCountry,
      renderState
    }

    countryStateRef.current = useCountryStateReturn

    return useCountryStateReturn
  }, [data, loading])
}

export default useCountryState

const COUNTRY_STATE_KEY = getPrefixedKey('COUNTRY_STATE')

type Result = {
  country: string
  state: string
}

export const useDefaultCountryState = () => {
  const { getStates, loading } = useCountryState()
  return useQuery<Result>(
    COUNTRY_STATE_KEY,
    async () => {
      try {
        const raw = Cookies.get(COUNTRY_STATE_KEY)
        const savedCountryState = raw ? JSON.parse(raw) : undefined
        if (savedCountryState?.country && savedCountryState?.region) {
          return savedCountryState
        }
      } catch (e) {}
      return axios
        .get('https://get.geojs.io/v1/ip/geo.json')
        .then((res) => res.data)
        .then((res) => {
          const country = res.country_code ?? ''
          const states = getStates(country)
          const state = states.find((state) => state.name === res.region)?.state_code ?? ''
          const result: Result = { country, state }
          if (country) {
            Cookies.set(COUNTRY_STATE_KEY, JSON.stringify(result), { expires: 1 })
          } else {
            Cookies.remove(COUNTRY_STATE_KEY)
          }
          return result
        })
    },
    {
      enabled: !loading
    }
  )
}
