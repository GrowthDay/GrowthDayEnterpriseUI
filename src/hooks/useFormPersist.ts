import { useCallback, useEffect } from 'react'
import { Path } from 'react-hook-form'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form/dist/types/form'

type FormOptions<T> = {
  watch: UseFormWatch<T>
  setValue: UseFormSetValue<T>
}

type UseFormPersistOptions<T> = {
  storage?: Storage
  exclude?: readonly Path<T>[]
  include?: readonly Path<T>[]
  onDataRestored?: (data: T) => void
  validate?: boolean
  dirty?: boolean
}

const useFormPersist = <T>(
  key: string,
  { watch, setValue }: FormOptions<T>,
  { storage, exclude, include, onDataRestored, validate, dirty }: UseFormPersistOptions<T> = {}
) => {
  const values = JSON.stringify((watch as any)(include))
  const getStorage = useCallback(() => storage || window.localStorage, [storage])

  useEffect(() => {
    const str = getStorage().getItem(key)
    if (str) {
      const values = JSON.parse(str)
      const dataRestored: Record<string, any> = {}
      Object.keys(values).forEach((key) => {
        const shouldSet = !(exclude ?? []).includes(key as Path<T>)
        if (shouldSet) {
          dataRestored[key] = values[key]
          setValue(key as Path<T>, values[key], { shouldValidate: Boolean(validate), shouldDirty: Boolean(dirty) })
        }
      })
      onDataRestored?.(dataRestored as T)
    }
  }, [getStorage, key, exclude, include, onDataRestored, validate, dirty, setValue])

  useEffect(() => {
    getStorage().setItem(key, values)
  }, [values, getStorage, key])

  return {
    clear: () => getStorage().removeItem(key)
  }
}

export default useFormPersist
