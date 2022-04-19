import { sortBy } from 'lodash'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useRecoilState } from 'recoil'
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'
import useIsMounted from '../../../hooks/useIsMounted'
import useSyncedQueue from '../../../hooks/useSyncedQueue'
import tourState from '../../../recoil/atoms/tourState'
import imageUrlFromMedia from '../../../utils/imageUrlFromMedia'
import styles from '../styles/tour.module.scss'
import useTourActions from './useTourActions'

export type TourEvent = 'complete' | 'cancel' | 'close' | 'next'

const useTour = () => {
  const { tooltip, userTourRef, update: updateTour, isLoading, userTour } = useTourActions()
  const isMountedRef = useIsMounted()
  const tourRef = useRef<Shepherd.Tour>()

  const [openState, setOpenState] = useRecoilState(tourState)
  const syncedTourOpenState = useSyncedQueue(openState)
  const open = Boolean(syncedTourOpenState && !isLoading && tooltip && !userTour?.completed)

  const showTour = useCallback(async () => {
    if (!tooltip) {
      return
    }
    if (tourRef.current) {
      tourRef.current?.cancel()
    }
    if (isMountedRef.current) {
      if (tourRef.current) {
        tourRef.current?.cancel()
      }
      const tour = new Shepherd.Tour({
        defaultStepOptions: {
          classes: styles.step,
          modalOverlayOpeningRadius: 8,
          scrollTo: { behavior: 'smooth', block: 'center' },
          popperOptions: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [20, 20]
                }
              }
            ]
          },
          when: {
            show() {
              const currentStep = tour.getCurrentStep()
              if (currentStep) {
                const currentStepElement = currentStep.getElement()
                if (currentStepElement) {
                  const progress = document.createElement('div')
                  progress.classList.add('shepherd-progress-counter')
                  const index = tour.steps.findIndex((step) => step.id === currentStep.id)
                  progress.innerHTML = `${index + 1} of ${tour.steps.length}`
                  const footer = currentStepElement.querySelector('.shepherd-footer')
                  if (footer) {
                    footer.insertBefore(
                      progress,
                      currentStepElement.querySelector('.shepherd-button.shepherd-button-back')
                    )
                  }
                }
              }
            }
          }
        },
        useModalOverlay: true,
        exitOnEsc: false
      })
      sortBy(tooltip.items, 'order').forEach((tooltipItem, index, items) => {
        const isLastItem = index >= items.length - 1
        const text = document.createElement('div')

        const imageSrc = imageUrlFromMedia(tooltipItem.image)
        if (imageSrc) {
          const image = document.createElement('img')
          image.classList.add('shepherd-image')
          image.alt = tooltipItem.title ?? ''
          image.src = imageSrc
          text.appendChild(image)
          setTimeout(() => window.dispatchEvent(new Event('resize')))
        }

        if (tooltipItem.title) {
          const title = document.createElement('h3')
          title.classList.add('shepherd-title')
          title.innerHTML = tooltipItem.title
          text.appendChild(title)
        }

        if (tooltipItem.description) {
          const description = document.createElement('div')
          description.classList.add('shepherd-description')
          description.innerHTML = tooltipItem.description
          text.appendChild(description)
        }

        tour.addStep({
          id: tooltipItem.id.toString(),
          text,
          attachTo: {
            element: tooltipItem.element,
            on: 'auto'
          },
          beforeShowPromise: async () => {
            try {
              const element = document.querySelector<HTMLElement>(tooltipItem.element)
              if (element) {
                element.click()
              }
            } catch (e) {}
          },
          buttons: [
            {
              text: 'Skip tour',
              action: () => {
                tour.cancel()
              },
              secondary: true
            },
            {
              text: 'Back',
              action: () => {
                tour.back()
              },
              secondary: true,
              classes: 'shepherd-button-back'
            },
            {
              text: tooltipItem.nextButtonLabel || (isLastItem ? 'Got It' : 'Next'),
              action: () => {
                tour.next()
                if (index < tooltip.items.length - 1) {
                  setTimeout(() => {
                    if (tourRef.current) {
                      const currentStep = tourRef.current.getCurrentStep()
                      const index = tourRef.current.steps.findIndex((step) => step.id === currentStep?.id)
                      const progress = index + 1
                      updateTour('next', progress)
                    }
                  })
                }
              },
              classes: 'shepherd-button-primary'
            }
          ]
        })
      })
      if (isMountedRef.current) {
        ;(['close', 'cancel', 'complete'] as TourEvent[]).forEach((event) =>
          tour.on(event, async () => {
            setOpenState(false)
            if (tourRef.current) {
              const currentStep = tourRef.current.getCurrentStep()
              const index = tourRef.current.steps.findIndex((step) => step.id === currentStep?.id)
              const progress = index + 1
              await updateTour(event, progress)
            }
            tourRef.current = undefined
          })
        )
        tour.show((userTourRef.current?.progress || 1) - 1)
        // tour.start()
      }
      tourRef.current = tour
    }
  }, [userTourRef, isMountedRef, tooltip, updateTour, setOpenState])

  const startTour = useCallback(() => setOpenState(true), [setOpenState])

  useEffect(() => {
    if (open && tooltip && !tourRef.current?.isActive()) {
      showTour()
    }
  }, [open, showTour, tooltip, userTour])

  useEffect(() => {
    return () => {
      tourRef.current?.hide?.()
      tourRef.current?.cancel?.()
    }
  }, [])

  return useMemo(
    () => ({ start: startTour, isOpen: open, tooltip, userTour, updateTour }),
    [userTour, startTour, open, tooltip, updateTour]
  )
}
export default useTour
