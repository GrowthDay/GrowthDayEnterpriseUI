import { useCallback, useEffect, useMemo, useRef } from 'react'
import useCreateUserTourMutation from '../../../api/mutations/useCreateUserTourMutation'
import useEndUserTourMutation from '../../../api/mutations/useEndUserTourMutation'
import useUpdateUserTourProgressMutation from '../../../api/mutations/useUpdateUserTourProgressMutation'
import useUserTourQuery from '../../../api/queries/useUserTourQuery'
import useActiveSubscription from '../../../hooks/useActiveSubscription'
import useIsMounted from '../../../hooks/useIsMounted'
import { UserTour, UserTourRequest, UserTourTriggerTypeEnum } from '../../../types/api'
import { EnumTooltipsTrigger, ITooltips } from '../../../types/strapi'
import { TourEvent } from './useTour'

const useTourActions = () => {
  const isMountedRef = useIsMounted()
  const { subscription: activeSubscription, isLoading: subscriptionLoading } = useActiveSubscription()
  const { options, tooltip } = useMemo(
    () => ({
      options: {
        trigger: EnumTooltipsTrigger.ON_ENTERPRISE_DASHBOARD_LOAD,
        triggerType: UserTourTriggerTypeEnum.EnterpriseAdmin,
        triggerId: activeSubscription?.id?.toString() ?? ''
      } as UserTourRequest,
      tooltip: activeSubscription?.tooltips.find(
        (tooltip) => tooltip.trigger === EnumTooltipsTrigger.ON_ENTERPRISE_DASHBOARD_LOAD && !tooltip.disabled
      ) as ITooltips
    }),
    [activeSubscription]
  )
  const { data: userTour, isLoading: userTourLoading } = useUserTourQuery()
  const { mutateAsync: createUserTour } = useCreateUserTourMutation()
  const { mutateAsync: updateUserTourProgress } = useUpdateUserTourProgressMutation()
  const { mutateAsync: endUserTour } = useEndUserTourMutation()

  const userTourRef = useRef<UserTour>()
  const optionsRef = useRef<UserTourRequest>(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    userTourRef.current = userTour
  }, [userTour])

  const updateTour = useCallback(
    (event: TourEvent, progress: number) => {
      const userTour = userTourRef.current
      if (isMountedRef.current) {
        const completed = event === 'complete'
        const opt = optionsRef.current
        if (opt) {
          const tourData: Partial<UserTour> = {
            trigger: opt.trigger,
            triggerId: opt.triggerId,
            triggerType: opt.triggerType,
            progress,
            started: true,
            completed
          }
          if (progress > (userTour?.progress ?? 0) || tourData.completed) {
            !userTour ? createUserTour(tourData) : completed ? endUserTour(tourData) : updateUserTourProgress(tourData)
          }
        }
      }
    },
    [isMountedRef, createUserTour, updateUserTourProgress, endUserTour]
  )

  const isLoading = userTourLoading || subscriptionLoading

  return useMemo(
    () => ({ update: updateTour, userTourRef, optionsRef, tooltip, isLoading, options, userTour }),
    [isLoading, tooltip, updateTour, options, userTour]
  )
}

export default useTourActions
