import { useCallback, useEffect } from 'react'
import config from '../config'
import { UserbackCustomData, UserbackData } from '../types/ui/userback'

const getUserbackContainerEl = () => document.getElementById('userback_button_container')
const getFormSubmitEl = () => document.querySelector<HTMLElement>('button.userback-controls-send.userback-button-input')

const getNameEl = () => document.querySelector<HTMLInputElement>('ubdiv.userback-controls-form  input[name="name"]')
const getEmailEl = () => document.querySelector<HTMLInputElement>('ubdiv.userback-controls-form  input[name="email"]')
const getTitleEl = () => document.querySelector<HTMLInputElement>('ubdiv.userback-controls-form  input[name="title"]')
const getDescriptionEl = () =>
  document.querySelector<HTMLTextAreaElement>('ubdiv.userback-controls-form textarea[name="description"]')

export type UseUserbackUtilsProps = {
  onClose?: () => void
  afterSend?: (data: UserbackData) => void
}

const useUserbackUtils = ({ onClose, afterSend }: UseUserbackUtilsProps = {}) => {
  const isOpen = (() => {
    const el = getUserbackContainerEl()
    if (el) {
      return el.getAttribute('isopen') === 'true'
    }
    return false
  })()

  const open = useCallback(() => {
    if (!isOpen) {
      window.Userback.open()
    }
  }, [isOpen])

  const close = useCallback(() => {
    window.Userback.close()
    onClose?.()
  }, [onClose])

  const submit = (props: {
    name: string
    email: string
    categories: string
    title: string
    description: string
    data: UserbackCustomData
  }) => {
    open()
    setTimeout(() => {
      const nameEl = getNameEl()
      if (nameEl) {
        nameEl.value = props.name
      }
      const emailEl = getEmailEl()
      if (emailEl) {
        emailEl.value = props.email
      }
      const titleEl = getTitleEl()
      if (titleEl) {
        titleEl.value = props.title || props.description
      }
      const descriptionEl = getDescriptionEl()
      if (descriptionEl) {
        descriptionEl.value = props.description || props.title
      }

      window.Userback.setName(props.name)
      window.Userback.setEmail(props.email)
      window.Userback.setCategories(props.categories)
      window.Userback.setData(props.data)
      getFormSubmitEl()?.click()
    })
  }

  useEffect(() => {
    window.Userback = window.Userback || {}
    window.Userback.access_token = config.userbackKey
    window.Userback.after_send = (data) => {
      afterSend?.(data)
      close()
    }
  }, [close, afterSend])

  return {
    isOpen,
    open,
    close,
    submit
  }
}

export default useUserbackUtils
