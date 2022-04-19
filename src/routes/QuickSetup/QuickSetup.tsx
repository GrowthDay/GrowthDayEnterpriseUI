import { FC, useState } from 'react'
import Layout from '../../components/Layout'
import InviteMembers from '../People/InviteMembers'
import AccountSetup from './AccountSetup'
import RestartTour from './RestartTour'

const QuickSetup: FC = () => {
  const [inviteOpen, setInviteOpen] = useState(false)

  return (
    <>
      <InviteMembers open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <Layout breadcrumbs="Quick Setup">
        <RestartTour />
        <AccountSetup setInviteOpen={setInviteOpen} />
      </Layout>
    </>
  )
}

export default QuickSetup
