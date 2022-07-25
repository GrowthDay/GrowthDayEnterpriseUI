import { startCase, toLower } from 'lodash-es'
import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { AssessmentTypeEnum } from '../../types/api'
import { IAssessmentCategories } from '../../types/strapi'

const ASSESSMENT_CATEGORIES_BASE_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'ASSESSMENT_CATEGORIES']

export const getAssessmentCategoriesQueryKey = (type: AssessmentTypeEnum) => [
  ...ASSESSMENT_CATEGORIES_BASE_QUERY_KEY,
  type
]

const useAssessmentCategoriesQuery = (
  type: AssessmentTypeEnum,
  options: Omit<
    UseQueryOptions<
      IAssessmentCategories[],
      unknown,
      IAssessmentCategories[],
      ReturnType<typeof getAssessmentCategoriesQueryKey>
    >,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery(
    getAssessmentCategoriesQueryKey(type),
    () =>
      axiosGrowthDay.get<IAssessmentCategories[]>('/strapi/assessment-categories', {
        params: { type: startCase(toLower(type)) }
      }),
    options
  )
}

export default useAssessmentCategoriesQuery
