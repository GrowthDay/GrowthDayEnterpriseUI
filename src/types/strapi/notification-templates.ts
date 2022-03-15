/**
 * Model definition for NotificationTemplates
 */
export interface INotificationTemplates {
  id: number
  notificationId?: string
  notificationHeader?: string
  notificationBody?: string
  callToActionButtonLabels?: string
  eventTimeFormatting?: string
  type?: EnumNotificationTemplatesType
  created_at?: string | null
}

export enum EnumNotificationTemplatesType {
  PLAN = 'PLAN',
  PLAN_ACTION = 'PLAN_ACTION',
  PLAN_SUB_TASK = 'PLAN_SUB_TASK'
}
