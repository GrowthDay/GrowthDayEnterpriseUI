import { FC, useState } from 'react'
import Layout from '../../components/Layout'
import InviteMembers from '../People/components/InviteMembers'
import AccountSetup from './components/AccountSetup'
import RestartTour from './components/RestartTour'

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
