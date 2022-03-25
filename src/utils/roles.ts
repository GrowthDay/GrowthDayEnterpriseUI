const roles = [
  // {
  //   label: 'Owner',
  //   value: 1
  // },
  {
    name: 'EnterpriseAdmin',
    id: 2
  },
  {
    name: 'EnterpriseEmployee',
    id: 3
  }
]

export default roles

export const renderRoleName = (role?: typeof roles[0]) => role?.name?.replace('Enterprise', '')
