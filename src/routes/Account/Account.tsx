import { FC, useState } from 'react'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import Layout from '../../components/Layout'
import isEmployeePaying from '../../utils/isEmployeePaying'
import InviteMembers from '../People/components/InviteMembers'
import AccountBilling from './components/AccountBilling'
import AccountDetails from './components/AccountDetails'
import AccountTransactions from './components/AccountTransactions'
import AddMoreSeats from './components/AddMoreSeats'
import SignInSecurity from './components/SignInSecurity'
import UpdateCreditCard from './components/UpdateCreditCard'

const Account: FC = () => {
  const { data: organization } = useOrganizationQuery()
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
        {!isEmployeePaying(organization) && <AccountTransactions />}
        <AccountDetails />
        <SignInSecurity />
      </Layout>
    </>
  )
}

export default Account
