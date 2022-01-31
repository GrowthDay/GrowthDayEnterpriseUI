import { useEffect, useState } from 'react'

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  useEffect(() => {
    const setFromEvent = function (event: Event) {
      if (event.type === 'online') {
        setIsOnline(true)
      } else if (event.type === 'offline') {
        setIsOnline(false)
      }
    }

    window.addEventListener('online', setFromEvent)
    window.addEventListener('offline', setFromEvent)

    return () => {
      window.removeEventListener('online', setFromEvent)
      window.removeEventListener('offline', setFromEvent)
    }
  })
  return isOnline
}

export default useOnlineStatus
