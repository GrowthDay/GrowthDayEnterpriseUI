import { startCase, toLower } from 'lodash-es'
import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { AssessmentTypeEnum } from '../../types/api'
import { IAssessmentCategories } from '../../types/strapi'

export const ASSESSMENT_CATEGORIES_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'ASSESSMENT_CATEGORIES']

const useAssessmentCategoriesQuery = (
  type: AssessmentTypeEnum,
  options: Omit<
    UseQueryOptions<IAssessmentCategories[], unknown, IAssessmentCategories[], typeof ASSESSMENT_CATEGORIES_QUERY_KEY>,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery(
    ASSESSMENT_CATEGORIES_QUERY_KEY,
    () =>
      axiosGrowthDay.get<IAssessmentCategories[]>('/strapi/assessment-categories', {
        params: { type: startCase(toLower(type)) }
      }),
    options
  )
}

export default useAssessmentCategoriesQuery
