import { FC } from 'react'
import peopleImage from '../assets/people.png'
import pendingInvitesImage from '../assets/pendingInvites.png'
import deactivatedImage from '../assets/deactivated.png'
import EmptyState from '../../../components/EmptyState'

export enum PeopleEmptyStateType {
  MEMBERS,
  PENDING,
  DEACTIVATED
}

const PeopleEmptyState: FC<{ type?: PeopleEmptyStateType }> = ({ type }) => {
  switch (type) {
    case PeopleEmptyStateType.PENDING:
      return <EmptyState image={pendingInvitesImage} title="No pending invites" />
    case PeopleEmptyStateType.DEACTIVATED:
      return <EmptyState image={deactivatedImage} title="No deactivated accounts" />
    default:
      return <EmptyState image={peopleImage} title="Start by inviting members to the team" />
  }
}

export default PeopleEmptyState
