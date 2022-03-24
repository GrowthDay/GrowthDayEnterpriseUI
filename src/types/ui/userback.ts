export type UserbackLanguage =
  | 'en'
  | 'da'
  | 'de'
  | 'es'
  | 'et'
  | 'fi'
  | 'fr'
  | 'hu'
  | 'it'
  | 'jp'
  | 'ko'
  | 'lt'
  | 'pl'
  | 'pt'
  | 'pt-br'
  | 'nl'
  | 'no'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sv'
  | 'zh-CN'
  | 'zh-TW'

export type UserbackDirection = 'e' | 'w' | 'se' | 'sw'
export type UserbackStyle = 'text' | 'circle'
export type UserbackRatingType = 'star' | 'emoji' | 'heart'
export type UserbackMode = 'form' | 'capture' | 'video' | 'feedback'
export type UserbackPriority = 'Urgent' | 'High' | 'Neutral' | 'Low'

export type UserbackWidgetSettings = {
  language?: UserbackLanguage
  style?: UserbackStyle
  position?: UserbackDirection
  autohide?: boolean
  logo?: string
  name_field?: boolean
  name_field_mandatory?: boolean
  email_field?: boolean
  email_field_mandatory?: boolean
  comment_field?: boolean
  comment_field_mandatory?: boolean
  display_category?: boolean
  display_feedback?: boolean
  display_attachment?: boolean
  display_assignee?: boolean
  main_button_text?: string
  main_button_background_colour?: string
  main_button_text_colour?: string
  rating_type?: UserbackRatingType
  rating_help_message?: string
}

export type UserbackCustomData = Record<
  string | number,
  string | number | boolean | null | undefined | Array<string | number | boolean | null | undefined>
>
export type UserbackData = {
  load_type?: string
  domain?: string
  page?: string
  email?: string
  description?: string
  update_reporter?: boolean
  comments?: string[]
  attachment_file_name?: string
  user_agent?: string
  window_x?: number
  window_y?: number
  resolution_x?: number
  resolution_y?: number
  categories?: string
  custom_data?: UserbackCustomData
  rating?: string
}

declare global {
  interface Window {
    Userback: {
      access_token: string
      name: string
      email: string
      categories: string
      widget_settings: UserbackWidgetSettings
      custom_data: UserbackCustomData
      priority: UserbackPriority

      show: () => void
      hide: () => void
      open: (mode?: UserbackMode) => void
      openExtension: (mode?: UserbackMode) => void
      setCategories: (categories: string) => void
      close: () => void
      setData: (data: UserbackCustomData) => void
      setEmail: (email: string) => void
      setName: (name: string) => void
      setPriority: (priority: UserbackPriority) => void
      setWidgetSettings: (settings: UserbackWidgetSettings) => void
      start: () => void
      on_load: () => void
      on_open: () => void
      on_close: () => void
      before_send: () => void
      after_send: (data: UserbackData) => void
      destroy: () => void
      hasUnsavedChanges: () => boolean
      isLoaded: () => boolean
    }
  }
}
