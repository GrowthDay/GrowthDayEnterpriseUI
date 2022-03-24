import { FC } from 'react'
import emptyStateImage from '../../assets/images/empty-states/people.png'
import EmptyState from '../../components/EmptyState'

const PeopleEmptyState: FC = () => <EmptyState image={emptyStateImage} title="Start by inviting members to the team" />
export default PeopleEmptyState
