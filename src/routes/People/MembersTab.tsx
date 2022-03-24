import { FC } from 'react'
import PeopleEmptyState from './PeopleEmptyState'
import PeopleTable, { PeopleTableProps } from './PeopleTable'

const MembersTab: FC<PeopleTableProps> = (props) => {
  if (!props.data?.length && !props.filters.query) {
    return <PeopleEmptyState />
  }

  return <PeopleTable {...props} showName searchable exportable title="Members using GrowthDay" />
}

export default MembersTab
