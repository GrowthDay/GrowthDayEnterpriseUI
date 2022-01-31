import { AtomEffect } from 'recoil'

const StorageEffect =
  <T>(key: string, storage: typeof localStorage | typeof sessionStorage = localStorage): AtomEffect<T> =>
  ({ setSelf, onSet, trigger, resetSelf }) => {
    const setValue = () => {
      const savedValue = storage.getItem(key)
      try {
        savedValue ? setSelf(JSON.parse(savedValue)) : resetSelf()
      } catch (e) {}
    }
    if (trigger === 'get') {
      setValue()
    }
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue()
      }
    }
    window.addEventListener('storage', onStorageChange)
    onSet((newValue, _, isReset) => {
      try {
        isReset ? storage.removeItem(key) : storage.setItem(key, JSON.stringify(newValue))
      } catch (e) {}
    })
    return () => {
      window.removeEventListener('storage', onStorageChange)
    }
  }

export default StorageEffect
