import { FC } from 'react'
import { IUser } from '../../types/user'
import PeopleTable from './PeopleTable'

export type MembersTabProps = {
  data: IUser[]
}

const MembersTab: FC<MembersTabProps> = ({ data }) => (
  <PeopleTable showFullName searchable exportable data={data} title="Members using GrowthDay" />
)

export default MembersTab
