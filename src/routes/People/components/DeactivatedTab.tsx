import { FC } from 'react'
import PeopleEmptyState, { PeopleEmptyStateType } from './PeopleEmptyState'
import PeopleTable, { PeopleTableProps } from './PeopleTable'

const PendingInvitationsTab: FC<PeopleTableProps> = (props) => {
  if (!props.data?.length && !props.filters.query) {
    return <PeopleEmptyState type={PeopleEmptyStateType.DEACTIVATED} />
  }

  return <PeopleTable {...props} disableRoleChange showNameColumn searchable />
}

export default PendingInvitationsTab
