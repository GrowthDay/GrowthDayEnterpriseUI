import { AddOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Divider, Tab, Tabs, Typography } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import usePeopleQuery from '../../api/queries/usePeopleQuery'
import emptyStateImage from '../../assets/images/empty-states/people.png'
import CopyText from '../../components/CopyText'
import EmptyState from '../../components/EmptyState'
import Flex from '../../components/Flex'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import useMobileView from '../../hooks/useMobileView'
import AddMoreSeats from '../Account/AddMoreSeats'
import InviteMembers from './InviteMembers'
import MembersTab from './MembersTab'
import PendingInvitationsTab from './PendingInvitationsTab'

const People: FC = () => {
  const { data, isLoading } = usePeopleQuery()
  const mobileView = useMobileView()
  const [tab, setTab] = useState(1)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [addSeatsOpen, setAddSeatsOpen] = useState(false)

  const activeTab = useMemo(() => {
    switch (tab) {
      case 1:
        return <MembersTab data={data ?? []} />
      case 2:
        return <PendingInvitationsTab data={data ?? []} />
      default:
        return null
    }
  }, [tab, data])

  return (
    <>
      <InviteMembers open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <AddMoreSeats open={addSeatsOpen} onClose={() => setAddSeatsOpen(false)} />
      <Layout
        breadcrumbs="People"
        header={<CopyText label="Invite link:" text="https://app.growthday.com/invite/as4d6vfg346jkfdg6jad2" />}
      >
        <Card elevation={0} sx={{ mb: 4 }}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              '&:last-child': {
                padding: {
                  xs: 2,
                  md: 3
                }
              }
            }}
          >
            <Flex flex={1} alignItems="center" sx={{ mb: { xs: 1, md: 0 } }}>
              <Typography variant={mobileView ? 'body1' : 'h6'} fontWeight={600}>
                20 seats left
              </Typography>
              <Divider flexItem sx={{ mx: 2 }} orientation="vertical" />
              <Typography variant={mobileView ? 'body1' : 'h6'} fontWeight={400}>
                20 total seats
              </Typography>
            </Flex>
            <Flex flex={1} alignItems="center" justifyContent="flex-end">
              <Button onClick={() => setAddSeatsOpen(true)} startIcon={<AddOutlined />}>
                {mobileView ? 'Add seats' : 'Add more seats'}
              </Button>
              <Box mx={1} />
              <Button onClick={() => setInviteOpen(true)} variant="outlined" startIcon={<AddOutlined />}>
                {mobileView ? 'Invite' : 'Invite members'}
              </Button>
            </Flex>
          </CardContent>
        </Card>
        {isLoading ? (
          <Loading />
        ) : data?.length ? (
          <>
            <Tabs scrollButtons={false} variant="scrollable" value={tab} onChange={(_, value) => setTab(value)}>
              <Tab value={1} label={<>Team members ({data?.length})</>} />
              <Tab value={2} label={<>Pending Invitations ({data?.length})</>} />
            </Tabs>
            <Divider sx={{ mb: 4, mt: '-1.5px' }} />
            {activeTab}
          </>
        ) : (
          <EmptyState image={emptyStateImage} title="Start by inviting members to the team" />
        )}
      </Layout>
    </>
  )
}

export default People
