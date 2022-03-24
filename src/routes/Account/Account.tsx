import { FC, useState } from 'react'
import Layout from '../../components/Layout'
import InviteMembers from '../People/InviteMembers'
import AccountBilling from './AccountBilling'
import AccountSetup from './AccountSetup'
import AccountTransactions from './AccountTransactions'
import AddMoreSeats from './AddMoreSeats'
import UpdateCreditCard from './UpdateCreditCard'

const Account: FC = () => {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [addSeatsOpen, setAddSeatsOpen] = useState(false)
  const [updateCardOpen, setUpdateCardOpen] = useState(false)

  return (
    <>
      <InviteMembers open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <AddMoreSeats open={addSeatsOpen} onClose={() => setAddSeatsOpen(false)} />
      <UpdateCreditCard maxWidth="xs" open={updateCardOpen} onClose={() => setUpdateCardOpen(false)} />
      <Layout breadcrumbs="Account">
        <AccountBilling setAddSeatsOpen={setAddSeatsOpen} setUpdateCardOpen={setUpdateCardOpen} />
        <AccountTransactions />
        <AccountSetup setInviteOpen={setInviteOpen} />
      </Layout>
    </>
  )
}

export default Account
