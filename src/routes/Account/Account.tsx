import { FC, useState } from 'react'
import Layout from '../../components/Layout'
import InviteMembers from '../People/components/InviteMembers'
import AccountBilling from './components/AccountBilling'
import AccountDetails from './components/AccountDetails'
import AccountTransactions from './components/AccountTransactions'
import AddMoreSeats from './components/AddMoreSeats'
import UpdateCreditCard from './components/UpdateCreditCard'

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
        <AccountDetails />
      </Layout>
    </>
  )
}

export default Account
