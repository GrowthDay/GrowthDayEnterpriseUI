import { AddOutlined } from '@mui/icons-material'
import { Skeleton, TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Card, CardContent, Divider, Tab, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useOrganizationQuery from '../../api/queries/useOrganizationQuery'
import CopyText from '../../components/CopyText'
import Flex from '../../components/Flex'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import useInvitationLink from '../../hooks/useInvitationLink'
import useMobileView from '../../hooks/useMobileView'
import isEmployeePaying from '../../utils/isEmployeePaying'
import AddMoreSeats from '../Account/components/AddMoreSeats'
import peopleTabState from './atoms/peopleTabState'
import DeactivatedTab from './components/DeactivatedTab'
import usePeopleQuery from './hooks/usePeopleQuery'
import InviteMembers from './components/InviteMembers'
import MembersTab from './components/MembersTab'
import PendingInvitationsTab from './components/PendingInvitationsTab'
import PeopleEmptyState from './components/PeopleEmptyState'

const People: FC = () => {
  const { data: organization, refetch: refetchOrganization } = useOrganizationQuery()
  const mobileView = useMobileView()
  const [tab, setTab] = useRecoilState(peopleTabState)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [addSeatsOpen, setAddSeatsOpen] = useState(false)
  const invitationLink = useInvitationLink()

  const {
    defaultData: defaultPeople,
    data: people,
    isLoading: peopleLoading,
    isFetching: peopleFetching,
    filters: peopleFilters,
    setFilters: setPeopleFilters,
    pageParams: peoplePageParams,
    setPageParams: setPeoplePageParams
  } = usePeopleQuery(undefined, { invitationPending: false, paymentPending: false, deactivated: false })

  const {
    defaultData: defaultPaymentPending,
    data: paymentPending,
    isLoading: paymentPendingLoading,
    isFetching: paymentPendingFetching,
    filters: paymentPendingFilters,
    setFilters: setPaymentPendingFilters,
    pageParams: paymentPendingPageParams,
    setPageParams: setPaymentPendingPageParams
  } = usePeopleQuery(undefined, { invitationPending: false, paymentPending: true, deactivated: false })

  const {
    defaultData: defaultInvitationsPending,
    data: invitationsPending,
    isLoading: invitationsPendingLoading,
    isFetching: invitationsPendingFetching,
    filters: invitationsPendingFilters,
    setFilters: setInvitationsPendingFilters,
    pageParams: invitationsPendingPageParams,
    setPageParams: setInvitationsPendingPageParams,
    refetch: refetchInvitationsPendingOrganization
  } = usePeopleQuery(undefined, { invitationPending: true, deactivated: false })

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

  const isLoading = peopleLoading || invitationsPendingLoading || deactivatedLoading || paymentPendingLoading

  const seatsUsed =
    (defaultPeople?.totalRecords ?? 0) +
    (defaultInvitationsPending?.totalRecords ?? 0) +
    (defaultDeactivated?.totalRecords ?? 0) +
    (defaultPaymentPending?.totalRecords ?? 0)
  const totalSeats = organization?.seats ?? 0
  const seatsLeft = totalSeats - seatsUsed

  useEffect(() => {
    if (organization?.processingInvitation) {
      const timeoutId = setInterval(() => {
        refetchInvitationsPendingOrganization()
        refetchOrganization()
      }, 5 * 1000)
      return () => {
        clearInterval(timeoutId)
      }
    }
  }, [organization?.processingInvitation, refetchInvitationsPendingOrganization, refetchOrganization])

  const hasPendingPayment = (defaultPaymentPending?.totalRecords ?? 0) > 0
  const hasDeactivated = (defaultDeactivated?.totalRecords ?? 0) > 0
  const hasPendingInvitation = (defaultInvitationsPending?.totalRecords ?? 0) > 0

  useEffect(() => {
    if (
      !isLoading &&
      ((!hasDeactivated && tab === '4') ||
        (!hasPendingInvitation && tab === '3') ||
        (!hasPendingPayment && tab === '2'))
    ) {
      setTab('1')
    }
  }, [tab, setTab, isLoading, hasPendingPayment, hasDeactivated, hasPendingInvitation])

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
              {organization?.processingInvitation ? (
                <Typography
                  color="text.disabled"
                  variant={mobileView ? 'body1' : 'h6'}
                  fontWeight={500}
                  data-cy="people-processing-invitations-text"
                >
                  Processing invitations...
                </Typography>
              ) : isEmployeePaying(organization) ? (
                <Typography variant={mobileView ? 'body1' : 'h6'} fontWeight={600} data-cy="people-seats-used-text">
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
              {!isEmployeePaying(organization) && organization?.stripePaymentMethodId && (
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
                {hasPendingPayment && (
                  <Tab
                    value="2"
                    label={<>Pending Payment ({defaultPaymentPending?.totalRecords ?? 0})</>}
                    data-cy="people-tabs-pending-payment-button"
                  />
                )}
                {hasPendingInvitation && (
                  <Tab
                    value="3"
                    label={<>Pending Invitations ({defaultInvitationsPending?.totalRecords ?? 0})</>}
                    data-cy="people-tabs-pending-button"
                  />
                )}
                {hasDeactivated && (
                  <Tab
                    value="4"
                    label={<>Deactivated ({defaultDeactivated?.totalRecords ?? 0})</>}
                    data-cy="people-tabs-deactivated-button"
                  />
                )}
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
              {hasPendingPayment && (
                <TabPanel sx={{ p: 0 }} value="2">
                  <MembersTab
                    hideDownloadButton
                    loading={paymentPendingFetching}
                    pageParams={paymentPendingPageParams}
                    setPageParams={setPaymentPendingPageParams}
                    filters={paymentPendingFilters}
                    setFilters={setPaymentPendingFilters}
                    data={paymentPending?.results}
                    rowCount={paymentPending?.totalRecords}
                  />
                </TabPanel>
              )}
              {hasPendingInvitation && (
                <TabPanel sx={{ p: 0 }} value="3">
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
              )}
              {hasDeactivated && (
                <TabPanel sx={{ p: 0 }} value="4">
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
              )}
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
