import { AddOutlined } from '@mui/icons-material'
import { Skeleton, TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Card, CardContent, Divider, Tab, Typography } from '@mui/material'
import moment from 'moment'
import { FC, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import CopyText from '../../components/CopyText'
import Flex from '../../components/Flex'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import useInvitationLink from '../../hooks/useInvitationLink'
import useMobileView from '../../hooks/useMobileView'
import isEmployeePaying from '../../utils/isEmployeePaying'
import AddMoreSeats from '../Account/components/AddMoreSeats'
import invitePollingState from './atoms/invitePollingState'
import peopleTabState from './atoms/peopleTabState'
import DeactivatedTab from './components/DeactivatedTab'
import usePeopleQuery from './hooks/usePeopleQuery'
import InviteMembers from './components/InviteMembers'
import MembersTab from './components/MembersTab'
import PendingInvitationsTab from './components/PendingInvitationsTab'
import PeopleEmptyState from './components/PeopleEmptyState'

const People: FC = () => {
  const { data: organization } = useOrganizationQuery()
  const mobileView = useMobileView()
  const [tab, setTab] = useRecoilState(peopleTabState)
  const pollingTime = useRecoilValue(invitePollingState)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [addSeatsOpen, setAddSeatsOpen] = useState(false)
  const invitationLink = useInvitationLink()

  const shouldPoll = Boolean(pollingTime && pollingTime > moment().valueOf())

  const {
    defaultData: defaultPeople,
    data: people,
    isLoading: peopleLoading,
    isFetching: peopleFetching,
    filters: peopleFilters,
    setFilters: setPeopleFilters,
    pageParams: peoplePageParams,
    setPageParams: setPeoplePageParams
  } = usePeopleQuery(undefined, { invitationPending: false, deactivated: false })

  const {
    defaultData: defaultInvitationsPending,
    data: invitationsPending,
    isLoading: invitationsPendingLoading,
    isFetching: invitationsPendingFetching,
    filters: invitationsPendingFilters,
    setFilters: setInvitationsPendingFilters,
    pageParams: invitationsPendingPageParams,
    setPageParams: setInvitationsPendingPageParams
  } = usePeopleQuery(
    undefined,
    { invitationPending: true, deactivated: false },
    { refetchInterval: shouldPoll && 5 * 1000 }
  )

  const {
    defaultData: defaultDeactivated,
    data: deactivated,
    isLoading: deactivatedLoading,
    isFetching: deactivatedFetching,
    filters: deactivatedFilters,
    setFilters: setDeactivatedFilters,
    pageParams: deactivatedPageParams,
    setPageParams: setDeactivatedPageParams
  } = usePeopleQuery(undefined, { deactivated: true })

  const isLoading = peopleLoading || invitationsPendingLoading || deactivatedLoading

  const seatsUsed =
    (defaultPeople?.totalRecords ?? 0) +
    (defaultInvitationsPending?.totalRecords ?? 0) +
    (defaultDeactivated?.totalRecords ?? 0)
  const totalSeats = organization?.seats ?? 0
  const seatsLeft = totalSeats - seatsUsed

  return (
    <>
      <InviteMembers open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <AddMoreSeats open={addSeatsOpen} onClose={() => setAddSeatsOpen(false)} />
      <Layout breadcrumbs="People" header={<CopyText label="Invite link:" text={invitationLink} />}>
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
              {isEmployeePaying(organization) ? (
                <Typography variant={mobileView ? 'body1' : 'h6'} fontWeight={600} data-cy="people-seats-left-text">
                  {isLoading ? (
                    <>
                      <Skeleton height={14} width={80} />
                      <Skeleton height={14} width={72} />
                    </>
                  ) : (
                    <>
                      {seatsUsed} seat{seatsUsed === 1 ? '' : 's'} used
                    </>
                  )}
                </Typography>
              ) : (
                <>
                  <Typography variant={mobileView ? 'body1' : 'h6'} fontWeight={600} data-cy="people-seats-left-text">
                    {isLoading ? (
                      <>
                        <Skeleton height={14} width={80} />
                        <Skeleton height={14} width={72} />
                      </>
                    ) : (
                      <>
                        {seatsLeft} seat{seatsLeft === 1 ? '' : 's'} left
                      </>
                    )}
                  </Typography>
                  <Divider flexItem sx={{ mx: 2 }} orientation="vertical" />
                  <Typography variant={mobileView ? 'body1' : 'h6'} fontWeight={400} data-cy="people-total-seats-text">
                    {totalSeats} total seat{totalSeats === 1 ? '' : 's'}
                  </Typography>
                </>
              )}
            </Flex>
            <Flex flex={1} alignItems="center" justifyContent="flex-end">
              {!isEmployeePaying(organization) && (
                <>
                  <Button
                    onClick={() => setAddSeatsOpen(true)}
                    startIcon={<AddOutlined />}
                    data-cy="people-add-more-seats-button"
                  >
                    {mobileView ? 'Add seats' : 'Add more seats'}
                  </Button>
                  <Box mx={1} />
                </>
              )}
              <Button
                onClick={() => setInviteOpen(true)}
                variant="outlined"
                startIcon={<AddOutlined />}
                data-cy="people-invite-members-button"
              >
                {mobileView ? 'Invite' : 'Invite members'}
              </Button>
            </Flex>
          </CardContent>
        </Card>
        {isLoading ? (
          <Loading />
        ) : seatsUsed > 0 ? (
          <Box position="relative">
            <TabContext value={tab}>
              <TabList scrollButtons={false} variant="scrollable" onChange={(_, value) => setTab(value)}>
                <Tab
                  value="1"
                  label={<>Team members ({defaultPeople?.totalRecords ?? 0})</>}
                  data-cy="people-tabs-members-button"
                />
                <Tab
                  value="2"
                  label={<>Pending Invitations ({defaultInvitationsPending?.totalRecords ?? 0})</>}
                  data-cy="people-tabs-pending-button"
                />
                <Tab
                  value="3"
                  label={<>Deactivated ({defaultDeactivated?.totalRecords ?? 0})</>}
                  data-cy="people-tabs-deactivated-button"
                />
              </TabList>
              <Divider sx={{ marginTop: '-1.5px' }} />
              <TabPanel sx={{ p: 0 }} value="1">
                <MembersTab
                  loading={peopleFetching}
                  pageParams={peoplePageParams}
                  setPageParams={setPeoplePageParams}
                  filters={peopleFilters}
                  setFilters={setPeopleFilters}
                  data={people?.results}
                  rowCount={people?.totalRecords}
                />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="2">
                <PendingInvitationsTab
                  loading={invitationsPendingFetching}
                  pageParams={invitationsPendingPageParams}
                  setPageParams={setInvitationsPendingPageParams}
                  filters={invitationsPendingFilters}
                  setFilters={setInvitationsPendingFilters}
                  data={invitationsPending?.results}
                  rowCount={invitationsPending?.totalRecords}
                />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="3">
                <DeactivatedTab
                  loading={deactivatedFetching}
                  pageParams={deactivatedPageParams}
                  setPageParams={setDeactivatedPageParams}
                  filters={deactivatedFilters}
                  setFilters={setDeactivatedFilters}
                  data={deactivated?.results}
                  rowCount={deactivated?.totalRecords}
                />
              </TabPanel>
            </TabContext>
          </Box>
        ) : (
          <PeopleEmptyState />
        )}
      </Layout>
    </>
  )
}

export default People
