import { DependencyList, Reducer, useEffect, useReducer } from 'react'

export type PromiseInput<T = any> = Promise<T> | (() => Promise<T>)

export enum PromiseStateType {
  PENDING,
  RESOLVED,
  REJECTED
}

export type PromiseState<T = any> = {
  error: Error | undefined
  data: T | undefined
  state: PromiseStateType
  loading: boolean
}
export type PromiseAction<T = any> =
  | { type: PromiseStateType.PENDING }
  | { type: PromiseStateType.RESOLVED; payload: T }
  | { type: PromiseStateType.REJECTED; payload: Error }

function resolvePromise<T>(promise: PromiseInput<T>) {
  if (typeof promise === 'function') {
    return promise()
  }

  return promise
}

const defaultState: PromiseState = {
  error: undefined,
  data: undefined,
  state: PromiseStateType.PENDING,
  loading: true
}

const reducer = <T>(state: PromiseState<T>, action: PromiseAction<T>): PromiseState<T> => {
  switch (action.type) {
    case PromiseStateType.PENDING:
      return defaultState

    case PromiseStateType.RESOLVED:
      return {
        error: undefined,
        data: action.payload,
        state: PromiseStateType.RESOLVED,
        loading: false
      }

    case PromiseStateType.REJECTED:
      return {
        error: action.payload,
        data: undefined,
        state: PromiseStateType.REJECTED,
        loading: false
      }

    default:
      return state
  }
}

const usePromise = <T>(promise: PromiseInput<T>, deps: DependencyList) => {
  const [result, dispatch] = useReducer<Reducer<PromiseState<T>, PromiseAction<T>>>(reducer, defaultState)

  useEffect(() => {
    // eslint-disable-next-line
    promise = resolvePromise<T>(promise)

    if (!promise) {
      return
    }

    let canceled = false

    dispatch({ type: PromiseStateType.PENDING })

    promise.then(
      (_result) => {
        if (!canceled) {
          dispatch({
            payload: _result,
            type: PromiseStateType.RESOLVED
          })
        }
      },
      (error) => {
        if (!canceled) {
          dispatch({
            payload: error,
            type: PromiseStateType.REJECTED
          })
        }
      }
    )

    return () => {
      canceled = true
    }
  }, deps)

  return result
}

export default usePromise
